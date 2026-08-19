'use client';

import { useEffect, useRef } from 'react';

const AD_CLIENT = 'ca-pub-8429375868019921';
const AD_SLOT = '7176219418';

interface AdsByGoogleWindow extends Window {
  adsbygoogle?: unknown[];
}

export const AdBanner = () => {
  // React strict mode runs effects twice; a second push on the same <ins>
  // makes AdSense throw "All ins elements already have ads in them".
  const hasRequestedAd = useRef(false);

  useEffect(() => {
    if (hasRequestedAd.current) return;
    hasRequestedAd.current = true;

    const adsWindow = window as AdsByGoogleWindow;
    // The loader drains this queue once it arrives, so pushing before the
    // script loads is the documented way to request a render.
    adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
    adsWindow.adsbygoogle.push({});
  }, []);

  return (
    <div className="mx-auto mb-8 flex w-full max-w-[560px] items-center justify-center md:mb-12 md:max-w-[1320px]">
      {/* React 19 hoists async scripts to <head> and de-duplicates them by
          src, which covers what next/script's afterInteractive strategy did
          here — and next/script's props are untyped under this repo's
          TypeScript version. */}
      <script
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
