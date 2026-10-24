import React, { useState, useEffect, useRef } from 'react';
import type { TacosSizeKey, SelectedIngredients, MenuItem, CartItem } from './types';
import {
  INGREDIENTS,
  canAddIngredient,
  doesSelectionFitSize,
  isTacosReady,
  computeTacosPrice,
  generateTacosDeduplicationKey,
  buildTacosDetailsSummary,
} from './domain/tacos';
import {
  MENU_ITEMS,
  loadCartFromStorage,
  saveCartToStorage,
  countTotalCartItems,
} from './domain/cart';

import { Topline } from './components/Topline';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { MenuSection } from './components/MenuSection';
import { TacosBuilder } from './components/TacosBuilder';
import { SpaceSection } from './components/SpaceSection';
import { LastCall } from './components/LastCall';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

import { CartModal } from './components/CartModal';
import { OrderHandoffModal } from './components/OrderHandoffModal';
import { OriginalMenuModal } from './components/OriginalMenuModal';
import { RestaurantInfoModal } from './components/RestaurantInfoModal';
import { DishDetailModal } from './components/DishDetailModal';
import { ChangeSizeConfirmModal } from './components/ChangeSizeConfirmModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';

export const App: React.FC = () => {
  // Cart state with persistence
  const [cart, setCart] = useState<CartItem[]>(() => loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // Tacos builder state
  const [size, setSize] = useState<TacosSizeKey>('M');
  const [selected, setSelected] = useState<SelectedIngredients>({});
  const [tacoNote, setTacoNote] = useState<string>('');
  const [folded, setFolded] = useState<boolean>(false);
  const [editingCartItemId, setEditingCartItemId] = useState<string | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isHandoffOpen, setIsHandoffOpen] = useState<boolean>(false);
  const [handoffWithOrder, setHandoffWithOrder] = useState<boolean>(false);
  const [isOriginalMenuOpen, setIsOriginalMenuOpen] = useState<boolean>(false);
  const [isRestaurantInfoOpen, setIsRestaurantInfoOpen] = useState<boolean>(false);
  const [selectedDishForDetail, setSelectedDishForDetail] = useState<MenuItem | null>(null);
  const [pendingTargetSize, setPendingTargetSize] = useState<TacosSizeKey | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Tacos Builder Interactions
  const handleSizeChangeRequest = (nextSize: TacosSizeKey) => {
    if (nextSize === size) return;
    if (!doesSelectionFitSize(nextSize, selected)) {
      setPendingTargetSize(nextSize);
      return;
    }
    setSize(nextSize);
    setFolded(false);
  };

  const handleConfirmSizeChange = () => {
    if (!pendingTargetSize) return;
    // Giữ lại topping thêm, xóa các lựa chọn nhân và sốt vượt quá hạn mức
    const keptExtras: SelectedIngredients = {};
    for (const [id, count] of Object.entries(selected)) {
      const ing = INGREDIENTS.find((i) => i.id === id);
      if (ing && ing.kind === 'extra' && count > 0) {
        keptExtras[id] = count;
      }
    }
    setSelected(keptExtras);
    setSize(pendingTargetSize);
    setPendingTargetSize(null);
    setFolded(false);
    showToast(`Đã chuyển sang size ${pendingTargetSize}.`);
  };

  const handleIngredientAdd = (id: string) => {
    if (!canAddIngredient(size, selected, id)) {
      showToast(`Size ${size} đã đủ phần này hoặc không thể chọn lặp.`);
      return;
    }
    setSelected((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    setFolded(false);
  };

  const handleIngredientRemove = (id: string) => {
    setSelected((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return {
        ...prev,
        [id]: current - 1,
      };
    });
    setFolded(false);
  };

  const handleToggleFold = () => {
    setFolded((prev) => !prev);
  };

  const handleConfirmReset = () => {
    setSelected({});
    setTacoNote('');
    setFolded(false);
    setEditingCartItemId(null);
    setIsResetConfirmOpen(false);
    showToast('Đã làm lại bánh từ đầu.');
  };

  const handleAddTacosToCart = () => {
    if (!isTacosReady(size, selected)) return;

    const key = generateTacosDeduplicationKey(size, selected, tacoNote);
    const details = buildTacosDetailsSummary(size, selected, tacoNote);
    const unitPrice = computeTacosPrice(size, selected);

    if (editingCartItemId) {
      // Đang cập nhật một món tacos có sẵn trong giỏ
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === editingCartItemId
            ? {
                ...item,
                key,
                name: `Tacos Pháp · size ${size}`,
                details,
                unitPrice,
                tacosConfig: {
                  size,
                  selected: { ...selected },
                  note: tacoNote,
                },
              }
            : item
        )
      );
      setEditingCartItemId(null);
      showToast('Đã cập nhật công thức tacos trong túi đồ ngon!');
    } else {
      // Thêm mới hoặc tăng số lượng nếu trùng hoàn toàn công thức
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex((r) => r.key === key);
        if (existingIndex >= 0) {
          const updated = [...prevCart];
          const existing = updated[existingIndex];
          if (existing.qty >= 99) {
            showToast('Tối đa 99 phần mỗi lựa chọn trong bản thử.');
            return prevCart;
          }
          updated[existingIndex] = {
            ...existing,
            qty: existing.qty + 1,
          };
          return updated;
        }

        const newItem: CartItem = {
          id: Math.random().toString(36).slice(2, 9),
          key,
          type: 'tacos',
          name: `Tacos Pháp · size ${size}`,
          details,
          unitPrice,
          qty: 1,
          tacosConfig: {
            size,
            selected: { ...selected },
            note: tacoNote,
          },
        };
        return [...prevCart, newItem];
      });
      showToast('Đã thêm tacos vào túi đồ ngon!');
    }

    setFolded(true);
  };

  // Regular menu item add to cart
  const handleAddMenuItemToCart = (item: MenuItem, qty: number, note: string) => {
    const key = `${item.id}-${note.trim().toLowerCase()}`;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((r) => r.key === key);
      if (existingIndex >= 0) {
        const updated = [...prevCart];
        const existing = updated[existingIndex];
        updated[existingIndex] = {
          ...existing,
          qty: Math.min(99, existing.qty + qty),
        };
        return updated;
      }
      const newItem: CartItem = {
        id: Math.random().toString(36).slice(2, 9),
        key,
        type: 'menu-item',
        name: item.name,
        details: note.trim() ? `Ghi chú: ${note.trim()}` : '',
        unitPrice: item.price,
        qty,
        menuItemId: item.id,
      };
      return [...prevCart, newItem];
    });
    showToast(`Đã thêm ${item.name} vào túi!`);
  };

  // Cart operations
  const handleUpdateCartQty = (index: number, delta: number) => {
    setCart((prevCart) => {
      const item = prevCart[index];
      if (!item) return prevCart;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        return prevCart.filter((_, i) => i !== index);
      }
      if (newQty > 99) {
        showToast('Tối đa 99 phần mỗi lựa chọn trong bản thử.');
        return prevCart;
      }
      const updated = [...prevCart];
      updated[index] = { ...item, qty: newQty };
      return updated;
    });
  };

  const handleDeleteCartItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    showToast('Đã xóa món khỏi túi đồ ngon.');
  };

  const handleEditTacosInCart = (item: CartItem) => {
    if (!item.tacosConfig) return;
    setSize(item.tacosConfig.size);
    setSelected({ ...item.tacosConfig.selected });
    setTacoNote(item.tacosConfig.note || '');
    setFolded(false);
    setEditingCartItemId(item.id);
    setIsCartOpen(false);

    const builderElement = document.getElementById('builder');
    if (builderElement) {
      builderElement.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Đã tải công thức vào Tacos Express. Bạn có thể sửa và cập nhật.');
  };

  const totalBagCount = countTotalCartItems(cart);

  return (
    <>
      <a className="skip" href="#builder">
        Đến phần tự chọn tacos
      </a>

      <Topline />

      <Header
        bagCount={totalBagCount}
        onOpenBag={() => setIsCartOpen(true)}
      />

      <main>
        <Hero />

        <Ticker />

        <MenuSection
          menuItems={MENU_ITEMS}
          onSelectDish={(item) => setSelectedDishForDetail(item)}
          onViewOriginalMenu={() => setIsOriginalMenuOpen(true)}
        />

        <TacosBuilder
          size={size}
          selected={selected}
          note={tacoNote}
          folded={folded}
          onSizeChangeRequest={handleSizeChangeRequest}
          onIngredientAdd={handleIngredientAdd}
          onIngredientRemove={handleIngredientRemove}
          onNoteChange={setTacoNote}
          onToggleFold={handleToggleFold}
          onResetRequest={() => setIsResetConfirmOpen(true)}
          onAddTacosToCart={handleAddTacosToCart}
          onToast={showToast}
          isEditing={editingCartItemId !== null}
        />

        <SpaceSection
          onOpenRestaurantInfo={() => setIsRestaurantInfoOpen(true)}
        />

        <LastCall
          onOpenOrderChannels={() => {
            setHandoffWithOrder(false);
            setIsHandoffOpen(true);
          }}
        />
      </main>

      <Footer onViewOriginalMenu={() => setIsOriginalMenuOpen(true)} />

      <Toast message={toastMessage} />

      {/* Modals */}
      <CartModal
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onDeleteItem={handleDeleteCartItem}
        onEditTacos={handleEditTacosInCart}
        onProceedToHandoff={() => {
          setIsCartOpen(false);
          setHandoffWithOrder(true);
          setIsHandoffOpen(true);
        }}
      />

      <OrderHandoffModal
        isOpen={isHandoffOpen}
        cart={cart}
        withOrder={handoffWithOrder}
        onClose={() => setIsHandoffOpen(false)}
        onBackToCart={() => {
          setIsHandoffOpen(false);
          setIsCartOpen(true);
        }}
        onToast={showToast}
      />

      <OriginalMenuModal
        isOpen={isOriginalMenuOpen}
        onClose={() => setIsOriginalMenuOpen(false)}
      />

      <RestaurantInfoModal
        isOpen={isRestaurantInfoOpen}
        onClose={() => setIsRestaurantInfoOpen(false)}
      />

      <DishDetailModal
        item={selectedDishForDetail}
        onClose={() => setSelectedDishForDetail(null)}
        onAddToCart={handleAddMenuItemToCart}
      />

      <ChangeSizeConfirmModal
        currentSize={size}
        nextSize={pendingTargetSize}
        onCancel={() => setPendingTargetSize(null)}
        onConfirm={handleConfirmSizeChange}
      />

      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onCancel={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </>
  );
};

export default App;
