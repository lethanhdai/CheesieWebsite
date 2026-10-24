import React, { useEffect, useRef } from 'react';

interface OriginalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalMenuModal: React.FC<OriginalMenuModalProps> = ({
  isOpen,
  onClose,
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

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="original-menu-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card" ref={modalRef}>
        <button
          type="button"
          className="close-dialog"
          onClick={onClose}
          aria-label="Đóng bảng menu gốc"
        >
          ×
        </button>

        <p className="eyebrow">TỪ MENU BẠN CUNG CẤP</p>
        <h2 id="original-menu-title">Menu nhà Cheesie.</h2>
        <p className="original-menu-caption">
          Giá trên bản menu được cung cấp; cần quán xác nhận trước khi mở nhận đơn thật.
          Ảnh sản phẩm trên website được cắt từ menu và dùng đại diện cho nhóm món.
        </p>

        <div className="original-menu-wrap">
          <img
            className="original-menu"
            src="/assets/menu.jpg"
            alt="Menu gốc Cheesie: tacos, gà tender, burger, khoai, mì Ý và đồ uống"
          />
          <img
            className="original-menu"
            src="/assets/combos.jpg"
            alt="Menu combo Cheesie gồm Chicken and Fries 99k, Best Seller 119k, Bestie 159k, Signature Mega 219k và Big Feast 315k"
          />
        </div>
      </div>
    </div>
  );
};
