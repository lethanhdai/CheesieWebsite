import React from 'react';

interface SpaceSectionProps {
  onOpenRestaurantInfo: () => void;
}

export const SpaceSection: React.FC<SpaceSectionProps> = ({
  onOpenRestaurantInfo,
}) => {
  return (
    <section className="space-section section" id="space">
      <div className="space-image reveal-on-scroll">
        <img
          src="/assets/restaurant.jpg"
          alt="Mặt tiền và chỗ ngồi Cheesie với phong cách trạm tàu, ghế đỏ và đèn trần hình học"
          loading="lazy"
        />
        <span>CHEESIE STATION — NEXT STOP: GOOD FOOD.</span>
      </div>

      <div className="space-copy reveal-on-scroll reveal-stagger-2">
        <p className="eyebrow">PLATFORM 03 / CHEESIE STATION</p>
        <h2>
          Trạm dừng
          <br />
          của những
          <br />
          <em>chiếc bụng đói.</em>
        </h2>
        <p>
          Một cuộc hẹn với bạn thân, một bữa tối đổi gió,
          <br />
          hay đơn giản là hôm nay thèm chút phô mai.
          <br />
          Cheesie đợi bạn ghé.
        </p>

        <button
          type="button"
          className="button burgundy min-h-[44px]"
          id="restaurant-info"
          onClick={onOpenRestaurantInfo}
        >
          Thông tin ghé quán <span>↗</span>
        </button>

        <p className="address">
          102 Lê Lai, Ninh Kiều, Cần Thơ
          <br />
          9:30–22:30 · <a href="tel:0788786283">078 878 6283</a>
        </p>
        <span className="space-caption">KHÔNG GIAN THẬT TẠI CHEESIE</span>
      </div>
    </section>
  );
};
