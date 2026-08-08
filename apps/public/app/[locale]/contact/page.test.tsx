import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import ContactPage from './page';
import messages from '../../../messages/pt.json';

jest.mock('@emailjs/browser', () => ({
  __esModule: true,
  default: {
    init: jest.fn(),
    sendForm: jest.fn().mockResolvedValue({ status: 200, text: 'OK' })
  }
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (namespace: string) => {
    const dict = (
      require('../../../messages/pt.json') as Record<
        string,
        Record<string, string>
      >
    )[namespace];
    return (key: string) => dict[key];
  }
}));

describe('ContactPage', () => {
  it('renders the contact heading', async () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await ContactPage({ params: Promise.resolve({ locale: 'pt' }) })}
      </NextIntlClientProvider>
    );
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the email form fields and submit button', async () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await ContactPage({ params: Promise.resolve({ locale: 'pt' }) })}
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(messages.contact.name)).toBeInTheDocument();
    expect(screen.getByLabelText(messages.contact.email)).toBeInTheDocument();
    expect(
      screen.getByLabelText(messages.contact.message)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: messages.contact.send })
    ).toBeInTheDocument();
  });
});
