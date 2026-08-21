import { act, renderHook } from '@testing-library/react';
import { LIVE_SCORE_POLLING_INTERVAL_MS } from '../games/liveScore';
import { useLiveScore } from './useLiveScore';

const scoreboardResponse = (
  homeScore: number,
  awayScore: number,
  state = 'in_progress'
) => ({
  ok: true,
  json: async () => ({
    data: {
      home_team: { total_player_stats: { points: homeScore } },
      away_team: { total_player_stats: { points: awayScore } },
      live_state: { state }
    }
  })
});

const fetchMock = jest.fn();

const renderLiveScore = (overrides = {}) =>
  renderHook(() =>
    useLiveScore({
      gameId: 'g1',
      scoreboardUrl: 'https://scoreboard.test',
      isLive: true,
      initialScore: { homeScore: 10, awayScore: 8 },
      ...overrides
    })
  );

// fetch resolves on the microtask queue, so a poll only reaches setScore once
// the pending promises have been drained inside act.
const settle = async () => {
  await act(async () => {});
};

// The polls chain through setTimeout: each tick fires the next request and then
// has to settle before the one after it is scheduled.
const advanceToNextPoll = async () => {
  await act(async () => {
    jest.advanceTimersByTime(LIVE_SCORE_POLLING_INTERVAL_MS);
  });
};

describe('useLiveScore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts from the score the page was rendered with', () => {
    fetchMock.mockResolvedValue(scoreboardResponse(10, 8));

    const { result } = renderLiveScore();

    expect(result.current).toEqual({ homeScore: 10, awayScore: 8 });

    return settle();
  });

  it('asks the scoreboard as soon as it mounts', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    const { result } = renderLiveScore();
    await settle();

    expect(result.current).toEqual({ homeScore: 12, awayScore: 8 });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://scoreboard.test/v1/games/g1',
      expect.objectContaining({ signal: expect.anything() })
    );
  });

  it('keeps the score up to date while the game runs', async () => {
    fetchMock
      .mockResolvedValueOnce(scoreboardResponse(12, 8))
      .mockResolvedValueOnce(scoreboardResponse(15, 8));

    const { result } = renderLiveScore();
    await settle();

    expect(result.current.homeScore).toBe(12);

    await advanceToNextPoll();

    expect(result.current.homeScore).toBe(15);
  });

  it('does not poll a game that is not live', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    const { result } = renderLiveScore({ isLive: false });
    await settle();

    await advanceToNextPoll();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current).toEqual({ homeScore: 10, awayScore: 8 });
  });

  it('does not poll without a scoreboard host configured', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    renderLiveScore({ scoreboardUrl: '' });
    await settle();

    await advanceToNextPoll();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('stops polling once the scoreboard reports the game ended', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(70, 65, 'ended'));

    const { result } = renderLiveScore();
    await settle();

    expect(result.current.homeScore).toBe(70);

    await advanceToNextPoll();
    await advanceToNextPoll();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('keeps the last known score when the scoreboard fails', async () => {
    fetchMock
      .mockResolvedValueOnce(scoreboardResponse(12, 8))
      .mockRejectedValueOnce(new Error('scoreboard is down'));

    const { result } = renderLiveScore();
    await settle();

    expect(result.current.homeScore).toBe(12);

    await advanceToNextPoll();

    expect(result.current).toEqual({ homeScore: 12, awayScore: 8 });
  });

  it('keeps polling after a failed response', async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce(scoreboardResponse(12, 8));

    const { result } = renderLiveScore();
    await settle();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    await advanceToNextPoll();

    expect(result.current.homeScore).toBe(12);
  });

  it('aborts the request in flight and schedules nothing on unmount', async () => {
    fetchMock.mockResolvedValue(scoreboardResponse(12, 8));

    const { unmount } = renderLiveScore();
    await settle();

    const signal = fetchMock.mock.calls[0][1].signal as AbortSignal;

    unmount();

    expect(signal.aborted).toBe(true);

    await advanceToNextPoll();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
