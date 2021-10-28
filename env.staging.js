module.exports = {
  "CI": false,
  "NODE_OPTIONS": "--openssl-legacy-provider",
  "REACT_APP_ENV": "staging",
  "REACT_APP_FACEBOOK_APP_ID": process.env.FACEBOOK_APP_ID,
  "REACT_APP_BUILD_NUMBER": process.env.TRAVIS_BUILD_NUMBER,
  "REACT_APP_API_HOST": process.env.STAGING_API_HOST,
  "REACT_APP_RECAPTCHA_SITE_KEY": process.env.STAGING_RECAPTCHA_SITE_KEY,
};