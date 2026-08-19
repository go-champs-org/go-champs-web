'use client';

import { useEffect, useRef, useState } from 'react';

const AD_CLIENT = 'ca-pub-8429375868019921';
const AD_SLOT = '7176219418';

interface AdsByGoogleWindow extends Window {
  adsbygoogle?: unknown[];
}

export const AdBanner = () => {
  // AdSense rewrites the <ins> — status attributes, inline styles, an injected
  // iframe — as soon as its loader runs. Server-rendering that node hands React
  // ownership of attributes a third party changes underneath it, and hydration
  // then reports a mismatch it cannot patch up. Mounting the slot on the client
  // only means there is no server HTML to disagree with.
  const [isSlotMounted, setIsSlotMounted] = useState(false);
  // React strict mode runs effects twice; a second push on the same <ins>
  // makes AdSense throw "All ins elements already have ads in them".
  const hasRequestedAd = useRef(false);

  useEffect(() => {
    setIsSlotMounted(true);
  }, []);

  useEffect(() => {
    if (!isSlotMounted || hasRequestedAd.current) return;
    hasRequestedAd.current = true;

    const adsWindow = window as AdsByGoogleWindow;
    // The loader drains this queue once it arrives, so pushing before the
    // script loads is the documented way to request a render.
    adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
    adsWindow.adsbygoogle.push({});
  }, [isSlotMounted]);

  return (
    <div className="mx-auto mb-8 w-full max-w-[560px] md:mb-12 md:max-w-[1320px]">
      {/* React 19 hoists async scripts to <head> and de-duplicates them by
          src, which covers what next/script's afterInteractive strategy did
          here — and next/script's props are untyped under this repo's
          TypeScript version. */}
      <script
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
      />
      {/* AdSense measures the slot when the request is queued: a zero-width box
          fails with "No slot size for availableWidth=0". The <ins> must be a
          full-width block, never a bare flex item. */}
      {isSlotMounted && (
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};
