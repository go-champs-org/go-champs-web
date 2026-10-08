import { initializeFaro } from '@grafana/faro-web-sdk';
import {
  REACT_APP_BUILD_NUMBER,
  REACT_APP_ENV,
  REACT_APP_FARO_URL
} from '../env';
import { buildFaroConfig } from './faroConfig';

const bootstrap = () => {
  const config = buildFaroConfig({
    env: REACT_APP_ENV,
    url: REACT_APP_FARO_URL,
    version: REACT_APP_BUILD_NUMBER
  });

  if (config) {
    initializeFaro(config);
  }
};

const faro = { bootstrap };

export default faro;
