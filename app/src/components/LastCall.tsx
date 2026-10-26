import React from 'react';

interface LastCallProps {
  onOpenOrderChannels: () => void;
}

export const LastCall: React.FC<LastCallProps> = ({ onOpenOrderChannels }) => {
  return (
    <section className="last-call reveal-on-scroll">
      <span className="eyebrow">END OF THE LINE. START OF A GOOD MEAL.</span>
      <h2>
        Hẹn bạn ở
        <br />
        <span>Cheesie.</span>
      </h2>
      <button
        type="button"
        className="button yellow min-h-[44px]"
        id="order-channels"
        onClick={onOpenOrderChannels}
      >
        Chọn kênh đặt món <span>↗</span>
      </button>
      <p>Facebook · ShopeeFood · GrabFood</p>
    </section>
  );
};
