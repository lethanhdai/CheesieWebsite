import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="dot" aria-hidden="true"></span> GA CHEESIE / TRẠM ĐỒ NGON
        </div>
        <h1>
          Đói rồi?
          <br />
          <em>Cuốn</em> thôi.
        </h1>
        <p>
          Tacos đầy nhân, burger đẫm vị, gà giòn rụm.
          <br />
          Ghé Cheesie, chọn một món ngon — hay tự tạo chiếc tacos đúng gu của bạn.
        </p>
        <div className="hero-buttons">
          <a className="button yellow" href="#builder">
            Tự cuốn tacos của bạn <span>↗</span>
          </a>
          <a className="quiet-link" href="#menu">
            Khám phá menu ↓
          </a>
        </div>
        <div className="hero-foot" aria-label="3 bước tự cuốn tacos">
          <span>
            <b>01</b> CHỌN SIZE
          </span>
          <span>
            <b>02</b> THẢ NHÂN
          </span>
          <span>
            <b>03</b> THÊM SỐT
          </span>
        </div>
      </div>

      <div className="hero-art">
        <div className="carriage-sign">
          <span>01</span> CHEESIE STATION <b>↗</b>
        </div>
        <img
          className="feast"
          src="/assets/feast.jpg"
          alt="Tacos, burger, gà tender, mì Ý và khoai tây của Cheesie"
        />
        <span className="hero-caption">
          TOA ĐỒ NGON
          <br />
          FRENCH TACOS & BURGERS
        </span>
        <div className="stamp" aria-hidden="true">
          CUỐN THEO
          <br />
          <strong>GU BẠN</strong>
          <span>★ CHEESIE ★</span>
        </div>
        <span className="photo-credit">ẢNH TỪ MENU NHÀ CHEESIE</span>
      </div>

      <div className="hero-bottom-mark" aria-hidden="true">
        CHEESIE
      </div>
    </section>
  );
};
