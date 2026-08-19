import { render } from '@testing-library/react';
import { AdBanner } from './AdBanner';

describe('AdBanner', () => {
  it('renders the ad slot and queues a single render request', () => {
    const { container } = render(<AdBanner />);

    const slot = container.querySelector('ins.adsbygoogle');
    expect(slot).toHaveAttribute('data-ad-client', 'ca-pub-8429375868019921');
    expect(slot).toHaveAttribute('data-ad-slot', '7176219418');
    expect(
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle
    ).toHaveLength(1);
  });
});
