import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

const t = {
  with: 'with',
  byGoChampsTeam: 'by Go Champs team',
  theSourceCodeIsLicensed: 'The source code is licensed',
  privacyPolicyBR: 'Privacy Policy (BR)',
  termsBR: 'Terms of Use (BR)',
  copyright: 'Copyright',
  andContributors: 'and contributors',
  allRightsReserved: 'All rights reserved',
  apiDocumentationPrefix: 'Check out the',
  apiDocumentationSuffix: 'documentation'
};

describe('Footer', () => {
  it('renders the license, privacy and terms links', () => {
    render(
      <Footer
        t={t}
        privacyHref="/PrivacyPolicyBR"
        termsHref="/TermsBR"
      />
    );

    expect(screen.getByRole('link', { name: 'MIT' })).toHaveAttribute(
      'href',
      'https://github.com/lairjr/go-champs-web/blob/master/LICENSE'
    );
    expect(
      screen.getByRole('link', { name: 'Privacy Policy (BR)' })
    ).toHaveAttribute('href', '/PrivacyPolicyBR');
    expect(
      screen.getByRole('link', { name: 'Terms of Use (BR)' })
    ).toHaveAttribute('href', '/TermsBR');
  });

  it('omits the build line when no build number is provided', () => {
    render(<Footer t={t} privacyHref="/PrivacyPolicyBR" termsHref="/TermsBR" />);

    expect(screen.queryByText(/Build:/)).not.toBeInTheDocument();
  });

  it('renders the build line when a build number is provided', () => {
    render(
      <Footer
        t={t}
        privacyHref="/PrivacyPolicyBR"
        termsHref="/TermsBR"
        buildNumber="1.0.42"
      />
    );

    expect(screen.getByText('1.0.42')).toBeInTheDocument();
  });
});
