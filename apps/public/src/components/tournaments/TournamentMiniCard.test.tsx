import { render, screen } from '@testing-library/react';
import { TournamentMiniCard } from './TournamentMiniCard';

describe('TournamentMiniCard', () => {
  it('keeps the pin out of the link, so the controls do not nest', () => {
    render(
      <TournamentMiniCard
        name="Liga Teste"
        organizationName="Org Teste"
        organizationLogoUrl=""
        href="#"
        isPinned={false}
        pinLabel="Fixar"
        onTogglePin={jest.fn()}
      />
    );

    expect(
      screen.getByRole('button', { name: 'Fixar' }).closest('a')
    ).toBeNull();
  });
});
