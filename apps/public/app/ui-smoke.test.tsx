import { render, screen } from '@testing-library/react';
import { Button, Card } from '@gochamps/ui';

describe('packages/ui smoke test', () => {
  it('renders Button and Card from the shared package', () => {
    render(
      <Card title="Title">
        <Button variant="primary">Submit</Button>
      </Card>
    );
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-primary');
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole('button', { name: 'Cancel' }).className).toContain('bg-secondary');
  });
});
