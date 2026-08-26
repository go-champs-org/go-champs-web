import { LIVE_SCORE_POLLING_INTERVAL_MS } from './liveScore';
import { subscribeScoreboard } from './liveGameStore';

const BASE = 'https://scoreboard.test';

const scoreboardResponse = (
  homeScore: number,
  awayScore: number,
  state = 'in_progress'
) => ({
  ok: true,
  json: async () => ({
    data: {
      home_team: {
        total_player_stats: { points: homeScore },
        players: []
      },
      away_team: {
        total_player_stats: { points: awayScore },
        players: []
      },
      live_state: { state }
    }
  })
});

const fetchMock = jest.fn();

// fetch resolves on the microtask queue, so a poll only reaches its listeners
// once the pending promises have been drained.
const settle = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

const advanceToNextPoll = async () => {
  jest.advanceTimersByTime(LIVE_SCORE_POLLING_INTERVAL_MS);
  await settle();
};

describe('liveGameStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('opens one poll to the scoreboard for the game', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    const listener = jest.fn();
    const unsubscribe = subscribeScoreboard(BASE, 'g1', listener);
    await settle();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://scoreboard.test/v1/games/g1',
      expect.objectContaining({ signal: expect.anything() })
    );
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
  });

  it('serves two subscribers of the same game from a single poll', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    const first = jest.fn();
    const second = jest.fn();
    const unsubscribeFirst = subscribeScoreboard(BASE, 'g2', first);
    const unsubscribeSecond = subscribeScoreboard(BASE, 'g2', second);
    await settle();

    // One request, both listeners fed from it — the whole point of the store.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    await advanceToNextPoll();

    expect(fetchMock).toHaveBeenCalledTimes(2);

    unsubscribeFirst();
    unsubscribeSecond();
  });

  it('hands a late subscriber the latest response at once', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    const unsubscribeFirst = subscribeScoreboard(BASE, 'g3', jest.fn());
    await settle();

    const late = jest.fn();
    const unsubscribeLate = subscribeScoreboard(BASE, 'g3', late);

    expect(late).toHaveBeenCalledTimes(1);

    unsubscribeFirst();
    unsubscribeLate();
  });

  it('keeps polling while a subscriber is still listening', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    const unsubscribe = subscribeScoreboard(BASE, 'g4', jest.fn());
    await settle();

    await advanceToNextPoll();
    await advanceToNextPoll();

    expect(fetchMock).toHaveBeenCalledTimes(3);

    unsubscribe();
  });

  it('aborts the request in flight and schedules nothing once the last subscriber leaves', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    const unsubscribe = subscribeScoreboard(BASE, 'g5', jest.fn());
    await settle();

    const signal = fetchMock.mock.calls[0][1].signal as AbortSignal;

    unsubscribe();

    expect(signal.aborted).toBe(true);

    await advanceToNextPoll();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('stops polling once the scoreboard reports the game ended', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(70, 65, 'ended'));

    const unsubscribe = subscribeScoreboard(BASE, 'g6', jest.fn());
    await settle();

    await advanceToNextPoll();
    await advanceToNextPoll();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    unsubscribe();
  });
});
