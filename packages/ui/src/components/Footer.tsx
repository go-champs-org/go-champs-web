import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

export interface FooterTranslations {
  tagline: string;
  platform: string;
  forOrganizers: string;
  tournaments: string;
  apiDocumentation: string;
  knowGoChamps: string;
  faq: string;
  contactUs: string;
  privacyPolicyBR: string;
  termsBR: string;
  with: string;
  byGoChampsTeam: string;
  theSourceCodeIsLicensed: string;
  copyright: string;
  andContributors: string;
  allRightsReserved: string;
}

export interface FooterLinks {
  home: string;
  about: string;
  organizers: string;
  faq: string;
  contact: string;
  privacy: string;
  terms: string;
}

export interface FooterProps {
  t: FooterTranslations;
  links: FooterLinks;
  logoSrc?: string;
  buildNumber?: string;
}

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/gochampsapp',
    label: 'Instagram',
    Icon: FaInstagram
  },
  {
    href: 'https://www.linkedin.com/company/go-champs',
    label: 'LinkedIn',
    Icon: FaLinkedin
  },
  {
    href: 'https://www.youtube.com/@GoChampsApp',
    label: 'YouTube',
    Icon: FaYoutube
  }
];

const API_DOCS_URL = 'https://api.go-champs.com/docs';
const LICENSE_URL = 'https://github.com/lairjr/go-champs-web/blob/master/LICENSE';

const COLUMN_TITLE_CLASS =
  'mb-2.5 block text-sm font-medium leading-5 tracking-[0.1px] text-primary';
const COLUMN_LINK_CLASS =
  'py-1 text-sm leading-5 tracking-[0.25px] text-white opacity-70 transition-all hover:text-primary hover:opacity-100';
const LEGAL_LINK_CLASS = 'text-primary hover:opacity-80';

// The footer is dark in both themes, so it reads the navbar token and a fixed
// light text color instead of the page foreground.
export function Footer({ t, links, logoSrc, buildNumber }: FooterProps) {
  return (
    <>
      <div className="mt-auto h-12 shrink-0 md:h-20" aria-hidden="true" />
      <footer className="bg-navbar pb-8 pt-16 text-white md:pb-10 md:pt-12">
        <div className="mx-auto flex max-w-[calc(var(--content-max-width,1200px)+2.5rem)] flex-col gap-10 px-5 md:max-w-[calc(var(--content-max-width,1200px)+4rem)] md:gap-8 md:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col items-start gap-8 md:w-[340px]">
              <a href={links.home}>
                {logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoSrc} alt="Go Champs" className="block h-[89px] w-auto" />
                ) : (
                  <span className="text-lg font-bold text-primary">Go Champs</span>
                )}
              </a>
              <p className="text-sm leading-5 tracking-[0.25px] opacity-70">
                {t.tagline}
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full bg-white/15 text-lg text-white transition-all hover:-translate-y-0.5 hover:text-primary"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <nav className="flex flex-col gap-10 md:flex-row md:gap-12">
              <div className="flex flex-col gap-0.5 md:w-[180px]">
                <span className={COLUMN_TITLE_CLASS}>{t.platform}</span>
                <a href={links.organizers} className={COLUMN_LINK_CLASS}>
                  {t.forOrganizers}
                </a>
                <a href={links.home} className={COLUMN_LINK_CLASS}>
                  {t.tournaments}
                </a>
                <a href={API_DOCS_URL} className={COLUMN_LINK_CLASS}>
                  {t.apiDocumentation}
                </a>
              </div>
              <div className="flex flex-col gap-0.5 md:w-[180px]">
                <span className={COLUMN_TITLE_CLASS}>Go Champs</span>
                <a href={links.about} className={COLUMN_LINK_CLASS}>
                  {t.knowGoChamps}
                </a>
                <a href={links.faq} className={COLUMN_LINK_CLASS}>
                  {t.faq}
                </a>
                <a href={links.contact} className={COLUMN_LINK_CLASS}>
                  {t.contactUs}
                </a>
                <a href={links.terms} className={COLUMN_LINK_CLASS}>
                  {t.termsBR}
                </a>
                <a href={links.privacy} className={COLUMN_LINK_CLASS}>
                  {t.privacyPolicyBR}
                </a>
              </div>
            </nav>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs leading-normal opacity-80 md:flex-row md:items-start md:justify-between md:text-sm">
            <div className="flex flex-col gap-1">
              <p>
                <strong>Go Champs</strong>
                {`, ${t.with} 💚 ${t.byGoChampsTeam}.`}
              </p>
              <p>
                {t.copyright} &copy; {new Date().getFullYear()}{' '}
                <a className={LEGAL_LINK_CLASS} href="https://go-champs.com">
                  Go Champs Tecnologia LTDA
                </a>
                {` ${t.andContributors}. ${t.allRightsReserved}.`}
              </p>
            </div>
            <div className="flex flex-col gap-1 md:items-end md:text-right">
              <p>
                {`${t.theSourceCodeIsLicensed} `}
                <a className={LEGAL_LINK_CLASS} href={LICENSE_URL}>
                  MIT
                </a>
              </p>
              {buildNumber && (
                <p className="text-xs opacity-70">
                  Build: <em className="font-semibold not-italic">{buildNumber}</em>
                </p>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
