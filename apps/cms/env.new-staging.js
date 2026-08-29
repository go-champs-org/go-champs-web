// Build for new-staging.go-champs.com: the staging credentials, plus the flag
// that tells the app it sits behind the Worker (see Shared/EdgeRouting).
module.exports = {
  ...require('./env.staging.js'),
  REACT_APP_EDGE_ROUTING: 'true'
};
