import { render, screen, fireEvent } from '@testing-library/react';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('toggles the mobile menu open and closed on burger click', () => {
    render(<NavBar links={[{ href: '/about', label: 'About' }]} />);

    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'menu' }));
    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(2);

    fireEvent.click(screen.getByRole('button', { name: 'menu' }));
    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(1);
  });

  it('stays pinned to the top of the viewport while the page scrolls', () => {
    render(<NavBar links={[{ href: '/about', label: 'About' }]} />);

    expect(screen.getByRole('navigation')).toHaveClass(
      'sticky',
      'top-0',
      'z-50'
    );
  });

  it('renders a theme toggle button', () => {
    render(<NavBar links={[{ href: '/about', label: 'About' }]} />);

    expect(
      screen.getByRole('button', { name: /switch to (dark|light) theme/i })
    ).toBeInTheDocument();
  });

  it('renders links and the login button', () => {
    render(
      <NavBar
        links={[{ href: '/about', label: 'About' }]}
        loginHref="/SignIn"
        loginLabel="Log in"
      />
    );

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
    expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute(
      'href',
      '/SignIn'
    );
  });

  it('omits the login button when no login link is provided', () => {
    render(<NavBar links={[{ href: '/about', label: 'About' }]} />);

    expect(
      screen.queryByRole('link', { name: /log in/i })
    ).not.toBeInTheDocument();
  });

  it('renders the given locale switcher in both the desktop and mobile menus', () => {
    render(
      <NavBar
        links={[{ href: '/about', label: 'About' }]}
        localeSwitcher={<button type="button">PT</button>}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'menu' }));

    expect(
      screen.getAllByRole('button', { name: 'PT' })
    ).toHaveLength(2);
  });

  it('omits the locale switcher slot when none is given', () => {
    render(<NavBar links={[{ href: '/about', label: 'About' }]} />);

    expect(screen.queryByRole('button', { name: 'PT' })).not.toBeInTheDocument();
  });
});
