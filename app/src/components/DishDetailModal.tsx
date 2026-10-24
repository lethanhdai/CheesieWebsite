import React, { useState, useEffect, useRef } from 'react';
import type { MenuItem } from '../types';
import { formatVND } from '../domain/cart';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, qty: number, note: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [qty, setQty] = useState<number>(1);
  const [note, setNote] = useState<string>('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQty(1);
    setNote('');
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && item) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const handleMinus = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handlePlus = () => {
    if (qty < 20) setQty(qty + 1);
  };

  const handleAdd = () => {
    onAddToCart(item, qty, note.trim());
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-detail-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card" ref={modalRef}>
        <button
          type="button"
          className="close-dialog"
          onClick={onClose}
          aria-label="Đóng bảng chi tiết món"
        >
          ×
        </button>

        <span className="menu-badge">MENU CHEESIE</span>
        <h2 id="dish-detail-title">{item.name}</h2>
        <p>{item.desc}</p>
        <p>
          Giá một phần: <strong>{formatVND(item.price)}</strong>
        </p>

        <div className="quantity-select">
          <button
            type="button"
            onClick={handleMinus}
            disabled={qty <= 1}
            aria-label="Bớt số lượng"
          >
            −
          </button>
          <strong>{qty}</strong>
          <button
            type="button"
            onClick={handlePlus}
            disabled={qty >= 20}
            aria-label="Thêm số lượng"
          >
            +
          </button>
        </div>

        <label className="taco-note-label" htmlFor="dish-note">
          Ghi chú món / vị sốt mong muốn
        </label>
        <input
          className="note-input"
          id="dish-note"
          type="text"
          maxLength={200}
          placeholder="Ví dụ: ít cay, sốt BBQ…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <p className="original-menu-caption">
          Yêu cầu riêng và vị sốt cần được quán xác nhận khi tiếp nhận đơn.
        </p>

        <button
          type="button"
          className="button burgundy"
          onClick={handleAdd}
        >
          Thêm vào túi · {formatVND(item.price * qty)} <span>↗</span>
        </button>
      </div>
    </div>
  );
};
