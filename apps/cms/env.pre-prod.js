// Build for pre-prod.go-champs.com: prod credentials (real API, real data),
// plus the flag that tells the app it sits behind the Worker (see
// EdgeRouting). Unlike env.new-staging.js this points at production, not
// staging — anything done here mutates real data.
module.exports = {
  ...require('./env.prod.js'),
  REACT_APP_ENV: 'pre-prod',
  REACT_APP_EDGE_ROUTING: 'true'
};
