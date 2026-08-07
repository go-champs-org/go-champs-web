'use client';

import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';

export const Amplitude = ({ apiKey }: { apiKey: string }) => {
  useEffect(() => {
    if (!apiKey) return;
    amplitude.init(apiKey, undefined, { autocapture: true });
  }, [apiKey]);

  return null;
};
