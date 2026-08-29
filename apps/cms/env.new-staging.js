// Build for new-staging.go-champs.com, where the CMS runs as a Cloudflare
// Worker that routes already-migrated paths to apps/public at the edge.
//
// Same credentials as the Netlify staging build, plus the flag that tells the
// app it is behind that Worker. Links to migrated routes then navigate for
// real instead of staying inside the SPA — see Shared/EdgeRouting.
//
// The Netlify builds (env.staging.js, env.prod.js) leave the flag unset, so
// they keep client-side navigation. Turn it on in env.prod.js when production
// moves behind the Worker too.
module.exports = {
  ...require('./env.staging.js'),
  REACT_APP_EDGE_ROUTING: 'true'
};
