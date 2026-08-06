import { render, screen } from '@testing-library/react';
import { Button, Card } from '@gochamps/ui';

describe('packages/ui smoke test', () => {
  it('renders Button and Card from the shared package', () => {
    render(
      <Card title="Título">
        <Button variant="primary">Enviar</Button>
      </Card>
    );
    const button = screen.getByRole('button', { name: 'Enviar' });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-primary');
    expect(screen.getByText('Título')).toBeInTheDocument();
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Cancelar</Button>);
    expect(screen.getByRole('button', { name: 'Cancelar' }).className).toContain('bg-secondary');
  });
});
