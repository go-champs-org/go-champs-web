import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import RootPage from './page';
import messages from '../../messages/pt.json';

describe('RootPage', () => {
  it('renders the site name from messages', () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <RootPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByTestId('root-page')).toHaveTextContent('Go Champs');
  });
});
