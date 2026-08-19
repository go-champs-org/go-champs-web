import { render, screen, waitFor } from '@testing-library/react';
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

const fetchMock = jest.fn();

const renderSidebar = () =>
  render(
    <NextIntlClientProvider locale="pt" messages={messages}>
      <OrganizationsSidebar cmsUrl="https://cms.example" />
    </NextIntlClientProvider>
  );

const respondWith = (organizations: OrganizationEntity[]) =>
  fetchMock.mockResolvedValue({ ok: true, json: async () => organizations });

describe('OrganizationsSidebar', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it('lists the recently viewed organizations, linked to the CMS', async () => {
    respondWith([organization('a'), organization('b')]);

    renderSidebar();

    expect(await screen.findByText('Org a')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/organizations/recently-viewed'
    );
    expect(screen.getByRole('link', { name: /Org b/ })).toHaveAttribute(
      'href',
      'https://cms.example/org-b'
    );
  });

  it('shows at most 15 organizations', async () => {
    respondWith(
      Array.from({ length: 20 }, (_unused, index) =>
        organization(String(index))
      )
    );

    renderSidebar();
    await screen.findByText('Org 0');

    expect(screen.getAllByRole('link')).toHaveLength(15);
  });

  it('tells the visitor when nothing has been viewed yet', async () => {
    respondWith([]);

    renderSidebar();

    expect(
      await screen.findByText('Nenhuma organização vista ainda')
    ).toBeInTheDocument();
  });

  it('renders nothing when the request fails', async () => {
    fetchMock.mockRejectedValue(new Error('offline'));

    const { container } = renderSidebar();

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('expands and collapses the list on small screens', async () => {
    const user = userEvent.setup();
    respondWith([organization('a')]);

    renderSidebar();
    await screen.findByText('Org a');

    const toggle = screen.getByRole('button', { name: 'Organizações' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
