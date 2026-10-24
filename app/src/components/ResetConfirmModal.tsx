import React, { useEffect, useRef } from 'react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="modal-card" ref={modalRef}>
        <button
          type="button"
          className="close-dialog"
          onClick={onCancel}
          aria-label="Đóng xác nhận làm lại"
        >
          ×
        </button>

        <p className="eyebrow">LÀM LẠI BÁNH</p>
        <h2 id="reset-modal-title">Làm lại chiếc tacos?</h2>
        <p>
          Thao tác này sẽ xóa tất cả nhân, sốt và topping thêm đã chọn. Size đang chọn vẫn
          được giữ nguyên.
        </p>

        <div className="confirm-actions">
          <button type="button" className="button" onClick={onCancel}>
            Giữ nguyên bánh
          </button>
          <button
            type="button"
            className="button burgundy"
            onClick={onConfirm}
          >
            Làm lại từ bánh trống <span>↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};
