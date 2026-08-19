import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import type { OrganizationEntity } from '@gochamps/api-client';
import { OrganizationsSidebar } from './OrganizationsSidebar';
import messages from '../../messages/pt.json';

const organization = (id: string): OrganizationEntity => ({
  id,
  name: `Org ${id}`,
  slug: `org-${id}`,
  logoUrl: ''
});

const renderSidebar = (organizations: OrganizationEntity[]) =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <OrganizationsSidebar
        cmsUrl="https://cms.example"
        organizations={organizations}
      />
    </NextIntlClientProvider>
  );

describe('OrganizationsSidebar', () => {
  it('lists the organizations it was given, linked to the CMS', () => {
    renderSidebar([organization('a'), organization('b')]);

    expect(screen.getByText('Org a')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Org b/ })).toHaveAttribute(
      'href',
      'https://cms.example/org-b'
    );
  });

  it('shows at most 15 organizations', () => {
    renderSidebar(
      Array.from({ length: 20 }, (_unused, index) =>
        organization(String(index))
      )
    );

    expect(screen.getAllByRole('link')).toHaveLength(15);
  });

  it('tells the visitor when nothing has been viewed yet', () => {
    renderSidebar([]);

    expect(
      screen.getByText('Nenhuma organização vista ainda')
    ).toBeInTheDocument();
  });

  it('sizes the logos so the list does not shift as they load', () => {
    renderSidebar([{ ...organization('a'), logoUrl: 'https://x/logo.png' }]);

    const logo = screen.getByRole('img', { name: 'Org a' });
    expect(logo).toHaveAttribute('width', '32');
    expect(logo).toHaveAttribute('height', '32');
    expect(logo).toHaveAttribute('loading', 'lazy');
  });

  it('expands and collapses the list on small screens', async () => {
    const user = userEvent.setup();
    renderSidebar([organization('a')]);

    const toggle = screen.getByRole('button', { name: 'Organizações' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
