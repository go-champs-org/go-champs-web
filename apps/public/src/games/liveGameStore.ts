import {
  LIVE_SCORE_POLLING_INTERVAL_MS,
  scoreboardGameEnded,
  scoreboardGameUrl,
  type ScoreboardApiGameResponse
} from './liveScore';

// One live game, one poll — however many islands read from it. The score card
// and the box score both live off the scoreboard's `/v1/games/:id`; without a
// shared feed each opens its own 10s poll to the identical URL and doubles the
// requests a viewer makes (client-swr-dedup, Vercel React best practices).
//
// Module state is per tab and only ever touched by client islands, so this is
// a browser cache, not shared server state.
type FeedListener = (response: ScoreboardApiGameResponse) => void;

interface ScoreboardFeed {
  listeners: Set<FeedListener>;
  controller: AbortController;
  timeout?: ReturnType<typeof setTimeout>;
  running: boolean;
  latest: ScoreboardApiGameResponse | null;
}

const FEEDS = new Map<string, ScoreboardFeed>();

// A scoreboard that is down leaves every subscriber on its last known value —
// it is never a reason to break the game page (src/hooks/useLiveScore.ts).
const fetchScoreboard = async (
  url: string,
  signal: AbortSignal
): Promise<ScoreboardApiGameResponse | null> => {
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) return null;

    return (await response.json()) as ScoreboardApiGameResponse;
  } catch {
    return null;
  }
};

// Fan a response out to every listener and report whether the poll carries on:
// a response the scoreboard could not answer is worth asking again, one that
// reported the end is not.
const deliver = (
  feed: ScoreboardFeed,
  response: ScoreboardApiGameResponse | null
): boolean => {
  if (!response) return true;

  feed.latest = response;
  feed.listeners.forEach(listener => listener(response));

  return !scoreboardGameEnded(response);
};

// One request in flight at a time, on the same 10s cadence the CMS polls: with
// a plain interval a slow response can land after a newer one.
const runFeed = (url: string, feed: ScoreboardFeed): void => {
  const step = async () => {
    const response = await fetchScoreboard(url, feed.controller.signal);

    if (feed.running && deliver(feed, response)) {
      feed.timeout = setTimeout(step, LIVE_SCORE_POLLING_INTERVAL_MS);
    }
  };

  step();
};

const createFeed = (url: string): ScoreboardFeed => {
  const feed: ScoreboardFeed = {
    listeners: new Set(),
    controller: new AbortController(),
    running: true,
    latest: null
  };

  runFeed(url, feed);

  return feed;
};

const stopFeed = (url: string, feed: ScoreboardFeed): void => {
  feed.running = false;
  feed.controller.abort();
  clearTimeout(feed.timeout);
  FEEDS.delete(url);
};

// Subscribe to the live feed for a game, starting the single poll loop on the
// first subscriber and stopping it when the last one leaves. A subscriber that
// arrives mid-game is handed the latest response at once instead of waiting a
// full cycle for the first update.
export const subscribeScoreboard = (
  scoreboardUrl: string,
  gameId: string,
  listener: FeedListener
): (() => void) => {
  const url = scoreboardGameUrl(scoreboardUrl, gameId);
  const feed = FEEDS.get(url) || createFeed(url);
  FEEDS.set(url, feed);
  feed.listeners.add(listener);

  if (feed.latest) listener(feed.latest);

  return () => {
    feed.listeners.delete(listener);
    if (feed.listeners.size === 0) stopFeed(url, feed);
  };
};
