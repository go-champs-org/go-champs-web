import * as amplitude from '@amplitude/analytics-browser';
import {
  REACT_APP_AMPLITUDE_API_KEY,
  REACT_APP_ENV,
  REACT_APP_GA_ID
} from '../env';

const bootstrap = () => {
  if (REACT_APP_ENV === 'prod') {
    amplitude.init(REACT_APP_AMPLITUDE_API_KEY || '', {
      defaultTracking: true
    });
    gtag('js', new Date());

    gtag('config', REACT_APP_GA_ID || '');
  } else {
    console.log('Analytics disabled');
  }
};

const track = (eventName: string, eventProperties?: Record<string, any>) => {
  if (REACT_APP_ENV === 'prod') {
    amplitude.track(eventName, eventProperties);
  } else {
    console.log('Analytics track:', eventName, eventProperties);
  }
};

// PWA-specific tracking events
const trackPWAPromptShown = (platform: string, hasNativePrompt: boolean) => {
  track('PWA Install Prompt Shown', {
    platform,
    has_native_prompt: hasNativePrompt,
    timestamp: new Date().toISOString()
  });
};

const trackPWAInstalled = (platform: string, method: 'native' | 'manual') => {
  track('PWA Installed', {
    platform,
    installation_method: method,
    timestamp: new Date().toISOString()
  });
};

const trackPWAPromptDismissed = (
  platform: string,
  hasNativePrompt: boolean
) => {
  track('PWA Install Prompt Dismissed', {
    platform,
    has_native_prompt: hasNativePrompt,
    timestamp: new Date().toISOString()
  });
};

const trackPWADeferredPromptAvailable = (platform: string) => {
  track('PWA Deferred Prompt Available', {
    platform,
    timestamp: new Date().toISOString()
  });
};

const analytics = {
  bootstrap,
  track,
  trackPWAPromptShown,
  trackPWAInstalled,
  trackPWAPromptDismissed,
  trackPWADeferredPromptAvailable
};

export default analytics;
