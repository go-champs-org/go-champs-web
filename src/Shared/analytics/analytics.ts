import * as amplitude from '@amplitude/analytics-browser';
import { REACT_APP_AMPLITUDE_API_KEY, REACT_APP_ENV } from '../env';

const bootstrap = () => {
  if (REACT_APP_ENV === 'prod') {
    amplitude.init(REACT_APP_AMPLITUDE_API_KEY || '');
  } else {
    console.log('Analytics disabled');
  }
};

export default {
  bootstrap
};
