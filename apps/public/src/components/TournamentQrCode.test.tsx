import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TournamentQrCode } from './TournamentQrCode';

const labels = {
  openLabel: 'Compartilhar',
  closeLabel: 'Fechar',
  caption: 'Torneio Teste',
  scanLabel: 'Escaneie para acessar'
};

describe('TournamentQrCode', () => {
  it('keeps the code out of the way until asked for', () => {
    render(<TournamentQrCode path="/org/torneio" {...labels} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Compartilhar' })
    ).toBeInTheDocument();
  });

  it('shows the code for the tournament on this host', async () => {
    render(<TournamentQrCode path="/org/torneio" {...labels} />);

    await userEvent.click(screen.getByRole('button', { name: 'Compartilhar' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('Torneio Teste');
    // The value has to be the shareable address, not the locale-prefixed path
    // the app routes on internally.
    expect(screen.getByTestId('tournament-qr-code')).toHaveAttribute(
      'data-value',
      `${window.location.origin}/org/torneio`
    );
  });

  it('closes again', async () => {
    render(<TournamentQrCode path="/org/torneio" {...labels} />);

    await userEvent.click(screen.getByRole('button', { name: 'Compartilhar' }));
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
