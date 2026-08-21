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
  // A sport with no catalogue of statistics is a valid response, and the CMS
  // contract declares it optional too.
  player_statistics?: ApiPlayerStatistic[];
}

export interface ApiSportResponse {
  data: ApiSport;
}
