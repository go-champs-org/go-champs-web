import { render } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AdBanner, AD_LOADER_SRC } from './AdBanner';

const loaderScripts = () =>
  document.head.querySelectorAll(`script[src="${AD_LOADER_SRC}"]`);

describe('AdBanner', () => {
  beforeEach(() => {
    delete (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
  });

  afterEach(() => {
    loaderScripts().forEach(script => script.remove());
  });

  it('keeps the ad slot out of the server-rendered HTML', () => {
    // Guards the hydration mismatch documented in useAdSlot.
    expect(renderToStaticMarkup(<AdBanner />)).not.toContain('<ins');
  });

  it('keeps the loader script out of React and out of the server HTML', () => {
    // Same mismatch, one node up: the loader stamps its own <script> tag.
    expect(renderToStaticMarkup(<AdBanner />)).not.toContain('<script');
  });

  it('appends the loader to the head once mounted', () => {
    render(<AdBanner />);

    expect(loaderScripts()).toHaveLength(1);
  });

  it('reuses a loader that is already on the page', () => {
    render(<AdBanner />);
    render(<AdBanner />);

    expect(loaderScripts()).toHaveLength(1);
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
});
