import React, { useEffect, useRef } from 'react';

interface RestaurantInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestaurantInfoModal: React.FC<RestaurantInfoModalProps> = ({
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
      aria-labelledby="restaurant-info-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card" ref={modalRef}>
        <button
          type="button"
          className="close-dialog"
          onClick={onClose}
          aria-label="Đóng thông tin quán"
        >
          ×
        </button>

        <p className="eyebrow">GHÉ NHÀ CHEESIE</p>
        <h2 id="restaurant-info-title">
          Trạm dừng tiếp theo:
          <br />
          Cheesie.
        </h2>

        <img
          className="original-menu"
          src="/assets/interior.jpg"
          alt="Không gian chỗ ngồi trong quán Cheesie"
        />

        <p>
          <strong>102 Đ. Lê Lai, Ninh Kiều, Cần Thơ</strong>
          <br />
          Mở cửa: 9:30–22:30
          <br />
          <a href="tel:0788786283">078 878 6283</a>
          <br />
          <a href="mailto:cheesieburgersandtacos@gmail.com">
            cheesieburgersandtacos@gmail.com
          </a>
        </p>

        <a
          className="button burgundy"
          href="https://www.google.com/maps/search/?api=1&query=102%20L%C3%AA%20Lai%20Ninh%20Ki%E1%BB%81u%20C%E1%BA%A7n%20Th%C6%A1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mở bản đồ <span>↗</span>
        </a>

        <p className="original-menu-caption" style={{ marginTop: 12 }}>
          Thông tin do quán cung cấp. Giờ mở cửa áp dụng theo tuần, ngày nghỉ lễ cần liên hệ
          quán xác nhận.
        </p>
      </div>
    </div>
  );
};
