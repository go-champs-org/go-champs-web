/**
 * Whether this build sits behind the Worker in apps/cms/worker/index.ts. Set by
 * env.new-staging.js; the Netlify builds leave it unset — turn it on in
 * env.prod.js when production moves behind the Worker too.
 */
export const isEdgeRoutingEnabled = (): boolean =>
  process.env.REACT_APP_EDGE_ROUTING === 'true';
