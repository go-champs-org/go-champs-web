import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import LocaleLayout from './layout';

const mockNotFound = jest.fn();

jest.mock('next/navigation', () => ({
  notFound: (...args: unknown[]) => mockNotFound(...args)
}));

// In real builds, next-intl's Next.js plugin (see next.config.js) rewrites
// `<NextIntlClientProvider>` to inject the request-scoped `locale` prop at
// compile time. That rewrite doesn't run under plain jest, so
// NextIntlClientProvider would throw here even though nothing under test
// (NavBar/Footer/analytics scripts) actually reads translations client-side.
// Stub it to a passthrough so this test focuses on layout composition.
jest.mock('next-intl', () => ({
  ...jest.requireActual('next-intl'),
  NextIntlClientProvider: ({ children }: { children: ReactNode }) => children
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
  getTranslations: async (namespace: string) => {
    const dict = (
      require('../../messages/pt.json') as Record<string, Record<string, string>>
    )[namespace];
    return (key: string) => dict[key];
  }
}));

const isNestedHtmlWarning = (message: unknown) =>
  typeof message === 'string' && message.includes('cannot be a child of');

describe('LocaleLayout', () => {
  const originalGaId = process.env.NEXT_PUBLIC_GA_ID;

  // LocaleLayout renders its own <html>/<body> (required by the App Router),
  // but jsdom's document already provides one. Testing Library has no way to
  // render a component's <html> as the *actual* document root, so mounting
  // it (even into document.documentElement) nests a second <html> and React
  // logs a DOM-nesting warning. This is a known limitation of testing root
  // layouts with RTL, not a real bug — silence only that specific message.
  let consoleErrorSpy: jest.SpyInstance;
  const originalConsoleError = console.error.bind(console);

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation((message, ...args) => {
        if (isNestedHtmlWarning(message)) return;
        originalConsoleError(message, ...args);
      });
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA_ID = originalGaId;
    mockNotFound.mockClear();
    consoleErrorSpy.mockRestore();
  });

  it('renders NavBar links and Footer for a valid locale', async () => {
    render(
      await LocaleLayout({
        children: <div data-testid="child">child content</div>,
        params: Promise.resolve({ locale: 'pt' })
      }),
      { container: document.documentElement }
    );

    expect(screen.getByRole('link', { name: 'Sobre nós' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Perguntas Frequentes' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Fale com a gente' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Fazer login' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Política de Privacidade (BR)' })
    ).toBeInTheDocument();
  });

  it('renders analytics scripts when NEXT_PUBLIC_GA_ID is set', async () => {
    process.env.NEXT_PUBLIC_GA_ID = 'G-TEST123';

    const { container } = render(
      await LocaleLayout({
        children: <div>child</div>,
        params: Promise.resolve({ locale: 'pt' })
      }),
      { container: document.documentElement }
    );

    expect(
      container.querySelector('script#ga-init')
    ).toBeInTheDocument();
  });

  it('calls notFound() for an invalid locale', async () => {
    await LocaleLayout({
      children: <div>child</div>,
      params: Promise.resolve({ locale: 'xx' })
    });

    expect(mockNotFound).toHaveBeenCalled();
  });
});
