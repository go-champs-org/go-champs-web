export type ApiPhaseType = 'elimination' | 'draw';

export interface ApiDrawMatch {
  id: string;
  first_team_id: string | null;
  first_team_placeholder: string | null;
  first_team_score: string | null;
  second_team_id: string | null;
  second_team_placeholder: string | null;
  second_team_score: string | null;
  name: string | null;
  info: string | null;
}

export interface ApiDraw {
  id: string;
  order: number;
  title: string | null;
  matches: ApiDrawMatch[];
}

export type ApiRankingCriteria = 'overall' | 'head_to_head';

export interface ApiEliminationStat {
  id: string;
  title: string;
  team_stat_source: string;
  ranking_order: number;
  ranking_criteria: ApiRankingCriteria;
}

export interface ApiEliminationTeamStat {
  id: string;
  team_id: string;
  placeholder: string | null;
  // Keyed by ApiEliminationStat.id. The API sends numbers, not the strings
  // the CMS's own (looser) type declares.
  stats: Record<string, number>;
  ranking_criteria_used: ApiRankingCriteria | null;
  ranking_stat_used: string | null;
}

export interface ApiElimination {
  id: string;
  order: number;
  title: string | null;
  info: string | null;
  team_stats: ApiEliminationTeamStat[];
}

export interface ApiPhase {
  id: string;
  title: string;
  type: ApiPhaseType;
  order: number;
  is_in_progress: boolean;
  draws?: ApiDraw[];
  elimination_stats?: ApiEliminationStat[];
  eliminations?: ApiElimination[];
}

export interface ApiPhaseResponse {
  data: ApiPhase;
}
