import { render } from '@testing-library/react';
import { GoogleAnalytics } from './GoogleAnalytics';

describe('GoogleAnalytics', () => {
  it('renders nothing when gaId is empty', () => {
    const { container } = render(<GoogleAnalytics gaId="" />);
    expect(container.querySelector('script')).toBeNull();
  });

  it('renders gtag script tags when gaId is set', () => {
    const { container } = render(<GoogleAnalytics gaId="G-TEST123" />);
    expect(container.querySelectorAll('script').length).toBeGreaterThan(0);
  });
});
