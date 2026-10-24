import { render, screen } from '@testing-library/react';
import { getCurrentLegalDocuments } from '@gochamps/api-client';
import LegalDocumentPage from './LegalDocumentPage';

jest.mock('@gochamps/api-client', () => ({
  getCurrentLegalDocuments: jest.fn()
}));

const getCurrentLegalDocumentsMock = jest.mocked(getCurrentLegalDocuments);

const terms = {
  id: 'terms-id',
  kind: 'terms_of_use' as const,
  locale: 'pt-BR',
  version: '1',
  title: 'Termos de Uso',
  content: '## 1. Sobre a plataforma',
  effectiveAt: '2026-04-11T00:00:00Z'
};

const privacy = {
  ...terms,
  id: 'privacy-id',
  kind: 'privacy_policy' as const,
  title: 'Política de Privacidade',
  content: '## 1. Introdução',
  effectiveAt: '2026-10-13T00:00:00Z'
};

const renderPage = async (kind: 'terms_of_use' | 'privacy_policy') =>
  render(await LegalDocumentPage({ kind, fallbackTitle: 'Fallback' }));

describe('LegalDocumentPage', () => {
  beforeEach(() => {
    getCurrentLegalDocumentsMock.mockReset();
  });

  it('renders the current version of the document the page is for', async () => {
    getCurrentLegalDocumentsMock.mockResolvedValue([terms, privacy]);

    await renderPage('privacy_policy');

    expect(
      screen.getByRole('heading', { level: 1, name: 'Política de Privacidade' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Última atualização: 13/10/2026')
    ).toBeInTheDocument();
    expect(screen.getByTestId('markdown')).toHaveTextContent(
      '## 1. Introdução'
    );
    expect(getCurrentLegalDocumentsMock).toHaveBeenCalledWith('pt-BR');
  });

  describe('when the API fails', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      getCurrentLegalDocumentsMock.mockRejectedValue(new Error('offline'));
    });

    afterEach(() => {
      delete process.env.NEXT_PHASE;
    });

    it('throws while serving, so a failed refresh keeps the last good page', async () => {
      await expect(renderPage('terms_of_use')).rejects.toThrow('offline');
    });

    it('throws while serving when the API has no current version of the document', async () => {
      getCurrentLegalDocumentsMock.mockResolvedValue([privacy]);

      await expect(renderPage('terms_of_use')).rejects.toThrow(
        'The API has no current terms_of_use'
      );
    });

    it('says the document could not be loaded during the build', async () => {
      process.env.NEXT_PHASE = 'phase-production-build';

      await renderPage('terms_of_use');

      expect(
        screen.getByRole('heading', { level: 1, name: 'Fallback' })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Não foi possível carregar o documento/)
      ).toBeInTheDocument();
      expect(screen.queryByTestId('markdown')).not.toBeInTheDocument();
    });
  });
});
