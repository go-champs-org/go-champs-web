'use client';

import { useAdSlot } from '../../../src/hooks/useAdSlot';

const AD_CLIENT = 'ca-pub-8429375868019921';
const AD_SLOT = '7176219418';

export const AD_LOADER_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

// The banner occupies no vertical space until an ad actually arrives, then
// grows into it: the grid row animates from 0fr to 1fr, which transitions to
// the content's own height without the page jumping.
const bannerClassName = (isFilled: string) =>
  `mx-auto grid w-full max-w-[560px] transition-[grid-template-rows] duration-300 ease-out md:max-w-[1320px] ${isFilled}`;

const FILLED_CLASS = 'mb-8 grid-rows-[1fr] md:mb-12';
const COLLAPSED_CLASS = 'grid-rows-[0fr]';

export function AdBanner() {
  const { isSlotMounted, isFilled, slotRef } = useAdSlot(AD_LOADER_SRC);

  return (
    <div
      className={bannerClassName(isFilled ? FILLED_CLASS : COLLAPSED_CLASS)}
    >
      <div className="overflow-hidden">
        {isSlotMounted && (
          // The slot keeps its full width throughout: that is the measurement
          // AdSense needs, and a zero-width box fails with "No slot size for
          // availableWidth=0".
          <ins
            ref={slotRef}
            className="adsbygoogle block w-full"
            data-ad-client={AD_CLIENT}
            data-ad-slot={AD_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  );
}
