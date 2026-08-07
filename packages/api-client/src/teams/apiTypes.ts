export interface ApiCoach {
  id: string;
  name: string;
  type: string;
}

export interface ApiTeam {
  id: string;
  name: string;
  coaches?: ApiCoach[];
  logo_url?: string;
  tri_code?: string;
  primary_color: string | null;
}
