export interface CustomFieldEntity {
  id: string;
  label: string;
  type: string;
}

export interface RegistrationEntity {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: 'team_athlete';
  approvalType: 'automatic' | 'manual';
  customFields: CustomFieldEntity[];
}

export const MOCK_REGISTRATIONS: RegistrationEntity[] = [
  {
    id: '1',
    name: 'Inscrição de atletas geral',
    startDate: '2020-01-01',
    endDate: '2020-01-01',
    type: 'team_athlete',
    approvalType: 'automatic',
    customFields: []
  }
];
