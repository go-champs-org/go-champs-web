import React, { useState } from 'react';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import './TournamentHomeV2.scss';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_TOURNAMENT = {
  name: 'Spring Championship 2024',
  organization: { name: 'Go Champs League' }
};

const MOCK_TOP_STATS = [
  {
    category: 'Points',
    players: [
      { rank: 1, name: 'Marcus Johnson', team: 'Thunder Hawks', value: 28.4 },
      { rank: 2, name: 'Diego Reyes', team: 'River Wolves', value: 25.1 },
      { rank: 3, name: 'Tyler Brooks', team: 'Iron Eagles', value: 22.7 }
    ]
  },
  {
    category: 'Rebounds',
    players: [
      { rank: 1, name: 'Andre Silva', team: 'Iron Eagles', value: 12.3 },
      { rank: 2, name: 'Carlos Mendez', team: 'Thunder Hawks', value: 10.8 },
      { rank: 3, name: 'Jason Park', team: 'Blue Sharks', value: 9.5 }
    ]
  },
  {
    category: 'Assists',
    players: [
      { rank: 1, name: 'Leo Martinez', team: 'Blue Sharks', value: 9.2 },
      { rank: 2, name: 'Omar Hassan', team: 'River Wolves', value: 8.0 },
      { rank: 3, name: 'Tyler Brooks', team: 'Iron Eagles', value: 7.4 }
    ]
  }
];

const MOCK_STANDINGS_GROUPS = [
  {
    name: 'Group A',
    teams: [
      {
        rank: 1,
        name: 'Thunder Hawks',
        wins: 5,
        losses: 1,
        draws: 0,
        points: 15
      },
      {
        rank: 2,
        name: 'River Wolves',
        wins: 4,
        losses: 1,
        draws: 1,
        points: 13
      },
      { rank: 3, name: 'Iron Eagles', wins: 2, losses: 3, draws: 1, points: 7 },
      { rank: 4, name: 'Blue Sharks', wins: 0, losses: 5, draws: 1, points: 1 }
    ]
  },
  {
    name: 'Group B',
    teams: [
      {
        rank: 1,
        name: 'Storm Kings',
        wins: 6,
        losses: 0,
        draws: 0,
        points: 18
      },
      {
        rank: 2,
        name: 'Golden Lions',
        wins: 3,
        losses: 2,
        draws: 1,
        points: 10
      },
      {
        rank: 3,
        name: 'Red Panthers',
        wins: 2,
        losses: 3,
        draws: 1,
        points: 7
      },
      { rank: 4, name: 'Black Bears', wins: 0, losses: 6, draws: 0, points: 0 }
    ]
  }
];

interface MockGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  isFinished: boolean;
  isLive?: boolean;
}

const MOCK_GAMES: MockGame[] = [
  {
    id: '1',
    homeTeam: 'Thunder Hawks',
    awayTeam: 'River Wolves',
    homeScore: 98,
    awayScore: 87,
    isFinished: true
  },
  {
    id: '2',
    homeTeam: 'Iron Eagles',
    awayTeam: 'Blue Sharks',
    homeScore: 76,
    awayScore: 65,
    isFinished: true
  },
  {
    id: '3',
    homeTeam: 'Storm Kings',
    awayTeam: 'Golden Lions',
    homeScore: 110,
    awayScore: 95,
    isFinished: true
  },
  {
    id: '4',
    homeTeam: 'Thunder Hawks',
    awayTeam: 'Iron Eagles',
    homeScore: 54,
    awayScore: 51,
    isFinished: false,
    isLive: true
  },
  {
    id: '5',
    homeTeam: 'Storm Kings',
    awayTeam: 'Red Panthers',
    homeScore: null,
    awayScore: null,
    isFinished: false
  }
];

const MOCK_BRACKET = [
  {
    round: 'Quarter-Finals',
    matches: [
      {
        id: 'qf1',
        home: 'Thunder Hawks',
        away: 'Red Panthers',
        homeScore: 102,
        awayScore: 88,
        isFinished: true,
        isLive: false
      },
      {
        id: 'qf2',
        home: 'Storm Kings',
        away: 'Iron Eagles',
        homeScore: 95,
        awayScore: 80,
        isFinished: true,
        isLive: false
      },
      {
        id: 'qf3',
        home: 'River Wolves',
        away: 'Black Bears',
        homeScore: 88,
        awayScore: 70,
        isFinished: true,
        isLive: false
      },
      {
        id: 'qf4',
        home: 'Golden Lions',
        away: 'Blue Sharks',
        homeScore: 42,
        awayScore: 39,
        isFinished: false,
        isLive: true
      }
    ]
  },
  {
    round: 'Semi-Finals',
    matches: [
      {
        id: 'sf1',
        home: 'Thunder Hawks',
        away: 'Storm Kings',
        homeScore: null,
        awayScore: null,
        isFinished: false,
        isLive: false
      },
      {
        id: 'sf2',
        home: 'River Wolves',
        away: 'TBD',
        homeScore: null,
        awayScore: null,
        isFinished: false,
        isLive: false
      }
    ]
  }
];

