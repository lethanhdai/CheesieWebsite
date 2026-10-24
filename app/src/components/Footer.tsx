import React from 'react';

interface FooterProps {
  onViewOriginalMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewOriginalMenu }) => {
  return (
    <footer>
      <a className="wordmark" href="#home" aria-label="Cheesie trang chủ">
        <img src="/assets/logo.jpg" alt="Cheesie — Burgers & Tacos" />
      </a>
      <span>Cuốn theo cách của bạn.</span>
      <button type="button" id="footer-menu" onClick={onViewOriginalMenu}>
        Menu gốc ↗
      </button>
      <span>© 2026 Cheesie</span>
    </footer>
  );
};
