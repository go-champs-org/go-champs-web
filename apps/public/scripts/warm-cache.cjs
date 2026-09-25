// Runs on the GitHub Actions runner after a deploy: the ISR cache is keyed by
// build id, so every deploy starts cold. Each URL is its own Worker invocation,
// so a render killed for CPU is simply retried.
const WARM_LIMIT = 50;
const CONCURRENCY = 2;

const homeUrls = baseUrl => [`${baseUrl}/`, `${baseUrl}/en`];

const viewUrls = (baseUrl, view) => [
  `${baseUrl}/${view.tournament.organization.slug}`,
  `${baseUrl}/${view.tournament.organization.slug}/${view.tournament.slug}`
];

const warmCacheUrls = (baseUrl, recentlyViews, limit) =>
  [...new Set([...homeUrls(baseUrl), ...recentlyViews.flatMap(view => viewUrls(baseUrl, view))])]
    .slice(0, limit);

const loadRecentlyViews = async apiHost => {
  try {
    const response = await fetch(new URL('v1/recently-view', apiHost));
    return response.ok ? (await response.json()).data : [];
  } catch {
    return [];
  }
};

const hit = async url => {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'gochamps-cache-warmer' } });
    await response.arrayBuffer();
    return response.status;
  } catch {
    return 0;
  }
};

const warm = async url => {
  const first = await hit(url);
  const status = first === 200 ? first : await hit(url);
  console.log(`${status} ${url}`);
};

const chunks = (items, size) =>
  items.reduce(
    (groups, item, index) =>
      index % size === 0 ? [...groups, [item]] : [...groups.slice(0, -1), [...groups[groups.length - 1], item]],
    []
  );

const main = async () => {
  const baseUrl = process.env.BASE_URL.replace(/\/$/, '');
  const urls = warmCacheUrls(baseUrl, await loadRecentlyViews(process.env.API_HOST), WARM_LIMIT);

  await chunks(urls, CONCURRENCY).reduce(
    (previous, group) => previous.then(() => Promise.all(group.map(warm))),
    Promise.resolve()
  );
};

if (require.main === module) {
  // Never fail the deploy over a cold page: the next visitor renders it anyway.
  main().catch(error => console.error(error));
}

module.exports = { warmCacheUrls, WARM_LIMIT };
