import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { TournamentStatsTable } from './TournamentStatsTable';

const players = [
  { id: 'p1', name: 'Ana', shirtNumber: '4', teamId: 'team-a' },
  { id: 'p2', name: 'Bia', shirtNumber: '7', teamId: 'team-b' }
];

const teams = [
  { id: 'team-b', name: 'Bravo', triCode: 'BRA', logoUrl: '' },
  { id: 'team-a', name: 'Alfa', triCode: 'ALF', logoUrl: '' }
];

const row = (playerId: string, name: string, teamId: string, points: string) => ({
  playerId,
  name,
  shirtNumber: '',
  stats: { points },
  teamId,
  teamName: '',
  teamShortName: '',
  teamLogoUrl: ''
});

const renderTable = (overrides = {}) =>
  render(
    <TournamentStatsTable
      tournamentId="t1"
      players={players}
      teams={teams}
      rows={[row('p1', 'Ana', 'team-a', '10'), row('p2', 'Bia', 'team-b', '20')]}
      columnsByScope={{
        aggregate: [{ slug: 'points', label: 'PTS', description: 'Pontos' }]
      }}
      totalsByScope={{ aggregate: { points: '30' } }}
      scopes={['aggregate']}
      scopeLabels={{ aggregate: 'Totais' }}
      title="Estatísticas"
      scopeLegend="Estatísticas"
      glossaryLabel="Glossário"
      numberLabel="Pos."
      nameLabel="Nome"
      totalLabel="Total"
      sortLabel="Ordenar por {stat}"
      teamColumnLabel="Time"
      playerHrefBase="/org/t/athlete/"
      teamHrefBase="/org/t/team/"
      defaultSortSlugs={{ aggregate: 'points' }}
      phases={[
        { id: 'ph1', label: 'Fase 1' },
        { id: 'ph2', label: 'Fase 2' }
      ]}
      minStatFilters={[{ id: 'game_played', label: 'Jogos (mín.)' }]}
      filterLabels={{
        legend: 'Filtros',
        phase: 'Fase',
        allPhases: 'Todas as fases',
        team: 'Time',
        allTeams: 'Todos os times'
      }}
      noFilteredStatsLabel="Nenhum atleta atende a esses filtros."
      {...overrides}
    />
  );

const mockFetch = (statsLogs: unknown[]) => {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => statsLogs
  });
  global.fetch = fetchMock as unknown as typeof fetch;

  return fetchMock;
};

const requestedUrl = (fetchMock: jest.Mock): URL =>
  new URL(fetchMock.mock.calls[fetchMock.mock.calls.length - 1][0], 'http://localhost');

const playerNames = (): string[] =>
  screen.getAllByTestId('roster-player-name').map(cell => cell.textContent || '');

describe('TournamentStatsTable filters', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.useRealTimers();
  });

  it('lists every phase and team, teams by name, each with an "all" option', () => {
    mockFetch([]);
    renderTable();

    const phase = screen.getByLabelText('Fase');
    expect(within(phase).getAllByRole('option').map(option => option.textContent)).toEqual([
      'Todas as fases',
      'Fase 1',
      'Fase 2'
    ]);

    const team = screen.getByLabelText('Time');
    expect(within(team).getAllByRole('option').map(option => option.textContent)).toEqual([
      'Todos os times',
      'Alfa',
      'Bravo'
    ]);
  });

  it('leaves the phase filter out when the tournament has a single phase', () => {
    mockFetch([]);
    renderTable({ phases: [{ id: 'ph1', label: 'Fase 1' }] });

    expect(screen.queryByLabelText('Fase')).not.toBeInTheDocument();
  });

  it('asks again for the ranked column, narrowed to the picked phase and team', async () => {
    const fetchMock = mockFetch([{ id: 'log-p1', playerId: 'p1', stats: { points: '8' } }]);
    renderTable();

    fireEvent.change(screen.getByLabelText('Fase'), { target: { value: 'ph2' } });
    await waitFor(() => expect(playerNames()).toEqual(['Ana']));

    let url = requestedUrl(fetchMock);
    expect(url.searchParams.get('tournamentId')).toBe('t1');
    expect(url.searchParams.get('sort')).toBe('points');
    expect(url.searchParams.get('phaseId')).toBe('ph2');
    expect(url.searchParams.get('teamId')).toBeNull();

    fireEvent.change(screen.getByLabelText('Time'), { target: { value: 'team-a' } });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

    url = requestedUrl(fetchMock);
    expect(url.searchParams.get('phaseId')).toBe('ph2');
    expect(url.searchParams.get('teamId')).toBe('team-a');
  });

  it('adds up the rows on screen in the totals band', async () => {
    mockFetch([{ id: 'log-p1', playerId: 'p1', stats: { points: '8' } }]);
    renderTable();

    fireEvent.change(screen.getByLabelText('Time'), { target: { value: 'team-a' } });

    const totals = await screen.findByText('8', { selector: 'tfoot td' });
    expect(totals).toBeInTheDocument();
  });

  it('sends a stat minimum once the visitor stops typing', async () => {
    jest.useFakeTimers();
    const fetchMock = mockFetch([]);
    renderTable();

    fireEvent.change(screen.getByLabelText('Jogos (mín.)'), { target: { value: '3' } });
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(400);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(requestedUrl(fetchMock).searchParams.get('min[game_played]')).toBe('3');
  });

  it('says so when no player meets the filters', async () => {
    mockFetch([]);
    renderTable();

    fireEvent.change(screen.getByLabelText('Time'), { target: { value: 'team-b' } });

    expect(
      await screen.findByText('Nenhum atleta atende a esses filtros.')
    ).toBeInTheDocument();
  });

  it('keeps the rows on screen when the request fails', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: false });
    global.fetch = fetchMock as unknown as typeof fetch;
    renderTable();

    fireEvent.change(screen.getByLabelText('Time'), { target: { value: 'team-a' } });
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    expect(playerNames()).toEqual(['Bia', 'Ana']);
  });
});
