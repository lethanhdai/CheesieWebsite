import React, { useState } from 'react';
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
    <section className="builder-section" id="builder">
      <div className="section-title">
        <div>
          <p className="eyebrow">PLATFORM 02 / TACOS EXPRESS</p>
          <h2>
            Chiếc tacos này,
            <br />
            <em>bạn làm chủ.</em>
          </h2>
        </div>
        <p>
          Chọn size. Kéo nhân vào bánh. Thêm sốt.
          <br />
          Phần ngon nhất? Mọi lựa chọn đều là của bạn.
        </p>
      </div>

      {/* Ga tàu Departure Board */}
      <div className="departure-board" aria-label="Bảng khởi hành Tacos Express">
        <div>
          <span className="train-icon" aria-hidden="true">
            ↔
          </span>
          <span>
            TACOS EXPRESS
            <small>CHEESIE STATION → YOUR HAPPY PLACE</small>
          </span>
        </div>

        <div className="departure-info">
          <small>SIZE / TOA BÁNH</small>
          <strong>{size}</strong>
        </div>

        <div className="departure-info destination">
          <small>TRẠM TIẾP THEO</small>
          <strong>{nextStopLabel}</strong>
        </div>

        <span className="departure-light" aria-hidden="true"></span>
      </div>

      <div className="builder-layout">
        {/* Cột trực quan: Bánh Tortilla và tương tác */}
        <div className="visual-column">
          <div className="size-heading">
            <span>01 / CHỌN SIZE</span>
            <span>{formatVND(sizeConfig.price)}</span>
          </div>

          <div className="sizes" role="group" aria-label="Chọn size tacos">
            {(['S', 'M', 'L', 'XL', 'XXL'] as TacosSizeKey[]).map((s) => (
              <button
                key={s}
                type="button"
                className={s === size ? 'selected' : ''}
                aria-pressed={s === size}
                onClick={() => onSizeChangeRequest(s)}
              >
                {s}
                <span>
                  {TACOS_SIZES[s].protein} nhân · {TACOS_SIZES[s].sauce} sốt
                </span>
              </button>
            ))}
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

        {/* Cột chọn thành phần */}
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

              return (
                <div
                  key={item.id}
                  className="ingredient-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                >
                  <IngredientIconSvg icon={item.icon} color={item.color} />
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
            <div className="selection-title">
              <span>CHIẾC TACOS CỦA BẠN</span>
              <span>{ready ? 'SẴN SÀNG CUỐN' : 'ĐANG CHỌN'}</span>
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
                : 'Chọn đủ nhân & sốt'}
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
    </section>
  );
};
