'use client';

import { useEffect, useRef, useState } from 'react';

interface AdsByGoogleWindow extends Window {
  adsbygoogle?: unknown[];
}

const appendLoaderOnce = (src: string) => {
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = src;
  document.head.appendChild(script);
};

const queueAdRequest = () => {
  const adsWindow = window as AdsByGoogleWindow;
  // The loader drains this queue once it arrives, so queueing before the
  // script loads is the documented way to request a render.
  adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
  adsWindow.adsbygoogle.push({});
};

/**
 * Drives one AdSense slot: mounts it after hydration, asks for an ad once, and
 * reports whether one arrived.
 *
 * Nothing AdSense touches may be rendered by React. The loader stamps
 * data-checked-head="true" on its own <script> tag and rewrites the <ins>
 * (status attributes, inline styles, an injected iframe); React would hydrate
 * against markup a third party already changed and report a mismatch it cannot
 * patch up.
 */
export const useAdSlot = (loaderSrc: string) => {
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

    appendLoaderOnce(loaderSrc);
    queueAdRequest();
  }, [isSlotMounted, loaderSrc]);

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;

    // AdSense reports the outcome on the slot itself: "filled" once an ad is
    // rendered, "unfilled" when it has nothing to show. Watching it is what
    // keeps the banner from reserving height it may never use.
    const observer = new MutationObserver(() =>
      setIsFilled(slot.getAttribute('data-ad-status') === 'filled')
    );
    observer.observe(slot, {
      attributes: true,
      attributeFilter: ['data-ad-status']
    });

    return () => observer.disconnect();
  }, [isSlotMounted]);

  return { isSlotMounted, isFilled, slotRef };
};
