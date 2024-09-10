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

export default {
  bootstrap
};
