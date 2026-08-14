import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import FaqPage from './page';
import messages from '../../../messages/pt.json';

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

describe('FaqPage', () => {
  it('renders the FAQ heading and subtitle', async () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await FaqPage({ params: Promise.resolve({ locale: 'pt' }) })}
      </NextIntlClientProvider>
    );
    expect(
      screen.getByRole('heading', { level: 1, name: messages.faq.faq })
    ).toBeInTheDocument();
    expect(screen.getByText(messages.faq.faqSubtitle)).toBeInTheDocument();
  });

  it('renders all questions collapsed by default and expands one on click', async () => {
    render(
      <NextIntlClientProvider locale="pt" messages={messages}>
        {await FaqPage({ params: Promise.resolve({ locale: 'pt' }) })}
      </NextIntlClientProvider>
    );

    expect(
      screen.getByText(messages.faq.faqQ1Question)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(messages.faq.faqQ1Answer)
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByText(messages.faq.faqQ1Question).closest('button')!
    );

    expect(screen.getByText(messages.faq.faqQ1Answer)).toBeInTheDocument();
  });
});
