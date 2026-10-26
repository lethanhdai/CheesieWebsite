import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ArrowUpRight } from 'lucide-react';
import type { MenuItem } from '../types';
import { formatVND } from '../domain/cart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, qty: number, note: string) => void;
}

const CHICKEN_SAUCES = ['Phô mai', 'BBQ', 'Bơ tỏi mật ong'];
const COMBO_DRINKS = ['Pepsi', 'Pepsi chanh', '7 Up', 'Nước suối'];
const TACOS_FILLINGS = [
  'Heo',
  'Bò',
  'Gà',
  'Xúc xích phô mai',
  'Xúc xích ngon',
];
const TACOS_SAUCES = ['Sốt Tacos', 'BBQ', 'Pesto', 'Andalouse'];

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [qty, setQty] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  // Chicken sauce state
  const [selectedChickenSauces, setSelectedChickenSauces] = useState<string[]>([]);

  // Combo options state
  const [selectedDrink, setSelectedDrink] = useState<string>('Pepsi');
  const [selectedComboFillings, setSelectedComboFillings] = useState<string[]>(['Heo', 'Bò']);
  const [selectedComboSauces, setSelectedComboSauces] = useState<string[]>(['Sốt Tacos']);
  const [comboVeggies, setComboVeggies] = useState<boolean>(true);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    setQty(1);
    setNote('');

    // Initialize chicken sauces
    if (item.id === 'chicken-1') {
      setSelectedChickenSauces(['Phô mai']);
    } else if (item.id === 'chicken-2') {
      setSelectedChickenSauces(['Phô mai', 'BBQ']);
    } else if (item.id === 'chicken-3') {
      setSelectedChickenSauces(['Phô mai', 'BBQ', 'Bơ tỏi mật ong']);
    } else {
      setSelectedChickenSauces([]);
    }

    // Initialize combo state
    setSelectedDrink('Pepsi');
    if (item.id === 'combo-big-feast') {
      setSelectedComboFillings(['Heo', 'Bò', 'Gà']);
      setSelectedComboSauces(['Sốt Tacos', 'BBQ']);
    } else {
      setSelectedComboFillings(['Heo', 'Bò']);
      setSelectedComboSauces(['Sốt Tacos']);
    }
    setComboVeggies(true);
  }, [item]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!item) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isChicken = item.category === 'chicken';
  const isCombo = item.category === 'combo';
  const maxChickenSauces =
    item.id === 'chicken-1' ? 1 : item.id === 'chicken-2' ? 2 : item.id === 'chicken-3' ? 3 : 0;

  const hasTacosInCombo =
    item.id === 'combo-best-seller' ||
    item.id === 'combo-bestie' ||
    item.id === 'combo-big-feast';
  const maxComboFillings = item.id === 'combo-big-feast' ? 3 : 2;
  const maxComboSauces = item.id === 'combo-big-feast' ? 2 : 1;
  const hasDrinksInCombo =
    item.id === 'combo-chicken-fries' ||
    item.id === 'combo-best-seller' ||
    item.id === 'combo-mega' ||
    item.id === 'combo-big-feast';

  const handleToggleChickenSauce = (sauce: string) => {
    if (maxChickenSauces === 1) {
      setSelectedChickenSauces([sauce]);
      return;
    }
    if (selectedChickenSauces.includes(sauce)) {
      if (selectedChickenSauces.length > 1) {
        setSelectedChickenSauces(selectedChickenSauces.filter((s) => s !== sauce));
      }
    } else {
      if (selectedChickenSauces.length < maxChickenSauces) {
        setSelectedChickenSauces([...selectedChickenSauces, sauce]);
      } else {
        // Replace first
        setSelectedChickenSauces([...selectedChickenSauces.slice(1), sauce]);
      }
    }
  };

  const handleToggleComboFilling = (filling: string) => {
    if (selectedComboFillings.includes(filling)) {
      if (selectedComboFillings.length > 1) {
        setSelectedComboFillings(selectedComboFillings.filter((f) => f !== filling));
      }
    } else {
      if (selectedComboFillings.length < maxComboFillings) {
        setSelectedComboFillings([...selectedComboFillings, filling]);
      } else {
        setSelectedComboFillings([...selectedComboFillings.slice(1), filling]);
      }
    }
  };

  const handleToggleComboSauce = (sauce: string) => {
    if (maxComboSauces === 1) {
      setSelectedComboSauces([sauce]);
      return;
    }
    if (selectedComboSauces.includes(sauce)) {
      if (selectedComboSauces.length > 1) {
        setSelectedComboSauces(selectedComboSauces.filter((s) => s !== sauce));
      }
    } else {
      if (selectedComboSauces.length < maxComboSauces) {
        setSelectedComboSauces([...selectedComboSauces, sauce]);
      } else {
        setSelectedComboSauces([...selectedComboSauces.slice(1), sauce]);
      }
    }
  };

  const handleMinus = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handlePlus = () => {
    if (qty < 20) setQty(qty + 1);
  };

  const handleAdd = () => {
    // Build descriptive details text
    const detailsParts: string[] = [];

    if (isChicken && selectedChickenSauces.length > 0) {
      detailsParts.push(`Vị sốt: ${selectedChickenSauces.join(', ')}`);
    }

    if (isCombo) {
      if (hasTacosInCombo) {
        const tacosSize = item.id === 'combo-big-feast' ? 'L' : 'M';
        const vegText = comboVeggies ? 'Có rau' : 'Không rau';
        detailsParts.push(
          `Tacos ${tacosSize}: ${selectedComboFillings.join(' + ')} · Sốt ${selectedComboSauces.join(' + ')} · ${vegText}`
        );
      }
      if (hasDrinksInCombo) {
        detailsParts.push(`Nước: ${selectedDrink}`);
      }
    }

    if (note.trim()) {
      detailsParts.push(`Ghi chú: ${note.trim()}`);
    }

    const fullDetails = detailsParts.join(' | ') || item.desc;
    onAddToCart(item, qty, fullDetails);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-cheesie-graphite/60 backdrop-blur-xs p-0 sm:p-4 animate-drawer-fade"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-detail-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg bg-cheesie-surface rounded-t-3xl sm:rounded-2xl border border-cheesie-line shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden animate-drawer-in"
        ref={modalRef}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-cheesie-line/80 shrink-0 bg-cheesie-surface">
          <div className="flex items-center gap-2">
            <Badge variant="station" className="text-[9px] px-2 py-0.5 font-bold">
              PLATFORM 01
            </Badge>
            <span className="text-[11px] font-bold tracking-wider text-cheesie-muted uppercase">
              CHI TIẾT MÓN ĂN
            </span>
          </div>

          <button
            type="button"
            className="w-10 h-10 rounded-lg flex items-center justify-center text-cheesie-graphite hover:bg-cheesie-surface-muted border border-cheesie-line/70 active:scale-95 transition-all"
            onClick={onClose}
            aria-label="Đóng bảng chi tiết món"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-cheesie-graphite">
          {/* Dish Overview */}
          <div className="flex items-start gap-4">
            {item.image ? (
              <img
                src={`/assets/${item.image}`}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-cheesie-line/60 shadow-station-sm"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-cheesie-surface-muted/60 flex items-center justify-center text-4xl shrink-0 border border-cheesie-line/60">
                {item.emoji}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h2
                id="dish-detail-title"
                className="text-lg sm:text-xl font-black text-cheesie-graphite tracking-tight leading-snug"
              >
                {item.name}
              </h2>
              <p className="text-xs text-cheesie-muted leading-relaxed mt-1">
                {item.desc}
              </p>
              <div className="mt-2 text-base font-extrabold text-cheesie-burgundy">
                {formatVND(item.price)}
              </div>
            </div>
          </div>

          {/* Combo Included Items List */}
          {isCombo && item.comboItems && (
            <div className="p-3.5 rounded-xl bg-cheesie-surface-muted/40 border border-cheesie-line/60">
              <h3 className="text-xs font-bold text-cheesie-graphite uppercase tracking-wider mb-2">
                Các món bao gồm trong combo:
              </h3>
              <ul className="space-y-1.5">
                {item.comboItems.map((cItem, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-cheesie-graphite">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] shrink-0 font-bold">
                      ✓
                    </span>
                    <span>{cItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gà Tender Sauce Selection */}
          {isChicken && maxChickenSauces > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-cheesie-graphite uppercase tracking-wide">
                  Chọn {maxChickenSauces} vị sốt cho gà ({selectedChickenSauces.length}/{maxChickenSauces}):
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {CHICKEN_SAUCES.map((sauce) => {
                  const isChecked = selectedChickenSauces.includes(sauce);
                  return (
                    <button
                      key={sauce}
                      type="button"
                      onClick={() => handleToggleChickenSauce(sauce)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between gap-1.5 min-h-[44px] ${
                        isChecked
                          ? 'bg-cheesie-burgundy text-cheesie-surface border-cheesie-burgundy shadow-sm'
                          : 'bg-cheesie-surface border-cheesie-line text-cheesie-graphite hover:border-cheesie-burgundy/40'
                      }`}
                    >
                      <span>{sauce}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Combo Taco Customization */}
          {isCombo && hasTacosInCombo && (
            <div className="space-y-3.5 p-3.5 rounded-xl bg-cheesie-surface-muted/30 border border-cheesie-line/60">
              <div>
                <span className="text-xs font-bold text-cheesie-burgundy uppercase tracking-wider block">
                  Tùy chọn Tacos trong Combo
                </span>
                <span className="text-[11px] text-cheesie-muted">
                  Đã gồm vỏ bánh tortilla và phô mai mozzarella kéo sợi.
                </span>
              </div>

              {/* Taco Fillings */}
              <div>
                <label className="block text-[11px] font-bold text-cheesie-graphite uppercase mb-1.5">
                  Chọn {maxComboFillings} loại nhân ({selectedComboFillings.length}/{maxComboFillings}):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {TACOS_FILLINGS.map((filling) => {
                    const isSelected = selectedComboFillings.includes(filling);
                    return (
                      <button
                        key={filling}
                        type="button"
                        onClick={() => handleToggleComboFilling(filling)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all min-h-[38px] flex items-center gap-1 ${
                          isSelected
                            ? 'bg-cheesie-burgundy text-cheesie-surface border-cheesie-burgundy shadow-sm'
                            : 'bg-cheesie-surface border-cheesie-line text-cheesie-graphite hover:border-cheesie-burgundy/40'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{filling}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Taco Sauces */}
              <div>
                <label className="block text-[11px] font-bold text-cheesie-graphite uppercase mb-1.5">
                  Chọn {maxComboSauces} vị sốt tacos ({selectedComboSauces.length}/{maxComboSauces}):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {TACOS_SAUCES.map((sauce) => {
                    const isSelected = selectedComboSauces.includes(sauce);
                    return (
                      <button
                        key={sauce}
                        type="button"
                        onClick={() => handleToggleComboSauce(sauce)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all min-h-[38px] flex items-center gap-1 ${
                          isSelected
                            ? 'bg-cheesie-burgundy text-cheesie-surface border-cheesie-burgundy shadow-sm'
                            : 'bg-cheesie-surface border-cheesie-line text-cheesie-graphite hover:border-cheesie-burgundy/40'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{sauce}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Taco Veggies */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold text-cheesie-graphite uppercase">
                  Rau trong bánh (xà lách & bắp cải):
                </span>
                <div className="inline-flex rounded-lg border border-cheesie-line p-0.5 bg-cheesie-surface">
                  <button
                    type="button"
                    onClick={() => setComboVeggies(true)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      comboVeggies
                        ? 'bg-cheesie-burgundy text-cheesie-surface'
                        : 'text-cheesie-muted hover:text-cheesie-graphite'
                    }`}
                  >
                    Có rau
                  </button>
                  <button
                    type="button"
                    onClick={() => setComboVeggies(false)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      !comboVeggies
                        ? 'bg-cheesie-burgundy text-cheesie-surface'
                        : 'text-cheesie-muted hover:text-cheesie-graphite'
                    }`}
                  >
                    Không rau
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Combo Drinks Selection */}
          {isCombo && hasDrinksInCombo && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-cheesie-graphite uppercase tracking-wide block">
                Chọn nước ngọt đi kèm:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {COMBO_DRINKS.map((drink) => {
                  const isChecked = selectedDrink === drink;
                  return (
                    <button
                      key={drink}
                      type="button"
                      onClick={() => setSelectedDrink(drink)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-between min-h-[44px] ${
                        isChecked
                          ? 'bg-cheesie-burgundy text-cheesie-surface border-cheesie-burgundy shadow-sm'
                          : 'bg-cheesie-surface border-cheesie-line text-cheesie-graphite hover:border-cheesie-burgundy/40'
                      }`}
                    >
                      <span>{drink}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-cheesie-surface border border-cheesie-line/60">
            <span className="text-xs font-bold text-cheesie-graphite uppercase">
              Số lượng phần ăn:
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleMinus}
                disabled={qty <= 1}
                aria-label="Bớt số lượng"
                className="w-10 h-10 rounded-xl bg-cheesie-surface border border-cheesie-line text-cheesie-graphite font-black hover:bg-cheesie-surface-muted active:scale-95 transition-all flex items-center justify-center disabled:opacity-40"
              >
                −
              </button>
              <strong className="text-base font-extrabold text-cheesie-graphite min-w-6 text-center">
                {qty}
              </strong>
              <button
                type="button"
                onClick={handlePlus}
                disabled={qty >= 20}
                aria-label="Thêm số lượng"
                className="w-10 h-10 rounded-xl bg-cheesie-surface border border-cheesie-line text-cheesie-graphite font-black hover:bg-cheesie-surface-muted active:scale-95 transition-all flex items-center justify-center disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          {/* Notes Input */}
          <div>
            <label
              className="block text-xs font-bold text-cheesie-graphite uppercase tracking-wide mb-1.5"
              htmlFor="dish-note"
            >
              Ghi chú thêm cho quán (tuỳ chọn):
            </label>
            <input
              className="w-full px-3.5 py-2.5 rounded-xl bg-cheesie-surface border border-cheesie-line text-xs text-cheesie-graphite placeholder:text-cheesie-muted focus:outline-none focus:ring-2 focus:ring-cheesie-burgundy/30 focus:border-cheesie-burgundy transition-all"
              id="dish-note"
              type="text"
              maxLength={200}
              placeholder="Ví dụ: ít cay, sốt để riêng, nhiều đá…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <p className="text-[10px] text-cheesie-muted italic">
            * Yêu cầu riêng sẽ được nhà Cheesie chuẩn bị cẩn thận theo đơn của bạn.
          </p>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-5 border-t border-cheesie-line/80 bg-cheesie-surface shrink-0 flex items-center justify-between gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div>
            <span className="text-[10px] text-cheesie-muted font-bold uppercase block">
              Tổng tiền tạm tính
            </span>
            <strong className="text-lg font-black text-cheesie-graphite">
              {formatVND(item.price * qty)}
            </strong>
          </div>

          <Button
            type="button"
            variant="station"
            size="lg"
            className="px-6 h-12 text-sm font-bold shadow-station-sm active:scale-95 transition-all"
            onClick={handleAdd}
          >
            <span>Thêm vào túi đồ ngon</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
