import { render, screen, fireEvent } from '@testing-library/react';
import { ScopeFilter } from './ScopeFilter';

describe('ScopeFilter', () => {
  const scopeLabels = { aggregate: 'Totals', per_game: 'Per game' };

  it('marks the active scope pressed and calls onSelect for the other one', () => {
    const onSelect = jest.fn();
    render(
      <ScopeFilter
        scopes={['aggregate', 'per_game']}
        scopeLabels={scopeLabels}
        legend="Stats scope"
        activeScope="aggregate"
        onSelect={onSelect}
        testId="stats-scope"
      />
    );

    expect(screen.getByRole('button', { name: 'Totals' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Per game' }));
    expect(onSelect).toHaveBeenCalledWith('per_game');
  });
});
