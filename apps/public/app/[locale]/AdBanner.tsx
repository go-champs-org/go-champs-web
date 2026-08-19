'use client';

import { useEffect, useRef, useState } from 'react';

const AD_CLIENT = 'ca-pub-8429375868019921';
const AD_SLOT = '7176219418';

export const AD_LOADER_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

interface AdsByGoogleWindow extends Window {
  adsbygoogle?: unknown[];
}

const appendLoaderOnce = () => {
  if (document.querySelector(`script[src="${AD_LOADER_SRC}"]`)) return;

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = AD_LOADER_SRC;
  document.head.appendChild(script);
};

export const AdBanner = () => {
  // Everything AdSense touches is created after hydration, on purpose. The
  // loader stamps data-checked-head="true" on its own <script> tag and rewrites
  // the <ins> (status attributes, inline styles, an injected iframe). Any of
  // those nodes rendered by React would hydrate against markup a third party
  // already changed, which React reports as a mismatch it cannot patch up.
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

    appendLoaderOnce();

    const adsWindow = window as AdsByGoogleWindow;
    // The loader drains this queue once it arrives, so queueing before the
    // script loads is the documented way to request a render.
    adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
    adsWindow.adsbygoogle.push({});
  }, [isSlotMounted]);

  return (
    <div className="mx-auto w-full max-w-[560px] md:max-w-[1320px]">
      {/* AdSense measures the slot when the request is queued: a zero-width box
          fails with "No slot size for availableWidth=0", so the <ins> must be a
          full-width block. It also carries its own bottom margin — an unfilled
          slot is marked data-ad-status="unfilled" and hidden, and the gap goes
          with it. */}
      {isSlotMounted && (
        <ins
          className="adsbygoogle mb-8 block w-full data-[ad-status=unfilled]:hidden md:mb-12"
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};
