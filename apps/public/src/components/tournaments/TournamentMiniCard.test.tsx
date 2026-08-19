import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TournamentMiniCard } from './TournamentMiniCard';

describe('TournamentMiniCard', () => {
  it('links to the tournament and shows its organization', () => {
    render(
      <TournamentMiniCard
        name="Liga Teste"
        organizationName="Org Teste"
        organizationLogoUrl=""
        href="https://cms.example/org-teste/liga-teste"
      />
    );

    expect(screen.getByRole('link', { name: /Liga Teste/ })).toHaveAttribute(
      'href',
      'https://cms.example/org-teste/liga-teste'
    );
    expect(screen.getByText('Org Teste')).toBeInTheDocument();
  });

  it('falls back to the organization initials when it has no logo', () => {
    render(
      <TournamentMiniCard
        name="Liga Teste"
        organizationName="Org Teste"
        organizationLogoUrl=""
        href="#"
      />
    );

    expect(screen.getByText('OT')).toBeInTheDocument();
  });

  it('shows the organization logo when there is one', () => {
    render(
      <TournamentMiniCard
        name="Liga Teste"
        organizationName="Org Teste"
        organizationLogoUrl="https://example.com/logo.png"
        href="#"
      />
    );

    expect(screen.getByRole('img', { name: 'Org Teste' })).toHaveAttribute(
      'src',
      'https://example.com/logo.png'
    );
  });

  it('has no pin control unless one is wired up', () => {
    render(
      <TournamentMiniCard
        name="Liga Teste"
        organizationName="Org Teste"
        organizationLogoUrl=""
        href="#"
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

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

  it('toggles the pin', async () => {
    const user = userEvent.setup();
    const onTogglePin = jest.fn();

    render(
      <TournamentMiniCard
        name="Liga Teste"
        organizationName="Org Teste"
        organizationLogoUrl=""
        href="#"
        isPinned={false}
        pinLabel="Fixar"
        onTogglePin={onTogglePin}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Fixar' }));

    expect(onTogglePin).toHaveBeenCalledTimes(1);
  });
});
