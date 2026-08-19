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
  const [isFilled, setIsFilled] = useState(false);
  const slotRef = useRef<HTMLModElement>(null);
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

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    // AdSense reports the outcome on the slot itself: "filled" once an ad is
    // rendered, "unfilled" when it has nothing to show. Watching it is what
    // keeps the banner from reserving height it may never use.
    const observer = new MutationObserver(() => {
      setIsFilled(slot.getAttribute('data-ad-status') === 'filled');
    });
    observer.observe(slot, {
      attributes: true,
      attributeFilter: ['data-ad-status']
    });

    return () => observer.disconnect();
  }, [isSlotMounted]);

  return (
    // The banner occupies no vertical space until an ad actually arrives, then
    // grows into it: a grid row animates from 0fr to 1fr, which transitions to
    // the content's own height without the page jumping. The slot keeps its
    // full width throughout, which is the measurement AdSense needs.
    <div
      className={`mx-auto grid w-full max-w-[560px] transition-[grid-template-rows] duration-300 ease-out md:max-w-[1320px] ${
        isFilled ? 'mb-8 grid-rows-[1fr] md:mb-12' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        {isSlotMounted && (
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
};
