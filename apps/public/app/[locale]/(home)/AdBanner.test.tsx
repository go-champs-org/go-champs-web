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
    // AdSense rewrites the <ins> (status attributes, inline styles, an
    // injected iframe) the moment its loader runs. A server-rendered slot
    // therefore hydrates against a node a third party already changed, and
    // React reports a mismatch it cannot patch up.
    expect(renderToStaticMarkup(<AdBanner />)).not.toContain('<ins');
  });

  it('keeps the loader script out of React and out of the server HTML', () => {
    // The loader stamps data-checked-head="true" on its own tag, so React must
    // not own that element either — same mismatch, different node.
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
