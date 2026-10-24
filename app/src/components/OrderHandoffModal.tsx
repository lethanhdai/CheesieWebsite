import React, { useRef, useEffect } from 'react';
import type { CartItem } from '../types';
import { buildOrderText } from '../domain/cart';
import restaurantData from '../data/restaurant.json';

interface OrderHandoffModalProps {
  isOpen: boolean;
  cart: CartItem[];
  withOrder: boolean;
  onClose: () => void;
  onBackToCart: () => void;
  onToast: (msg: string) => void;
}

export const OrderHandoffModal: React.FC<OrderHandoffModalProps> = ({
  isOpen,
  cart,
  withOrder,
  onClose,
  onBackToCart,
  onToast,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const orderText = withOrder ? buildOrderText(cart) : '';

  const handleCopy = async () => {
    if (!orderText) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(orderText);
        onToast('Đã sao chép. Bạn chưa gửi đơn đến quán.');
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.select();
        onToast('Nội dung đã được chọn. Bạn có thể sao chép thủ công.');
      }
    }
  };

  const links = restaurantData.links;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="handoff-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card" ref={modalRef}>
        <button
          type="button"
          className="close-dialog"
          onClick={onClose}
          aria-label="Đóng bảng đặt món"
        >
          ×
        </button>

        <p className="eyebrow">ĐẶT MÓN CÙNG CHEESIE</p>
        <h2 id="handoff-modal-title">
          Chốt gu rồi,
          <br />
          chọn nơi đặt nhé.
        </h2>

        {withOrder && cart.length > 0 && (
          <div>
            <label className="taco-note-label" htmlFor="order-copy">
              Nội dung đơn để sao chép
            </label>
            <textarea
              ref={textareaRef}
              className="order-text"
              id="order-copy"
              readOnly
              value={orderText}
              rows={8}
            />
            <button
              type="button"
              className="button burgundy"
              id="copy-order"
              onClick={handleCopy}
            >
              Sao chép nội dung đơn <span>↗</span>
            </button>
          </div>
        )}

        <div className="channels">
          <a
            className="channel"
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <strong>Facebook</strong>
              <small style={{ display: 'block' }}>Mở trang quán để gửi nội dung đơn ↗</small>
            </div>
          </a>

          <a
            className="channel"
            href={links.shopeeFood}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <strong>ShopeeFood</strong>
              <small style={{ display: 'block' }}>Mở gian hàng Cheesie ↗</small>
            </div>
          </a>

          <a
            className="channel"
            href={links.grabFood}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <strong>GrabFood</strong>
              <small style={{ display: 'block' }}>Mở gian hàng Cheesie ↗</small>
            </div>
          </a>
        </div>

        <p className="original-menu-caption">
          Chưa có đơn nào được gửi từ website. Bạn có thể sao chép nội dung và gửi cho
          quán qua Facebook để xác nhận. Công thức tacos không tự đồng bộ sang ShopeeFood
          hoặc GrabFood; cần chọn lại món trên ứng dụng.
        </p>

        {withOrder && (
          <button
            type="button"
            className="button"
            id="back-cart"
            onClick={onBackToCart}
          >
            ← Quay lại túi món
          </button>
        )}
      </div>
    </div>
  );
};
