import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

const t = {
  tagline: 'The home of sport.',
  platform: 'Platform',
  forOrganizers: 'For organizers',
  tournaments: 'Tournaments',
  apiDocumentation: 'API documentation',
  knowGoChamps: 'Meet Go Champs',
  faq: 'FAQ',
  contactUs: 'Contact us',
  privacyPolicyBR: 'Privacy Policy (BR)',
  termsBR: 'Terms of Use (BR)',
  with: 'with',
  byGoChampsTeam: 'by Go Champs team',
  theSourceCodeIsLicensed: 'The source code is licensed',
  copyright: 'Copyright',
  andContributors: 'and contributors',
  allRightsReserved: 'All rights reserved'
};

const links = {
  home: '/',
  about: '/about',
  organizers: '/about#organizers',
  faq: '/faq',
  contact: '/contact',
  privacy: '/PrivacyPolicyBR',
  terms: '/TermsBR'
};

describe('Footer', () => {
  it('renders the brand tagline and the social links', () => {
    render(<Footer t={t} links={links} logoSrc="/logo.png" />);

    expect(screen.getByText('The home of sport.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Go Champs' })).toHaveAttribute(
      'src',
      '/logo.png'
    );
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/gochampsapp'
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'YouTube' })).toBeInTheDocument();
  });

  it('renders the platform and company link columns', () => {
    render(<Footer t={t} links={links} />);

    expect(screen.getByRole('link', { name: 'For organizers' })).toHaveAttribute(
      'href',
      '/about#organizers'
    );
    expect(screen.getByRole('link', { name: 'Tournaments' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(
      screen.getByRole('link', { name: 'API documentation' })
    ).toHaveAttribute('href', 'https://api.go-champs.com/docs');
    expect(screen.getByRole('link', { name: 'Meet Go Champs' })).toHaveAttribute(
      'href',
      '/about'
    );
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute(
      'href',
      '/faq'
    );
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  it('renders the license, privacy and terms links', () => {
    render(<Footer t={t} links={links} />);

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

  it('renders the attribution and copyright', () => {
    render(<Footer t={t} links={links} />);

    expect(screen.getByText(/by Go Champs team/)).toBeInTheDocument();
    expect(
      screen.getByText(/and contributors\. All rights reserved\./)
    ).toBeInTheDocument();
  });

  it('omits the build line when no build number is provided', () => {
    render(<Footer t={t} links={links} />);

    expect(screen.queryByText(/Build:/)).not.toBeInTheDocument();
  });

  it('renders the build line when a build number is provided', () => {
    render(<Footer t={t} links={links} buildNumber="1.0.42" />);

    expect(screen.getByText('1.0.42')).toBeInTheDocument();
  });
});
