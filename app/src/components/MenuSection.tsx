import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { formatVND } from '../domain/cart';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onSelectDish: (item: MenuItem) => void;
  onViewOriginalMenu: () => void;
}

type MenuCategory = 'favourites' | 'burger' | 'chicken' | 'pasta' | 'drinks';

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onSelectDish,
  onViewOriginalMenu,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('favourites');

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'favourites', label: 'Món nên thử' },
    { key: 'burger', label: 'Burger' },
    { key: 'chicken', label: 'Gà & khoai' },
    { key: 'pasta', label: 'Mì Ý' },
    { key: 'drinks', label: 'Nước uống' },
  ];

  const favouriteIds = ['taco', 'burger-beef', 'chicken-1', 'fries'];

  const displayedItems =
    activeCategory === 'favourites'
      ? favouriteIds
          .map((id) => menuItems.find((i) => i.id === id))
          .filter((i): i is MenuItem => i !== undefined)
      : menuItems.filter((i) => i.category === activeCategory);

  const handleDishClick = (item: MenuItem) => {
    if (item.id === 'taco') {
      const builderElement = document.getElementById('builder');
      if (builderElement) {
        builderElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    onSelectDish(item);
  };

  return (
    <section className="menu-section section" id="menu">
      <div className="section-title">
        <div>
          <p className="eyebrow">PLATFORM 01 / MENU NHÀ CHEESIE</p>
          <h2>
            Mỗi cơn đói.
            <br />
            <em>Một món đúng gu.</em>
          </h2>
        </div>
        <p>
          Team tacos hay team burger?
          <br />
          Nhà Cheesie có chỗ cho mọi chiếc bụng đói.
        </p>
      </div>

      <div className="menu-toolbar">
        <div className="category-tabs" role="group" aria-label="Nhóm món ăn">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={activeCategory === cat.key ? 'selected' : ''}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="menu-original"
          id="view-menu"
          onClick={onViewOriginalMenu}
        >
          Xem menu gốc ↗
        </button>
      </div>

      <div className="menu-grid" id="menu-grid">
        {displayedItems.map((item) => (
          <article className="menu-card" key={item.id}>
            <div className="dish-image">
              {item.image ? (
                <img
                  src={`/assets/${item.image}`}
                  alt={
                    item.id === 'taco'
                      ? 'Tacos từ ảnh menu Cheesie'
                      : item.image === 'burger.jpg'
                      ? 'Ảnh burger đại diện từ menu Cheesie'
                      : `${item.name} từ menu Cheesie`
                  }
                  loading="lazy"
                />
              ) : (
                <div className={`menu-art ${item.category}`} aria-hidden="true">
                  {item.emoji}
                </div>
              )}
              {item.tag && <span>{item.tag}</span>}
            </div>

            <div className="menu-card-text">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="dish-bottom">
                <strong>
                  {item.id === 'taco' ? 'Từ ' : ''}
                  {formatVND(item.price)}
                </strong>
                <button
                  type="button"
                  className="dish-add"
                  onClick={() => handleDishClick(item)}
                  aria-label={`${item.id === 'taco' ? 'Tự chọn' : 'Chọn'} ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <a className="tacos-banner" href="#builder">
        <span>KHÔNG THẤY CHIẾC TACOS TRONG MƠ?</span>
        <strong>
          Vậy thì tự cuốn một chiếc. <i>↗</i>
        </strong>
        <span>5 SIZE · 5 LOẠI NHÂN · 4 LOẠI SỐT</span>
      </a>
    </section>
  );
};
