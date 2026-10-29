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
        {/* Editorial Eyebrow Label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cheesie-burgundy shrink-0" aria-hidden="true" />
          <span className="text-xs font-bold tracking-widest text-cheesie-burgundy uppercase">
            GHÉ CHEESIE
          </span>
        </div>
        <h2>
          Một trạm dừng,
          <br />
          <em>đủ món ngon.</em>
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
          09:30–22:30 · <a href="tel:0788786283">078 878 6283</a>
        </p>
        <span className="space-caption">KHÔNG GIAN THẬT TẠI CHEESIE</span>
      </div>
    </section>
  );
};
