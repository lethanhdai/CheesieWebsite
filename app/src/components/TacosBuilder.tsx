import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { TacosSizeKey, IngredientKind, SelectedIngredients } from '../types';
import {
  TACOS_SIZES,
  INGREDIENTS,
  canAddIngredient,
  countIngredientKind,
  isTacosReady,
  computeTacosPrice,
  formatSelectedNames,
} from '../domain/tacos';
import { formatVND } from '../domain/cart';
import { TortillaSvg, IngredientIconSvg } from './TortillaSvg';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TacosBuilderProps {
  size: TacosSizeKey;
  selected: SelectedIngredients;
  note: string;
  folded: boolean;
  onSizeChangeRequest: (nextSize: TacosSizeKey) => void;
  onIngredientAdd: (id: string) => void;
  onIngredientRemove: (id: string) => void;
  onNoteChange: (note: string) => void;
  onToggleFold: () => void;
  onResetRequest: () => void;
  onAddTacosToCart: () => void;
  onToast: (msg: string) => void;
  isEditing?: boolean;
}

export const TacosBuilder: React.FC<TacosBuilderProps> = ({
  size,
  selected,
  note,
  folded,
  onSizeChangeRequest,
  onIngredientAdd,
  onIngredientRemove,
  onNoteChange,
  onToggleFold,
  onResetRequest,
  onAddTacosToCart,
  onToast,
  isEditing = false,
}) => {
  const [activeKind, setActiveKind] = useState<IngredientKind>('protein');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const sizeConfig = TACOS_SIZES[size];
  const proteinCount = countIngredientKind(selected, 'protein');
  const sauceCount = countIngredientKind(selected, 'sauce');
  const extraCount = countIngredientKind(selected, 'extra');
  const ready = isTacosReady(size, selected);
  const totalPrice = computeTacosPrice(size, selected);

  const leftP = Math.max(0, sizeConfig.protein - proteinCount);
  const leftS = Math.max(0, sizeConfig.sauce - sauceCount);

  const hasAnyIngredient = Object.values(selected).some((count) => count > 0);

  const nextStopLabel = ready
    ? 'SẴN SÀNG LÊN TÀU'
    : proteinCount < sizeConfig.protein
    ? 'CHỌN NHÂN'
    : 'THÊM SỐT';

  const baseDescription = sizeConfig.base.length
    ? `Đã có trong giá size ${size}: ${sizeConfig.base.join(' + ')}.`
    : 'Size S: 1 phần nhân + 1 phần sốt. Topping thêm tính riêng.';

  const trayHelpText =
    activeKind === 'extra'
      ? 'Topping tính riêng. Sốt thêm mở sau khi chọn đủ sốt của size.'
      : `Đã chọn ${countIngredientKind(selected, activeKind)}/${
          sizeConfig[activeKind]
        } phần ${activeKind === 'protein' ? 'nhân' : 'sốt'} theo size ${size}.`;

  const filteredIngredients = INGREDIENTS.filter((item) => item.kind === activeKind);

  // Drag & drop handlers for desktop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const id = e.dataTransfer.getData('text/plain');
    if (id) {
      if (canAddIngredient(size, selected, id)) {
        onIngredientAdd(id);
      } else {
        onToast(`Size ${size} đã đủ phần này hoặc không thể chọn lặp.`);
      }
    }
  };

  const handleFoldClick = () => {
    if (!ready && !folded) {
      onToast('Bạn hãy chọn đủ nhân và sốt trước khi cuốn nhé.');
      return;
    }
    onToggleFold();
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const tabs: IngredientKind[] = ['protein', 'sauce', 'extra'];
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      setActiveKind(tabs[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveKind(tabs[prevIndex]);
    }
  };

  return (
    <section className="builder-section relative" id="builder">
      <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="section-title flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-cheesie-line/70">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="station" className="px-2.5 py-0.5 text-[9px] font-bold">
                PLATFORM 02
              </Badge>
              <span className="text-xs font-bold tracking-wider text-cheesie-muted uppercase">
                TACOS EXPRESS · TỰ CUỐN THEO GU
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cheesie-graphite tracking-tight leading-tight">
              Chiếc tacos này,
              <br />
              <span className="text-cheesie-burgundy italic font-black">bạn làm chủ.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-cheesie-muted max-w-sm leading-relaxed">
            Chọn size. Kéo nhân vào bánh. Thêm sốt.
            <br />
            Phần ngon nhất? Mọi lựa chọn đều là của bạn.
          </p>
        </div>

        {/* Ga tàu Departure Board */}
        <div className="departure-board" aria-label="Bảng khởi hành Tacos Express">
          <div className="flex items-center gap-3">
            <span className="train-icon" aria-hidden="true">
              ↔
            </span>
            <div>
              <span className="font-bold tracking-wider text-sm sm:text-base">TACOS EXPRESS</span>
              <small className="text-[9px] text-cheesie-steel tracking-wide block">
                CHEESIE STATION → YOUR HAPPY PLACE
              </small>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="departure-info">
              <small className="text-[8px] sm:text-[9px] tracking-wider text-cheesie-steel uppercase">
                SIZE / TOA BÁNH
              </small>
              <strong className="text-base sm:text-xl font-black text-cheesie-surface">{size}</strong>
            </div>

            <div className="departure-info destination">
              <small className="text-[8px] sm:text-[9px] tracking-wider text-cheesie-steel uppercase">
                TRẠM TIẾP THEO
              </small>
              <strong className="text-xs sm:text-sm font-bold text-cheesie-gold">{nextStopLabel}</strong>
            </div>

            <span
              className={`departure-light ${
                ready
                  ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                  : 'bg-amber-400 shadow-[0_0_10px_#fbbf24]'
              }`}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Two-Column Layout: ~44% Visual Preview vs ~56% Controls */}
        <div className="builder-layout">
          {/* Cột trực quan: Bánh Tortilla và tương tác (~44%) */}
          <div className="visual-column">
            <div className="size-heading">
              <span>01 / CHỌN SIZE</span>
              <span>{formatVND(sizeConfig.price)}</span>
            </div>

            <div className="sizes" role="group" aria-label="Chọn size tacos">
              {(['S', 'M', 'L', 'XL', 'XXL'] as TacosSizeKey[]).map((s) => {
                const isSelected = s === size;
                return (
                  <button
                    key={s}
                    type="button"
                    className={isSelected ? 'selected' : ''}
                    aria-pressed={isSelected}
                    onClick={() => onSizeChangeRequest(s)}
                  >
                    <span className="text-base font-black">{s}</span>
                    <span className="block text-[8px] sm:text-[9px] font-medium mt-0.5 opacity-90">
                      {TACOS_SIZES[s].protein} nhân · {TACOS_SIZES[s].sauce} sốt
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className={`board ${isDragOver ? 'dragover' : ''} ${folded ? 'folded' : ''}`}
              id="dropzone"
              aria-label="Bánh tacos, vùng thả nhân và sốt"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className="board-label">CHEESIE / MAKE IT YOURS</span>

              <div className="tortilla-wrap" id="tortilla-wrap">
                <TortillaSvg size={size} selected={selected} />

                <div
                  className="board-message"
                  style={{ opacity: hasAnyIngredient ? 0 : 1 }}
                >
                  <span aria-hidden="true">✦</span>
                  <strong>Bánh đã sẵn sàng.</strong>
                  <p>
                    Kéo nhân vào đây
                    <br />
                    hoặc bấm nút + bên cạnh.
                  </p>
                </div>
              </div>

              <div className="folded-preview" aria-hidden="true">
                <div className="grill"></div>
                <span>CHEESIE</span>
              </div>

              <span className="board-bottom">
                {ready
                  ? 'ĐÚNG GU BẠN. ĐÚNG CHẤT CHEESIE.'
                  : 'THÊM TỪNG CHÚT NGON VÀO BÁNH'}
              </span>

              {hasAnyIngredient && (
                <button
                  type="button"
                  className="reset"
                  onClick={onResetRequest}
                  aria-label="Làm lại chiếc tacos này"
                >
                  ↺ Làm lại
                </button>
              )}
            </div>

            <div className="board-info">
              <span>
                {proteinCount}/{sizeConfig.protein} nhân · {sauceCount}/{sizeConfig.sauce} sốt
              </span>
              <button type="button" onClick={handleFoldClick}>
                {folded ? 'Mở bánh để chỉnh sửa ↗' : 'Xem bánh đã cuốn ↗'}
              </button>
            </div>

            <p className="base-description">{baseDescription}</p>
          </div>

          {/* Cột chọn thành phần (~56%) */}
          <div className="ingredient-column">
            <div className="ingredient-tabs" role="tablist" aria-label="Chọn thành phần">
              <button
                type="button"
                role="tab"
                id="tab-protein"
                aria-selected={activeKind === 'protein'}
                aria-controls="ingredient-tray"
                onClick={() => setActiveKind('protein')}
                onKeyDown={(e) => handleTabKeyDown(e, 0)}
              >
                02 / Nhân bánh
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-cheesie-surface-muted text-cheesie-graphite font-bold">
                  {proteinCount}/{sizeConfig.protein}
                </span>
              </button>
              <button
                type="button"
                role="tab"
                id="tab-sauce"
                aria-selected={activeKind === 'sauce'}
                aria-controls="ingredient-tray"
                onClick={() => setActiveKind('sauce')}
                onKeyDown={(e) => handleTabKeyDown(e, 1)}
              >
                03 / Nước sốt
                <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-cheesie-surface-muted text-cheesie-graphite font-bold">
                  {sauceCount}/{sizeConfig.sauce}
                </span>
              </button>
              <button
                type="button"
                role="tab"
                id="tab-extra"
                aria-selected={activeKind === 'extra'}
                aria-controls="ingredient-tray"
                onClick={() => setActiveKind('extra')}
                onKeyDown={(e) => handleTabKeyDown(e, 2)}
              >
                Thêm chút ngon
                {extraCount > 0 && (
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-cheesie-burgundy text-cheesie-surface font-bold">
                    {extraCount}
                  </span>
                )}
              </button>
            </div>

            <div className="tray-intro">
              <span>{trayHelpText}</span>
              <span className="drag-hint">KÉO THẢ HOẶC BẤM +</span>
            </div>

            <div
              className="ingredient-tray"
              id="ingredient-tray"
              role="tabpanel"
              aria-labelledby={`tab-${activeKind}`}
            >
              {filteredIngredients.map((item) => {
                const currentQty = selected[item.id] || 0;
                const canAdd = canAddIngredient(size, selected, item.id);
                const isSelected = currentQty > 0;

                return (
                  <div
                    key={item.id}
                    className={`ingredient-card ${isSelected ? 'selected' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                  >
                    <div className="w-11 h-11 rounded-lg bg-cheesie-surface-muted/60 flex items-center justify-center shrink-0 border border-cheesie-line/50">
                      <IngredientIconSvg icon={item.icon} color={item.color} />
                    </div>
                    <div className="ingredient-info">
                      <strong>{item.name}</strong>
                      <small>
                        {item.kind === 'extra'
                          ? `+${formatVND(item.price || 0)}`
                          : item.note || 'Theo phần nhân của size'}
                      </small>
                      <div className="stepper">
                        <button
                          type="button"
                          aria-label={`Bớt ${item.name}`}
                          disabled={currentQty === 0}
                          onClick={() => onIngredientRemove(item.id)}
                        >
                          −
                        </button>
                        <span>{currentQty}</span>
                        <button
                          type="button"
                          aria-label={`Thêm ${item.name}`}
                          disabled={!canAdd}
                          onClick={() => {
                            if (canAdd) {
                              onIngredientAdd(item.id);
                            } else {
                              onToast(
                                `Size ${size} đã đủ phần này hoặc không thể chọn lặp.`
                              );
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Khung tóm tắt lựa chọn */}
            <div className="selection">
              {isEditing && (
                <div className="mb-3">
                  <Badge variant="station" className="text-[10px] px-2.5 py-0.5 font-bold">
                    ĐANG CHỈNH SỬA TỪ GIỎ HÀNG
                  </Badge>
                </div>
              )}

              <div className="selection-title">
                <span>CHIẾC TACOS CỦA BẠN</span>
                <span
                  className={
                    ready
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-cheesie-surface-muted text-cheesie-graphite'
                  }
                >
                  {ready ? 'SẴN SÀNG CUỐN' : 'ĐANG CHỌN'}
                </span>
              </div>

              <div className="selection-details">
                <div className="selection-row">
                  <span>Size {size}</span>
                  <span>{formatVND(sizeConfig.price)}</span>
                </div>
                <div className="selection-row">
                  <span>Nhân</span>
                  <span>{formatSelectedNames(selected, 'protein') || 'Chưa chọn'}</span>
                </div>
                <div className="selection-row">
                  <span>Sốt</span>
                  <span>{formatSelectedNames(selected, 'sauce') || 'Chưa chọn'}</span>
                </div>
                {sizeConfig.base.length > 0 && (
                  <div className="selection-row">
                    <span>Đã gồm</span>
                    <span>{sizeConfig.base.join(', ')}</span>
                  </div>
                )}
                {countIngredientKind(selected, 'extra') > 0 && (
                  <div className="selection-row">
                    <span>Thêm</span>
                    <span>{formatSelectedNames(selected, 'extra')}</span>
                  </div>
                )}
              </div>

              <label className="taco-note-label" htmlFor="taco-note">
                Ghi chú cho chiếc tacos
              </label>
              <input
                className="note-input"
                id="taco-note"
                type="text"
                maxLength={200}
                placeholder="Ví dụ: ít cay, vị của phần sốt thêm…"
                value={note}
                onChange={(e) => onNoteChange(e.target.value)}
              />

              <div className="total-line">
                <span>Tổng chiếc tacos</span>
                <strong>{formatVND(totalPrice)}</strong>
              </div>

              <button
                type="button"
                className="button burgundy"
                id="add-taco"
                disabled={!ready}
                onClick={onAddTacosToCart}
              >
                {ready
                  ? `${
                      isEditing ? 'Cập nhật chiếc tacos' : 'Thêm vào túi'
                    } · ${formatVND(totalPrice)}`
                  : leftP > 0
                  ? `Còn ${leftP} phần nhân để hoàn thành`
                  : `Còn ${leftS} phần sốt để hoàn thành`}
                <span>↗</span>
              </button>

              <p
                className="builder-status"
                id="builder-status"
                role="status"
                aria-live="polite"
              >
                {ready
                  ? 'Đủ nhân & sốt rồi. Cuốn thôi!'
                  : `Còn ${leftP} phần nhân và ${leftS} phần sốt để hoàn thành.`}
              </p>
            </div>

            <p className="rule-note">
              Mỗi loại nhân và sốt được chọn một lần. Giá và số phần theo menu Cheesie.
              Topping thêm tính riêng.
            </p>
          </div>
        </div>

        {/* Mobile Sticky Action Bar */}
        <div className="lg:hidden sticky bottom-0 -mx-4 mt-8 z-40 bg-cheesie-surface/95 backdrop-blur-md border-t border-cheesie-line px-4 py-3 shadow-lg flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-cheesie-muted uppercase font-bold block">
              Tacos size {size} · {ready ? 'Sẵn sàng' : `Thiếu ${leftP + leftS} món`}
            </span>
            <strong className="text-base font-extrabold text-cheesie-graphite">
              {formatVND(totalPrice)}
            </strong>
          </div>

          <Button
            variant="station"
            size="sm"
            disabled={!ready}
            onClick={onAddTacosToCart}
            className="h-10 px-4 text-xs font-bold"
          >
            {ready ? (isEditing ? 'Cập nhật' : 'Thêm vào túi') : 'Chưa đủ phần'}
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
