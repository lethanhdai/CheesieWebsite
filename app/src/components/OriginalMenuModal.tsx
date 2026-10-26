import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OriginalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalMenuModal: React.FC<OriginalMenuModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'main' | 'combos'>('main');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    setIsZoomed(false);
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cheesie-graphite/70 backdrop-blur-sm p-0 sm:p-4 animate-drawer-fade"
      role="dialog"
      aria-modal="true"
      aria-labelledby="original-menu-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-4xl h-full sm:h-auto sm:max-h-[92vh] bg-cheesie-surface rounded-none sm:rounded-2xl border border-cheesie-line shadow-2xl flex flex-col overflow-hidden animate-drawer-in"
        ref={modalRef}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-3.5 sm:p-5 border-b border-cheesie-line/80 bg-cheesie-surface/95 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <Badge variant="station" className="text-[9px] px-2 py-0.5 font-bold">
              BẢN GỐC
            </Badge>
            <div>
              <h2
                id="original-menu-title"
                className="text-sm sm:text-base font-extrabold text-cheesie-graphite leading-none"
              >
                Menu gốc nhà Cheesie
              </h2>
              <span className="text-[10px] text-cheesie-muted">
                Tài liệu đối chiếu món & giá
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsZoomed((prev) => !prev)}
              className="h-9 px-2.5 sm:px-3 text-xs font-semibold text-cheesie-graphite border-cheesie-line hover:bg-cheesie-surface-muted gap-1.5"
            >
              {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isZoomed ? 'Thu nhỏ' : 'Phóng to'}</span>
            </Button>

            <button
              type="button"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-cheesie-graphite hover:bg-cheesie-surface-muted border border-cheesie-line active:scale-95 transition-all shrink-0"
              onClick={onClose}
              aria-label="Đóng bảng menu gốc"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation for Menu Pages */}
        <div className="px-4 py-2.5 bg-cheesie-surface-muted/40 border-b border-cheesie-line/60 flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('main')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] flex items-center gap-1.5 ${
              activeTab === 'main'
                ? 'bg-cheesie-burgundy text-cheesie-surface shadow-xs'
                : 'text-cheesie-graphite hover:bg-cheesie-surface'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Trang 1 · Món lẻ & Tacos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('combos')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] flex items-center gap-1.5 ${
              activeTab === 'combos'
                ? 'bg-cheesie-burgundy text-cheesie-surface shadow-xs'
                : 'text-cheesie-graphite hover:bg-cheesie-surface'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Trang 2 · Combo tiết kiệm</span>
          </button>
        </div>

        {/* Scrollable / Zoomable Image Viewer */}
        <div className="flex-1 overflow-auto p-3 sm:p-6 bg-cheesie-surface-muted/20 flex items-center justify-center">
          <div
            className={`transition-all duration-300 ${
              isZoomed ? 'w-[150%] max-w-none cursor-zoom-out' : 'w-full max-w-2xl cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed((prev) => !prev)}
          >
            {activeTab === 'main' ? (
              <img
                src="/assets/menu.jpg"
                alt="Menu gốc Cheesie: Tacos, Burger, Gà tender, Khoai, Mì Ý và Nước uống"
                className="w-full h-auto rounded-xl border border-cheesie-line shadow-station-card object-contain"
              />
            ) : (
              <img
                src="/assets/combos.jpg"
                alt="Menu combo Cheesie: Combo Chicken and Fries, Best Seller, Bestie, Signature Mega và Big Feast"
                className="w-full h-auto rounded-xl border border-cheesie-line shadow-station-card object-contain"
              />
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-3 sm:p-4 border-t border-cheesie-line/70 bg-cheesie-surface shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px] text-cheesie-muted">
          <span>* Hình ảnh menu được chụp thực tế tại quán Cheesie Cần Thơ.</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs font-bold text-cheesie-burgundy hover:bg-cheesie-surface-muted h-8"
          >
            Đóng & quay lại gọi món ➔
          </Button>
        </div>
      </div>
    </div>
  );
};