// ─── Sub-components ───────────────────────────────────────────────────────────

// Deterministic team color from name — cycles through accent palette
const TEAM_COLORS = [
  '#a6cd63',
  '#f4d35e',
  '#7a9949',
  '#509187',
  '#4a4a4a',
  '#2c2c2c'
];
function teamColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return TEAM_COLORS[Math.abs(hash) % TEAM_COLORS.length];
}
function teamInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

const TeamLogo: React.FC<{ name: string; size?: 'sm' | 'md' }> = ({
  name,
  size = 'md'
}) => (
  <div
    className={`th-v2-team-logo th-v2-team-logo--${size}`}
    style={{ backgroundColor: teamColor(name) }}
    aria-hidden="true"
  >
    <span>{teamInitials(name)}</span>
  </div>
);

const TournamentAvatar: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
  return (
    <div className="th-v2-avatar" aria-hidden="true">
      <span>{initials}</span>
    </div>
  );
};

const GamesList: React.FC<{ games: MockGame[] }> = ({ games }) => (
  <div className="th-v2-games-list">
    <h3 className="th-v2-section-title">Games</h3>
    <div className="th-v2-games-stack">
      {games.map(game => (
        <div
          key={game.id}
          className={`th-v2-game-card${game.isLive ? ' is-live' : ''}${
            game.isFinished ? ' is-finished' : ''
          }`}
        >
          {game.isLive && (
            <div className="th-v2-live-badge">
              <span className="th-v2-live-dot" aria-hidden="true" />
              <span>LIVE</span>
            </div>
          )}
          <div className="th-v2-game-team-row">
            <TeamLogo name={game.homeTeam} size="sm" />
            <span className="th-v2-game-team-name">{game.homeTeam}</span>
            <span
              className={`th-v2-game-score-num${
                game.homeScore !== null &&
                game.awayScore !== null &&
                game.homeScore > game.awayScore
                  ? ' is-winner'
                  : ''
              }`}
            >
              {game.homeScore !== null ? game.homeScore : '–'}
            </span>
          </div>
          <div className="th-v2-game-team-row">
            <TeamLogo name={game.awayTeam} size="sm" />
            <span className="th-v2-game-team-name">{game.awayTeam}</span>
            <span
              className={`th-v2-game-score-num${
                game.awayScore !== null &&
                game.homeScore !== null &&
                game.awayScore > game.homeScore
                  ? ' is-winner'
                  : ''
              }`}
            >
              {game.awayScore !== null ? game.awayScore : '–'}
            </span>
          </div>
          {!game.isFinished && !game.isLive && (
            <div className="th-v2-game-upcoming-label">Upcoming</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const StandingsView: React.FC = () => (
  <div className="th-v2-main-grid">
    <div className="th-v2-standings-col">
      {MOCK_STANDINGS_GROUPS.map(group => (
        <div key={group.name} className="th-v2-standings-group">
          <h3 className="th-v2-section-title">{group.name}</h3>
          <div className="th-v2-table-wrapper">
            <table className="th-v2-table">
              <thead>
                <tr>
                  <th className="th-v2-th-rank">#</th>
                  <th className="th-v2-th-team">Team</th>
                  <th>W</th>
                  <th>L</th>
                  <th>D</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {group.teams.map(team => (
                  <tr
                    key={team.name}
                    className={team.rank === 1 ? 'is-top' : ''}
                  >
                    <td className="th-v2-td-rank">{team.rank}</td>
                    <td className="th-v2-td-team">{team.name}</td>
                    <td>{team.wins}</td>
                    <td>{team.losses}</td>
                    <td>{team.draws}</td>
                    <td className="th-v2-td-pts">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
    <div className="th-v2-games-col">
      <GamesList games={MOCK_GAMES} />
    </div>
  </div>
);

const PlayoffsView: React.FC = () => {
  const playoffGames: MockGame[] = MOCK_BRACKET.flatMap(r =>
    r.matches.map(m => ({
      id: m.id,
      homeTeam: m.home,
      awayTeam: m.away,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      isFinished: m.isFinished,
      isLive: m.isLive
    }))
  );

  return (
    <div className="th-v2-main-grid">
      <div className="th-v2-standings-col">
        {MOCK_BRACKET.map(round => (
          <div key={round.round} className="th-v2-bracket-round">
            <h3 className="th-v2-section-title">{round.round}</h3>
            <div className="th-v2-bracket-matches">
              {round.matches.map(match => (
                <div
                  key={match.id}
                  className={`th-v2-bracket-match${
                    match.isFinished ? ' is-finished' : ''
                  }`}
                >
                  <div className="th-v2-bracket-team">
                    <span className="th-v2-bracket-team-name">
                      {match.home}
                    </span>
                    {match.isFinished && (
                      <span className="th-v2-bracket-score">
                        {match.homeScore}
                      </span>
                    )}
                  </div>
                  <div className="th-v2-bracket-team">
                    <span className="th-v2-bracket-team-name">
                      {match.away}
                    </span>
                    {match.isFinished && (
                      <span className="th-v2-bracket-score">
                        {match.awayScore}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="th-v2-games-col">
        <GamesList games={playoffGames} />
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

type PhaseView = 'standings' | 'playoffs';

function TournamentHomeV2() {
  const [activePhase, setActivePhase] = useState<PhaseView>('standings');
  const [expandedStat, setExpandedStat] = useState<string | null>(null);

  const toggleStat = (category: string) => {
    setExpandedStat(prev => (prev === category ? null : category));
  };

  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          <div className="th-v2-wrapper">
            {/* Tournament Header */}
            <div className="th-v2-header">
              <TournamentAvatar name={MOCK_TOURNAMENT.name} />
              <div className="th-v2-header-info">
                <h1 className="th-v2-tournament-name">
                  {MOCK_TOURNAMENT.name}
                </h1>
                <span className="th-v2-org-name">
                  {MOCK_TOURNAMENT.organization.name}
                </span>
              </div>
            </div>

            {/* Top Player Stats — Desktop */}
            <div className="th-v2-stats-grid th-v2-desktop-only">
              {MOCK_TOP_STATS.map(stat => (
                <div key={stat.category} className="th-v2-stat-card">
                  <div className="th-v2-stat-card-header">
                    <h3 className="th-v2-stat-category">{stat.category}</h3>
                    <button className="th-v2-all-stats-btn">All Stats</button>
                  </div>
                  {stat.players.map(player => (
                    <div key={player.rank} className="th-v2-stat-row">
                      <span className={`th-v2-rank-badge rank-${player.rank}`}>
                        {player.rank}
                      </span>
                      <div className="th-v2-stat-player">
                        <span className="th-v2-stat-player-name">
                          {player.name}
                        </span>
                        <span className="th-v2-stat-player-team">
                          {player.team}
                        </span>
                      </div>
                      <span className="th-v2-stat-value">{player.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Top Player Stats — Mobile accordion */}
            <div className="th-v2-stats-accordion th-v2-mobile-only">
              {MOCK_TOP_STATS.map(stat => {
                const isOpen = expandedStat === stat.category;
                return (
                  <div
                    key={stat.category}
                    className={`th-v2-accordion-item${
                      isOpen ? ' is-open' : ''
                    }`}
                  >
                    <button
                      className="th-v2-accordion-header"
                      onClick={() => toggleStat(stat.category)}
                      aria-expanded={isOpen}
                    >
                      <span className="th-v2-accordion-title">
                        {stat.category}
                      </span>
                      <span className="th-v2-accordion-leader">
                        {stat.players[0].name} · {stat.players[0].value}
                      </span>
                      <span
                        className="th-v2-accordion-chevron"
                        aria-hidden="true"
                      >
                        <i
                          className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}
                        />
                      </span>
                    </button>
                    <div className="th-v2-accordion-all-stats">
                      <button className="th-v2-all-stats-btn">All Stats</button>
                    </div>
                    <div className="th-v2-accordion-body" aria-hidden={!isOpen}>
                      {stat.players.map(player => (
                        <div key={player.rank} className="th-v2-stat-row">
                          <span
                            className={`th-v2-rank-badge rank-${player.rank}`}
                          >
                            {player.rank}
                          </span>
                          <div className="th-v2-stat-player">
                            <span className="th-v2-stat-player-name">
                              {player.name}
                            </span>
                            <span className="th-v2-stat-player-team">
                              {player.team}
                            </span>
                          </div>
                          <span className="th-v2-stat-value">
                            {player.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Phase Selector */}
            <div className="th-v2-phase-selector" role="tablist">
              <button
                role="tab"
                aria-selected={activePhase === 'standings'}
                className={`th-v2-phase-tab${
                  activePhase === 'standings' ? ' is-active' : ''
                }`}
                onClick={() => setActivePhase('standings')}
              >
                Standings
              </button>
              <button
                role="tab"
                aria-selected={activePhase === 'playoffs'}
                className={`th-v2-phase-tab${
                  activePhase === 'playoffs' ? ' is-active' : ''
                }`}
                onClick={() => setActivePhase('playoffs')}
              >
                Playoffs
              </button>
            </div>

            {/* Main Content */}
            <div className="th-v2-content">
              {activePhase === 'standings' ? (
                <StandingsView />
              ) : (
                <PlayoffsView />
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default TournamentHomeV2;
