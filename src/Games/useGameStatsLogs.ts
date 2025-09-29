import { useCallback, useEffect, useRef, useState } from 'react';
import { GameEntity } from './state';
import { PlayerStatsLogEntity } from '../PlayerStatsLog/state';
import { TeamStatsLogEntity } from '../TeamStatsLog/state';
import { StatsLogRenderEntity } from '../PlayerStatsLog/View';
import playerStatsLogHttpClient from '../PlayerStatsLog/playerStatsLogHttpClient';
import teamStatsLogHttpClient from '../TeamStatsLog/teamStatsLogHttpClient';
import scoreboardApiHttpClient from '../Shared/httpClient/scoreboardApiHttpClient';

const POLLING_INTERVAL = 10000; // 10 seconds

export type FetchingStrategy = 'static' | 'polling';

export interface GameStatsData {
  awayPlayerStatsLogs: StatsLogRenderEntity[];
  awayTeamStatsLog: StatsLogRenderEntity | null;
  homePlayerStatsLogs: StatsLogRenderEntity[];
  homeTeamStatsLog: StatsLogRenderEntity | null;
  fetchingStrategy: FetchingStrategy;
  isLoading: boolean;
  error: string | null;
}

const mapApiPlayerToStatsLogRenderEntity = (
  apiPlayer: any,
  teamId: string
): StatsLogRenderEntity => ({
  id: apiPlayer.id,
  playerId: apiPlayer.id,
  teamId,
  stats: apiPlayer.stats_values || {}
});

const mapApiTeamToStatsLogRenderEntity = (
  apiTeam: any,
  teamId: string
): StatsLogRenderEntity => ({
  id: teamId,
  teamId,
  stats: apiTeam.total_player_stats || {}
});

const mapPlayerStatsLogToRenderEntity = (
  playerStatsLog: PlayerStatsLogEntity
): StatsLogRenderEntity => ({
  id: playerStatsLog.id,
  playerId: playerStatsLog.playerId,
  teamId: playerStatsLog.teamId,
  stats: playerStatsLog.stats || {}
});

const mapTeamStatsLogToRenderEntity = (
  teamStatsLog: TeamStatsLogEntity
): StatsLogRenderEntity => ({
  id: teamStatsLog.id,
  teamId: teamStatsLog.teamId,
  stats: teamStatsLog.stats || {}
});

export const useGameStatsLogs = (game: GameEntity): GameStatsData => {
  const [gameStatsData, setGameStatsData] = useState<GameStatsData>({
    awayPlayerStatsLogs: [],
    awayTeamStatsLog: null,
    homePlayerStatsLogs: [],
    homeTeamStatsLog: null,
    fetchingStrategy: game.liveState === 'in_progress' ? 'polling' : 'static',
    isLoading: !game.id ? false : true, // Don't show loading if no game ID
    error: null
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameIdRef = useRef<string>(game.id);

  const fetchStaticData = useCallback(async () => {
    // Don't fetch if game.id is not available
    if (!game.id) {
      return;
    }

    try {
      setGameStatsData(prev => ({ ...prev, isLoading: true, error: null }));

      // Fetch player stats logs for both teams
      const [playerStatsLogs, teamStatsLogs] = await Promise.all([
        playerStatsLogHttpClient.getByFilter({ game_id: game.id }),
        teamStatsLogHttpClient.getByFilter({ game_id: game.id })
      ]);

      // Separate player stats by team
      const awayPlayerStatsLogs = playerStatsLogs
        .filter(log => log.teamId === game.awayTeam.id)
        .map(mapPlayerStatsLogToRenderEntity);

      const homePlayerStatsLogs = playerStatsLogs
        .filter(log => log.teamId === game.homeTeam.id)
        .map(mapPlayerStatsLogToRenderEntity);

      // Get team stats logs
      const awayTeamStatsLog = teamStatsLogs.find(
        log => log.teamId === game.awayTeam.id
      );
      const homeTeamStatsLog = teamStatsLogs.find(
        log => log.teamId === game.homeTeam.id
      );

      setGameStatsData(prev => ({
        ...prev,
        awayPlayerStatsLogs,
        homePlayerStatsLogs,
        awayTeamStatsLog: awayTeamStatsLog
          ? mapTeamStatsLogToRenderEntity(awayTeamStatsLog)
          : null,
        homeTeamStatsLog: homeTeamStatsLog
          ? mapTeamStatsLogToRenderEntity(homeTeamStatsLog)
          : null,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      setGameStatsData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stats'
      }));
    }
  }, [game.id, game.awayTeam.id, game.homeTeam.id]);

  const fetchPollingData = useCallback(async () => {
    // Don't fetch if game.id is not available
    if (!game.id) {
      return;
    }

    try {
      setGameStatsData(prev => ({ ...prev, error: null }));

      const gameData = await scoreboardApiHttpClient.getGame(game.id);

      // Map API data to render entities
      const awayPlayerStatsLogs = gameData.away_team.players.map(
        (player: any) =>
          mapApiPlayerToStatsLogRenderEntity(player, game.awayTeam.id)
      );

      const homePlayerStatsLogs = gameData.home_team.players.map(
        (player: any) =>
          mapApiPlayerToStatsLogRenderEntity(player, game.homeTeam.id)
      );

      const awayTeamStatsLog = mapApiTeamToStatsLogRenderEntity(
        gameData.away_team,
        game.awayTeam.id
      );

      const homeTeamStatsLog = mapApiTeamToStatsLogRenderEntity(
        gameData.home_team,
        game.homeTeam.id
      );

      setGameStatsData(prev => ({
        ...prev,
        awayPlayerStatsLogs,
        homePlayerStatsLogs,
        awayTeamStatsLog,
        homeTeamStatsLog,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      setGameStatsData(prev => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch live stats'
      }));
    }
  }, [game.id, game.awayTeam.id, game.homeTeam.id]);

  // Update fetching strategy when game live state changes
  useEffect(() => {
    // Don't proceed if game.id is not available
    if (!game.id) {
      return;
    }

    const newStrategy: FetchingStrategy =
      game.liveState === 'in_progress' ? 'polling' : 'static';

    setGameStatsData(prev => ({
      ...prev,
      fetchingStrategy: newStrategy
    }));

    // Clear existing interval when strategy changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (newStrategy === 'polling') {
      // Start polling
      fetchPollingData();
      intervalRef.current = setInterval(fetchPollingData, POLLING_INTERVAL);
    } else {
      // Fetch static data
      fetchStaticData();
    }
  }, [game.id, game.liveState, fetchPollingData, fetchStaticData]);

  // Handle game ID changes
  useEffect(() => {
    // Don't proceed if game.id is not available
    if (!game.id) {
      return;
    }

    if (gameIdRef.current !== game.id) {
      gameIdRef.current = game.id;

      // Clear existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Reset state and fetch new data
      setGameStatsData(prev => ({
        ...prev,
        awayPlayerStatsLogs: [],
        awayTeamStatsLog: null,
        homePlayerStatsLogs: [],
        homeTeamStatsLog: null,
        isLoading: true,
        error: null
      }));

      const strategy = game.liveState === 'in_progress' ? 'polling' : 'static';
      if (strategy === 'polling') {
        fetchPollingData();
        intervalRef.current = setInterval(fetchPollingData, POLLING_INTERVAL);
      } else {
        fetchStaticData();
      }
    }
  }, [game.id, game.liveState, fetchPollingData, fetchStaticData]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return gameStatsData;
};
