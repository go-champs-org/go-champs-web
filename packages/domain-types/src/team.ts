export interface CoachEntity {
  id: string;
  name: string;
  type: string;
}

export interface TeamEntity {
  id: string;
  name: string;
  logoUrl: string;
  triCode: string;
  primaryColor: string;
  coaches: CoachEntity[];
}
