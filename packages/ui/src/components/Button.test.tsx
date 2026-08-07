import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children and applies primary variant class', () => {
    render(<Button variant="primary">Submit</Button>);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-primary');
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole('button', { name: 'Cancel' }).className).toContain('bg-secondary');
  });
});
