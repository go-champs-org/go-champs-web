import { render, screen, fireEvent } from '@testing-library/react';
import { LocaleSwitcher } from './LocaleSwitcher';

jest.mock('next-intl', () => ({
  useLocale: () => 'pt'
}));

jest.mock('../i18n/navigation', () => ({
  usePathname: () => '/acme/liga-2026',
  Link: ({
    href,
    locale,
    children,
    ...rest
  }: {
    href: string;
    locale: string;
    children: React.ReactNode;
  }) => (
    <a href={`/${locale}${href}`} {...rest}>
      {children}
    </a>
  )
}));

describe('LocaleSwitcher', () => {
  it('shows the current locale as the closed trigger', () => {
    render(<LocaleSwitcher />);

    expect(screen.getByRole('button')).toHaveTextContent('🇧🇷');
  });

  it('lists every locale, linking to the same path, on open', () => {
    render(<LocaleSwitcher />);
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('link', { name: /🇧🇷/ })).toHaveAttribute(
      'href',
      '/pt/acme/liga-2026'
    );
    expect(screen.getByRole('link', { name: /🇺🇸/ })).toHaveAttribute(
      'href',
      '/en/acme/liga-2026'
    );
  });
});
