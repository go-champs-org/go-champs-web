import { render, screen } from '@testing-library/react';
import { Button, Card } from '@gochamps/ui';

describe('packages/ui smoke test', () => {
  it('renders Button and Card from the shared package', () => {
    render(
      <Card title="Título">
        <Button variant="primary">Enviar</Button>
      </Card>
    );
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
  });
});
