import { render, screen } from '@testing-library/react';
import PhasePage from './page';
import * as apiClient from '@gochamps/api-client';

jest.mock('@gochamps/api-client');

interface Messages {
  [key: string]: string | Messages;
}

const messageAt = (dictionary: Messages, key: string): unknown =>
  key
    .split('.')
    .reduce<unknown>((node, part) => (node as Messages)[part], dictionary);

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (input: string | { namespace: string }) => {
    const namespace = typeof input === 'string' ? input : input.namespace;
    const messages: Record<string, Messages> = {
      phase: {
        noGames: 'Nenhum jogo nesta fase'
      },
      metadata: {
        phaseTitle: 'Fase: {phase}',
        phaseDescription: 'Acompanhe os jogos da fase {phase}'
      }
    };

    const dictionary = messages[namespace] || {};

    return Object.assign(
      (key: string, values?: Record<string, string>) =>
        Object.entries(values || {}).reduce(
          (message, [name, value]) => message.replace(`{${name}}`, value),
          messageAt(dictionary, key) as string
        ),
      { raw: (key: string) => messageAt(dictionary, key) }
    );
  }
}));

describe('PhasePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the phase name and games grouped by date', async () => {
    (apiClient.getPhase as jest.Mock).mockResolvedValue({
      id: 'ph1',
      title: 'Fase de Grupos',
      type: 'group',
      order: 1,
      isInProgress: false
    });
    (apiClient.getGamesByPhaseId as jest.Mock).mockResolvedValue([
      {
        id: 'g1',
        homeTeam: {
          id: 't1',
          name: 'Time A',
          logoUrl: '',
          triCode: '',
          primaryColor: '',
          coaches: []
        },
        awayTeam: {
          id: 't2',
          name: 'Time B',
          logoUrl: '',
          triCode: '',
          primaryColor: '',
          coaches: []
        },
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
      params: Promise.resolve({
        locale: 'pt',
        org: 'org',
        tournament: 'tour',
        phaseId: 'ph1'
      })
    });
    render(jsx);

    expect(screen.getByText('Fase de Grupos')).toBeInTheDocument();
    expect(screen.getByText('Time A')).toBeInTheDocument();
    expect(screen.getByText('Time B')).toBeInTheDocument();
  });
});
