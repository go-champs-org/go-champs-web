/**
 * Whether this build runs behind the Cloudflare Worker that routes
 * already-migrated paths to apps/public (see apps/cms/worker/index.ts).
 *
 * It matters for links: react-router's <Link> navigates inside the SPA without
 * issuing a request, so the edge never sees it and the CMS renders its own,
 * pre-migration version of a page that has already moved. Behind the Worker
 * those links have to be real navigations; on Netlify they must stay
 * client-side, or every one of them becomes a full page load for nothing.
 *
 * Set by env.new-staging.js. The Netlify builds leave it unset — flip it on in
 * env.prod.js when production moves behind the Worker.
 */
export const isEdgeRoutingEnabled = (): boolean =>
  process.env.REACT_APP_EDGE_ROUTING === 'true';
