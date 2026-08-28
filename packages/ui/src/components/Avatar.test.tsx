import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders the logo when present', () => {
    render(
      <Avatar name="Clube Ginástico Gaúcho" logoUrl="https://cdn.example.com/logo.png" size={40} />
    );

    const img = screen.getByRole('img', { name: 'Clube Ginástico Gaúcho' });
    expect(img).toHaveAttribute('src', 'https://cdn.example.com/logo.png');
  });

  it('falls back to initials when there is no logo', () => {
    render(<Avatar name="Clube Ginástico Gaúcho" logoUrl="" size={40} />);

    expect(screen.getByText('CGG')).toBeInTheDocument();
  });
});
