import { render, screen } from '@testing-library/react';
import { Surface } from './Surface';

describe('Surface', () => {
  it('renders children inside a themed panel', () => {
    render(<Surface>content</Surface>);

    const panel = screen.getByText('content');
    expect(panel).toHaveClass('rounded-xl', 'border', 'border-border', 'bg-surface');
  });

  it('renders as the requested element so pages keep their landmarks', () => {
    render(<Surface as="section" aria-label="roster" />);

    expect(screen.getByRole('region', { name: 'roster' })).toBeInTheDocument();
  });

  it('keeps the caller className alongside the panel classes', () => {
    render(<Surface className="p-6">content</Surface>);

    const panel = screen.getByText('content');
    expect(panel).toHaveClass('bg-surface', 'p-6');
  });
});
