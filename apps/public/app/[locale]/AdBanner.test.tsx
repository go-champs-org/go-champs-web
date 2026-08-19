import { render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AdBanner } from './AdBanner';

describe('AdBanner', () => {
  it('keeps the ad slot out of the server-rendered HTML', () => {
    // AdSense rewrites the <ins> (status attributes, inline styles, an
    // injected iframe) the moment its loader runs. A server-rendered slot
    // therefore hydrates against a node a third party already changed, and
    // React reports a mismatch it cannot patch up.
    expect(renderToStaticMarkup(<AdBanner />)).not.toContain('<ins');
  });

  it('renders the ad slot and queues a single render request once mounted', () => {
    const { container } = render(<AdBanner />);

    const slot = container.querySelector('ins.adsbygoogle');
    expect(slot).toHaveAttribute('data-ad-client', 'ca-pub-8429375868019921');
    expect(slot).toHaveAttribute('data-ad-slot', '7176219418');
    expect(
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle
    ).toHaveLength(1);
  });

  it('gives the slot a full-width block box so AdSense can measure it', () => {
    // A zero-width slot makes adsbygoogle.push() fail with
    // "No slot size for availableWidth=0".
    const { container } = render(<AdBanner />);

    const slot = container.querySelector('ins.adsbygoogle');
    expect(slot).toHaveClass('block', 'w-full');
    expect(slot?.parentElement).not.toHaveClass('flex');
  });
});
