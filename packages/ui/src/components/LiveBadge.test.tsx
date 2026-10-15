import { render, screen } from '@testing-library/react';
import { LiveBadge } from './LiveBadge';

describe('LiveBadge', () => {
  it('shows the label it receives', () => {
    render(<LiveBadge label="Ao vivo" />);

    expect(screen.getByTestId('live-badge')).toHaveTextContent('Ao vivo');
  });
});
