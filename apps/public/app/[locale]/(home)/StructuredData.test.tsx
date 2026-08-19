import { render } from '@testing-library/react';
import { StructuredData } from './StructuredData';
import { SITE_URL } from '../../../src/seo/metadata';

const parsedGraph = (container: HTMLElement) =>
  JSON.parse(
    container.querySelector('script[type="application/ld+json"]')
      ?.textContent || 'null'
  );

const recentlyView = {
  tournamentId: 't1',
  tournamentName: 'Liga Teste',
  tournamentSlug: 'liga-teste',
  organizationName: 'Org Teste',
  organizationSlug: 'org-teste',
  organizationLogoUrl: '',
  views: 3
};

describe('StructuredData', () => {
  it('lists the tournaments the page is showing', () => {
    const { container } = render(
      <StructuredData
        locale="pt"
        cmsUrl="https://cms.example"
        recentlyViews={[recentlyView]}
      />
    );

    const list = parsedGraph(container)['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'ItemList'
    );

    expect(list.itemListElement).toEqual([
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Liga Teste',
        url: 'https://cms.example/org-teste/liga-teste'
      }
    ]);
  });

  it('leaves the list out when there is nothing to show', () => {
    const { container } = render(<StructuredData locale="pt" />);

    expect(
      parsedGraph(container)['@graph'].some(
        (node: { '@type': string }) => node['@type'] === 'ItemList'
      )
    ).toBe(false);
  });

  it('escapes a closing script tag so the JSON cannot break out', () => {
    const { container } = render(<StructuredData locale="pt" />);
    const json =
      container.querySelector('script[type="application/ld+json"]')
        ?.innerHTML || '';

    expect(json).not.toContain('</script');
  });
});
