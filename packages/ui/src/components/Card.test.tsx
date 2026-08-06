import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders title and children', () => {
    render(<Card title="Title">content</Card>);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
