export interface ApiPlayer {
  id: string;
  name: string;
  shirt_name?: string | null;
  shirt_number?: string | null;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  username?: string;
  team_id?: string;
  state?: string;
  photo_url?: string;
  license_number?: string;
}

export interface ApiPlayerResponse {
  data: ApiPlayer;
}
