import { render, screen } from '@testing-library/react';
import { GameTeamRow } from './GameTeamRow';

describe('GameTeamRow', () => {
  it('announces the winner via a sr-only label when provided', () => {
    render(
      <GameTeamRow
        logoUrl="https://cdn.example.com/logo.png"
        name="Home Team"
        emphasis="winner"
        align="left"
        crestSize={28}
        winnerLabel="Winner"
      />
    );

    expect(screen.getByText('Winner')).toHaveClass('sr-only');
  });

  it('renders no crest when logoUrl is empty', () => {
    render(
      <GameTeamRow
        logoUrl=""
        name="Away Team"
        emphasis="neutral"
        align="right"
        crestSize={20}
      />
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('Away Team')).toBeInTheDocument();
  });
});
