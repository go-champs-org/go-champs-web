module.exports = {
  "CI": false,
  "REACT_APP_AMPLITUDE_API_KEY": process.env.AMPLITUDE_API_KEY,
  "REACT_APP_API_HOST": process.env.PROD_API_HOST,
  "REACT_APP_BUILD_NUMBER": process.env.GITHUB_RUN_NUMBER,
  "REACT_APP_ENV": "prod",
  "REACT_APP_EMAILJS_PUBLIC_KEY": process.env.EMAILJS_PUBLIC_KEY,
  "REACT_APP_EMAILJS_TEMPLATE_ID": process.env.EMAILJS_TEMPLATE_ID,
  "REACT_APP_FACEBOOK_APP_ID": process.env.FACEBOOK_APP_ID,
  "REACT_APP_GA_ID": process.env.GA_ID,
  "REACT_APP_RECAPTCHA_SITE_KEY": process.env.PROD_RECAPTCHA_SITE_KEY,
  "REACT_APP_SCOREBOARD_APP_URL": process.env.PROD_SCOREBOARD_APP_URL
};