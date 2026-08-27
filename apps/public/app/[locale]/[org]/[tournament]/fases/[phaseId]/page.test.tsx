import { render, screen } from '@testing-library/react';
import PhasePage from './page';
import * as apiClient from '@gochamps/api-client';

jest.mock('@gochamps/api-client');

describe('PhasePage', () => {
  it('renders the phase name and one row per game', async () => {
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph1',
      title: 'Fase de Grupos',
      tournamentId: 'tour1',
      type: 'group',
      order: 1,
      isInProgress: false
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([
      {
        id: 'g1',
        homeTeam: { id: 't1', name: 'Time A', logoUrl: '', triCode: '', primaryColor: '', coaches: [] },
        awayTeam: { id: 't2', name: 'Time B', logoUrl: '', triCode: '', primaryColor: '', coaches: [] },
        homeScore: 1,
        awayScore: 0,
        datetime: '2026-08-01T20:00:00Z',
        location: '',
        city: '',
        isFinished: true,
        awayPlaceholder: '',
        homePlaceholder: '',
        info: '',
        number: '1',
        phaseId: 'ph1',
        youTubeCode: '',
        liveState: '',
        resultType: ''
      }
    ]);

    const jsx = await PhasePage({
      params: Promise.resolve({ locale: 'pt', org: 'org', tournament: 'tour', phaseId: 'ph1' })
    });
    render(jsx);

    expect(screen.getByText('Fase de Grupos')).toBeInTheDocument();
    expect(screen.getByText('Time A')).toBeInTheDocument();
    expect(screen.getByText('Time B')).toBeInTheDocument();
  });
});
