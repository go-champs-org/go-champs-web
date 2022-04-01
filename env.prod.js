module.exports = {
  "CI": false,
  "NODE_OPTIONS": "--openssl-legacy-provider",
  "REACT_APP_ENV": "prod",
  "REACT_APP_FACEBOOK_APP_ID": process.env.FACEBOOK_APP_ID,
  "REACT_APP_BUILD_NUMBER": process.env.GITHUB_RUN_NUMBER,
  "REACT_APP_API_HOST": process.env.PROD_API_HOST,
  "REACT_APP_RECAPTCHA_SITE_KEY": process.env.PROD_RECAPTCHA_SITE_KEY,
};