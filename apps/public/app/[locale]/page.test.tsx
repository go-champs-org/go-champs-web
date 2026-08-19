import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import RootPage from './page';
import messages from '../../messages/pt.json';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

describe('RootPage', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => []
    }) as unknown as typeof fetch;
  });

  it('renders the search island beside the organizations sidebar', async () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await RootPage({ params: Promise.resolve({ locale: 'pt' }) })}
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('root-page')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Campeonatos em andamento' })
    ).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: 'Organizações' })
    ).toBeInTheDocument();
  });
});
