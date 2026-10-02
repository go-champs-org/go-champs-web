import { manageButtonClassName } from './manageButtonClassName';

describe('manageButtonClassName', () => {
  it('shows the button as an inline flex for members', () => {
    expect(manageButtonClassName(true)).toContain('inline-flex');
  });

  it('does not hide the button for members', () => {
    expect(manageButtonClassName(true)).not.toContain('hidden');
  });

  it('hides the button for non members', () => {
    expect(manageButtonClassName(false)).toEqual('hidden');
  });
});
