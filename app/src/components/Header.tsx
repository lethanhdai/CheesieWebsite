import React from 'react';

interface HeaderProps {
  bagCount: number;
  onOpenBag: () => void;
}

export const Header: React.FC<HeaderProps> = ({ bagCount, onOpenBag }) => {
  return (
    <header>
      <a className="wordmark" href="#home" aria-label="Cheesie trang chủ">
        <img src="/assets/logo.jpg" alt="Cheesie — Burgers & Tacos" />
      </a>

      <nav aria-label="Điều hướng chính">
        <a href="#menu">Menu nhà Cheesie</a>
        <a href="#builder">
          Tự cuốn tacos <i>✦</i>
        </a>
        <a href="#space">Ghé nhà Cheesie</a>
      </nav>

      <button
        type="button"
        className="bag-button"
        id="open-bag"
        onClick={onOpenBag}
        aria-label={`Mở túi đồ ngon, hiện có ${bagCount} món`}
      >
        Túi đồ ngon <span>{bagCount}</span>
      </button>
    </header>
  );
};
