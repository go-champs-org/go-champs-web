export interface ApiStatLeader {
  player_id: string;
  team_id: string | null;
  value: number;
  player: {
    name: string;
    shirt_number: string | null;
    photo_url: string | null;
  };
}

export interface ApiStatLeaders {
  stat_key: string;
  qualifier: Record<string, number> | null;
  leaders: ApiStatLeader[];
}

export interface ApiStatLeadersResponse {
  data: ApiStatLeaders[];
}
