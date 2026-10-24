import React from 'react';

export const Ticker: React.FC = () => {
  const text =
    'GA CHEESIE ━━━ TACOS PHÁP ━━━ BURGER ━━━ GÀ TENDER ━━━ GA CHEESIE ━━━ TACOS PHÁP ━━━ BURGER ━━━ GÀ TENDER ━━━ ';

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-inner">
        {text}
        {text}
      </div>
    </div>
  );
};
