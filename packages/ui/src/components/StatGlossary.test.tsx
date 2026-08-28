import { render, screen, fireEvent } from '@testing-library/react';
import { StatGlossaryToggle, StatGlossaryList } from './StatGlossary';

describe('StatGlossaryToggle', () => {
  it('calls onToggle and reflects isOpen', () => {
    const onToggle = jest.fn();
    render(
      <StatGlossaryToggle
        label="Glossary"
        isOpen={false}
        onToggle={onToggle}
        controls="stats-glossary"
      />
    );

    const button = screen.getByRole('button', { name: /Glossary/ });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe('StatGlossaryList', () => {
  it('hides the list while closed but keeps it in the DOM', () => {
    render(
      <StatGlossaryList
        id="stats-glossary"
        isOpen={false}
        columns={[{ slug: 'pts', label: 'PTS', description: 'Points' }]}
      />
    );

    const list = screen.getByTestId('stats-glossary');
    expect(list).toHaveAttribute('hidden');
    expect(screen.getByText('PTS - Points')).toBeInTheDocument();
  });
});
