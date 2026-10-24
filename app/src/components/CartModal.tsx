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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
            <p>Túi đang trống. Một chiếc tacos đúng gu đang đợi bạn.</p>
            <button
              type="button"
              className="button burgundy"
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
            {cart.map((item, index) => (
              <div className="cart-item" key={item.id || `cart-${index}`}>
                <div>
                  <span>{item.name}</span>
                  <span>{formatVND(item.unitPrice * item.qty)}</span>
                </div>
                {item.details && <p>{item.details}</p>}

                <div className="cart-controls">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(index, -1)}
                    aria-label={`Bớt ${item.name}`}
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(index, 1)}
                    disabled={item.qty >= 99}
                    aria-label={`Thêm ${item.name}`}
                  >
                    +
                  </button>

                  {item.type === 'tacos' && item.tacosConfig && (
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => onEditTacos(item)}
                    >
                      Sửa công thức
                    </button>
                  )}

                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => onDeleteItem(index)}
                  >
                    Xóa món
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              <span>Tạm tính</span>
              <span>{formatVND(total)}</span>
            </div>

            <p>
              Chưa gồm phí giao hàng. Giá và tình trạng món cần được quán xác nhận.
              Túi món chưa được gửi đi.
            </p>

            <button
              type="button"
              className="button burgundy"
              onClick={onProceedToHandoff}
            >
              Xem nội dung & chọn kênh đặt <span>↗</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
