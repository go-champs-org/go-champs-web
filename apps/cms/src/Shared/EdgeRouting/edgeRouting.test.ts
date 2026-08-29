import { isEdgeRoutingEnabled } from './edgeRouting';

describe('isEdgeRoutingEnabled', () => {
  const originalValue = process.env.REACT_APP_EDGE_ROUTING;

  afterEach(() => {
    process.env.REACT_APP_EDGE_ROUTING = originalValue;
  });

  it('is on when the build sets the flag', () => {
    process.env.REACT_APP_EDGE_ROUTING = 'true';
    expect(isEdgeRoutingEnabled()).toBe(true);
  });

  it.each([
    ['unset', undefined],
    ['empty', ''],
    ['false', 'false'],
    // only the exact string counts — a truthy-looking value is still a
    // misconfiguration, and guessing wrong would slow every Netlify
    // navigation down to a full page load
    ['1', '1'],
    ['TRUE', 'TRUE']
  ])('is off when the flag is %s', (_label, value) => {
    if (value === undefined) {
      delete process.env.REACT_APP_EDGE_ROUTING;
    } else {
      process.env.REACT_APP_EDGE_ROUTING = value;
    }

    expect(isEdgeRoutingEnabled()).toBe(false);
  });
});
