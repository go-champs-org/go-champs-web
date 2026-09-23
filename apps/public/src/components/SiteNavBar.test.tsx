import { render, screen } from '@testing-library/react';
import { SiteNavBar } from './SiteNavBar';

describe('SiteNavBar', () => {
  afterEach(() => {
    document.cookie = 'gc_username=; path=/; max-age=0';
  });

  it('renders a sign in link when no username cookie is set', async () => {
    render(
      <SiteNavBar
        links={[{ href: '/about', label: 'About' }]}
        logoHref="/"
        logoSrc="/logo.png"
        logoSrcMobile="/logo-mobile.png"
        loginLabel="Sign in"
      />
    );

    expect(
      await screen.findByRole('link', { name: 'Sign in' })
    ).toHaveAttribute('href', expect.stringContaining('/SignIn'));
  });

  it('renders the account link when a username cookie is set', async () => {
    document.cookie = 'gc_username=someusername; path=/';

    render(
      <SiteNavBar
        links={[{ href: '/about', label: 'About' }]}
        logoHref="/"
        logoSrc="/logo.png"
        logoSrcMobile="/logo-mobile.png"
        loginLabel="Sign in"
      />
    );

    expect(
      await screen.findByRole('link', { name: '@someusername' })
    ).toHaveAttribute('href', expect.stringContaining('/Account'));
    expect(
      screen.queryByRole('link', { name: 'Sign in' })
    ).not.toBeInTheDocument();
  });
});
