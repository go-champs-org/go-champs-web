import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import ContactPage from './page';
import messages from '../../../messages/pt.json';

describe('ContactPage', () => {
  it('renders the contact heading', () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        <ContactPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
