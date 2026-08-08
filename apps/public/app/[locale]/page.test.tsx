import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import RootPage from './page';
import messages from '../../messages/pt.json';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (namespace: string) => {
    const dict = (
      require('../../messages/pt.json') as Record<string, Record<string, string>>
    )[namespace];
    return (key: string) => dict[key];
  }
}));

describe('RootPage', () => {
  it('renders the site name from messages', async () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await RootPage({ params: Promise.resolve({ locale: 'pt' }) })}
      </NextIntlClientProvider>
    );
    expect(screen.getByTestId('root-page')).toHaveTextContent('Go Champs');
  });
});
