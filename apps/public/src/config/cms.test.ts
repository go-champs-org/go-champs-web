describe('CMS_URL', () => {
  const originalCmsUrl = process.env.NEXT_PUBLIC_CMS_URL;

  afterEach(() => {
    if (originalCmsUrl === undefined) {
      delete process.env.NEXT_PUBLIC_CMS_URL;
    } else {
      process.env.NEXT_PUBLIC_CMS_URL = originalCmsUrl;
    }
    jest.resetModules();
  });

  it('is always absolute, so a link never resolves against this app', async () => {
    // A relative href here is a 404: the next-intl middleware prefixes the
    // locale onto it and the CMS knows no /pt/... path.
    delete process.env.NEXT_PUBLIC_CMS_URL;
    jest.resetModules();
    const { CMS_URL } = await import('./cms');

    expect(CMS_URL).toMatch(/^https?:\/\//);
  });

  it('drops a trailing slash so paths join cleanly', async () => {
    process.env.NEXT_PUBLIC_CMS_URL = 'https://cms.example/';
    jest.resetModules();
    const { CMS_URL } = await import('./cms');

    expect(CMS_URL).toBe('https://cms.example');
  });

  it('builds CMS paths from a leading-slash path', async () => {
    process.env.NEXT_PUBLIC_CMS_URL = 'https://cms.example';
    jest.resetModules();
    const { cmsPath } = await import('./cms');

    expect(cmsPath('/SignIn')).toBe('https://cms.example/SignIn');
  });
});
