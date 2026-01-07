/// <reference types="react-scripts" />

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId?: string | Date,
      config?: object
    ) => void;
  }
}
