export interface ApiPlayerStatistic {
  slug: string;
  name: string;
  level: string;
  scope: string;
  value_type: string;
}

export interface ApiSport {
  slug: string;
  name: string;
  player_statistics: ApiPlayerStatistic[];
}

export interface ApiSportResponse {
  data: ApiSport;
}
