import * as amplitude from '@amplitude/analytics-browser';

const bootstrap = () => {
    if (process.env.REACT_APP_ENV === 'prod') {
        amplitude.init(process.env.REACT_APP_AMPLITUDE_API_KEY || '');
    } else {
        console.log('Analytics disabled');
    }
}

export default {
    bootstrap,
}