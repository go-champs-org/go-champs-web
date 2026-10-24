describe('getCurrentLegalDocuments', () => {
  const originalFetch = global.fetch;
  const originalApiHost = process.env.API_HOST;

  afterEach(() => {
    global.fetch = originalFetch;
    if (originalApiHost === undefined) {
      delete process.env.API_HOST;
    } else {
      process.env.API_HOST = originalApiHost;
    }
    jest.resetModules();
  });

  it('fetches the current documents for a locale and maps them to camelCase', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getCurrentLegalDocuments } = await import('./legalDocuments');

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 'terms-id',
            kind: 'terms_of_use',
            locale: 'pt-BR',
            version: '1',
            title: 'Termos de Uso',
            content: '## 1. Sobre a plataforma',
            content_sha256: 'abc',
            effective_at: '2026-04-11T00:00:00Z',
            requires_reacceptance: true
          }
        ]
      })
    });
    global.fetch = (fetchMock as unknown) as typeof fetch;

    const result = await getCurrentLegalDocuments('pt-BR');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/v1/legal-documents/current?locale=pt-BR',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' }
      })
    );
    expect(result).toEqual([
      {
        id: 'terms-id',
        kind: 'terms_of_use',
        locale: 'pt-BR',
        version: '1',
        title: 'Termos de Uso',
        content: '## 1. Sobre a plataforma',
        effectiveAt: '2026-04-11T00:00:00Z'
      }
    ]);
  });
});
