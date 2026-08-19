import { render } from '@testing-library/react';
import { StructuredData } from './StructuredData';
import { SITE_URL } from '../../src/seo/metadata';

const parsedGraph = (container: HTMLElement) =>
  JSON.parse(
    container.querySelector('script[type="application/ld+json"]')
      ?.textContent || 'null'
  );

describe('StructuredData', () => {
  it('describes the site and the organization behind it', () => {
    const { container } = render(<StructuredData locale="pt" />);

    const graph = parsedGraph(container)['@graph'];

    expect(graph).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'Organization',
          name: 'Go Champs',
          url: SITE_URL
        }),
        expect.objectContaining({
          '@type': 'WebSite',
          url: `${SITE_URL}/pt`,
          inLanguage: 'pt'
        })
      ])
    );
  });

  it('escapes a closing script tag so the JSON cannot break out', () => {
    const { container } = render(<StructuredData locale="pt" />);
    const json =
      container.querySelector('script[type="application/ld+json"]')
        ?.innerHTML || '';

    expect(json).not.toContain('</script');
  });
});
