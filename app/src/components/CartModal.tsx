import React, { useEffect, useRef } from 'react';
import type { CartItem } from '../types';
import { formatVND, calculateCartTotal } from '../domain/cart';

interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (index: number, delta: number) => void;
  onDeleteItem: (index: number) => void;
  onEditTacos: (item: CartItem) => void;
  onProceedToHandoff: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  cart,
  onClose,
  onUpdateQty,
  onDeleteItem,
  onEditTacos,
  onProceedToHandoff,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = calculateCartTotal(cart);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card" ref={modalRef}>
        <button
          type="button"
          className="close-dialog"
          onClick={onClose}
          aria-label="Đóng túi đồ ngon"
        >
          ×
        </button>

        <p className="eyebrow">YOUR GOOD FOOD BAG</p>
        <h2 id="cart-modal-title">Túi đồ ngon của bạn.</h2>

        {cart.length === 0 ? (
          <div>
            <p className="text-sm text-cheesie-muted mb-4 leading-relaxed">
              Túi đang trống. Một chiếc tacos hay phần combo đúng gu đang đợi bạn.
            </p>
            <button
              type="button"
              className="button burgundy min-h-[44px]"
              onClick={() => {
                onClose();
                const builder = document.getElementById('builder');
                if (builder) builder.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Tự cuốn tacos <span>↗</span>
            </button>
          </div>
        ) : (
          <div>
            <div className="cart-list max-h-[55vh] overflow-y-auto pr-1">
              {cart.map((item, index) => (
                <div className="cart-item" key={item.id || `cart-${index}`}>
                  <div className="flex justify-between items-start gap-3">
                    <span className="font-bold text-cheesie-graphite">{item.name}</span>
                    <span className="font-extrabold text-cheesie-burgundy shrink-0">
                      {formatVND(item.unitPrice * item.qty)}
                    </span>
                  </div>
                  {item.details && (
                    <p className="text-xs text-cheesie-muted mt-1 leading-relaxed">
                      {item.details}
                    </p>
                  )}

                  <div className="cart-controls mt-2.5 flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-2 bg-cheesie-surface-muted/50 rounded-lg p-0.5 border border-cheesie-line/60">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(index, -1)}
                        aria-label={`Bớt ${item.name}`}
                        className="w-8 h-8 rounded flex items-center justify-center font-bold hover:bg-cheesie-surface text-cheesie-graphite active:scale-95 transition-all"
                      >
                        −
                      </button>
                      <span className="min-w-5 text-center text-xs font-bold text-cheesie-graphite">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(index, 1)}
                        disabled={item.qty >= 99}
                        aria-label={`Thêm ${item.name}`}
                        className="w-8 h-8 rounded flex items-center justify-center font-bold hover:bg-cheesie-surface text-cheesie-graphite active:scale-95 transition-all disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>

                    {item.type === 'tacos' && item.tacosConfig && (
                      <button
                        type="button"
                        className="edit-btn text-xs font-semibold text-cheesie-burgundy hover:underline px-2 py-1.5 min-h-[36px]"
                        onClick={() => onEditTacos(item)}
                      >
                        Sửa công thức
                      </button>
                    )}

                    <button
                      type="button"
                      className="del-btn text-xs text-cheesie-muted hover:text-red-700 px-2 py-1.5 min-h-[36px] ml-auto"
                      onClick={() => onDeleteItem(index)}
                    >
                      Xóa món
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total mt-4 pt-3 border-t border-cheesie-line flex justify-between items-baseline">
              <span className="font-bold text-sm text-cheesie-graphite">Tạm tính</span>
              <span className="font-black text-lg text-cheesie-burgundy">{formatVND(total)}</span>
            </div>

            <p className="text-[11px] text-cheesie-muted mt-2 leading-relaxed">
              Chưa gồm phí giao hàng. Giá và tình trạng món cần được quán xác nhận khi tiếp nhận đơn.
            </p>

            <button
              type="button"
              className="button burgundy min-h-[46px] w-full mt-4 flex items-center justify-center gap-1 font-bold shadow-station-sm"
              onClick={onProceedToHandoff}
            >
              <span>Xem nội dung & chọn kênh đặt</span>
              <span>↗</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
