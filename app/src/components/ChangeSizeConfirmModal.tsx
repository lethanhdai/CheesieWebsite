import React, { useEffect, useRef } from 'react';
import type { TacosSizeKey } from '../types';
import { TACOS_SIZES } from '../domain/tacos';

interface ChangeSizeConfirmModalProps {
  currentSize: TacosSizeKey;
  nextSize: TacosSizeKey | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ChangeSizeConfirmModal: React.FC<ChangeSizeConfirmModalProps> = ({
  currentSize,
  nextSize,
  onCancel,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && nextSize) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSize, onCancel]);

  if (!nextSize) return null;

  const targetConfig = TACOS_SIZES[nextSize];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-size-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="modal-card" ref={modalRef}>
        <button
          type="button"
          className="close-dialog"
          onClick={onCancel}
          aria-label="Đóng xác nhận đổi size"
        >
          ×
        </button>

        <p className="eyebrow">ĐỔI SIZE TACOS</p>
        <h2 id="change-size-title">
          Size nhỏ hơn,
          <br />
          chọn lại một chút nhé.
        </h2>
        <p>
          Size {nextSize} chỉ gồm {targetConfig.protein} phần nhân và{' '}
          {targetConfig.sauce} phần sốt. Lựa chọn hiện tại vượt quá giới hạn. Đổi size sẽ
          giữ lại các topping thêm và đặt lại các phần nhân & sốt theo size mới.
        </p>

        <div className="confirm-actions">
          <button type="button" className="button" onClick={onCancel}>
            Giữ size {currentSize}
          </button>
          <button
            type="button"
            className="button burgundy"
            onClick={onConfirm}
          >
            Đổi sang {nextSize} <span>↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};
