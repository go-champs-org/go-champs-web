import { render, screen, fireEvent } from '@testing-library/react';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('opens the mobile menu on burger click and closes it on outside click', () => {
    render(<NavBar links={[{ href: '/about', label: 'About' }]} />);

    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'menu' }));
    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(2);

    fireEvent.mouseDown(document.body);
    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(1);
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
});
