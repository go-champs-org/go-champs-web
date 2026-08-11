import { ComponentType } from 'react';
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

type SocialIconProps = { size?: number; className?: string };
const Instagram = FaInstagram as unknown as ComponentType<SocialIconProps>;
const YouTube = FaYoutube as unknown as ComponentType<SocialIconProps>;
const LinkedIn = FaLinkedin as unknown as ComponentType<SocialIconProps>;

export interface FooterTranslations {
  with: string;
  byGoChampsTeam: string;
  theSourceCodeIsLicensed: string;
  privacyPolicyBR: string;
  termsBR: string;
  copyright: string;
  andContributors: string;
  allRightsReserved: string;
  apiDocumentationPrefix: string;
  apiDocumentationSuffix: string;
}

export interface FooterProps {
  t: FooterTranslations;
  privacyHref: string;
  termsHref: string;
  buildNumber?: string;
}

export function Footer({ t, privacyHref, termsHref, buildNumber }: FooterProps) {
  return (
    <footer className="mt-auto bg-background px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 border-t border-border pt-8 text-center md:gap-8 md:pt-16">
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="https://www.instagram.com/gochampsapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:text-primary md:size-10"
          >
            <Instagram size={20} className="md:size-6" />
          </a>
          <a
            href="https://www.youtube.com/@GoChampsApp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:text-primary md:size-10"
          >
            <YouTube size={20} className="md:size-6" />
          </a>
          <a
            href="https://www.linkedin.com/company/go-champs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:text-primary md:size-10"
          >
            <LinkedIn size={20} className="md:size-6" />
          </a>
        </div>

        <div className="text-foreground">
          <p className="mb-2 text-[0.9375rem] font-medium md:text-base">
            <strong>Go Champs</strong>
            {`, ${t.with} 💚 ${t.byGoChampsTeam}.`}
          </p>
          <p className="mb-2 text-[0.8125rem] opacity-90 md:text-sm">
            {`${t.theSourceCodeIsLicensed} `}
            <a
              className="text-primary hover:opacity-80"
              href="https://github.com/lairjr/go-champs-web/blob/master/LICENSE"
            >
              MIT
            </a>
            .
            <a className="text-primary hover:opacity-80" href={privacyHref}>
              {` ${t.privacyPolicyBR}`}
            </a>
            {'. '}
            <a className="text-primary hover:opacity-80" href={termsHref}>
              {t.termsBR}
            </a>
            .
          </p>
          <p className="mb-2 text-[0.9375rem] font-medium md:text-base">
            {t.copyright} &copy; {new Date().getFullYear()}{' '}
            <a
              className="text-primary hover:opacity-80"
              href="https://go-champs.com"
            >
              Go Champs Tecnologia LTDA
            </a>
            {` ${t.andContributors}. ${t.allRightsReserved}.`}
          </p>
          <p className="mb-2 text-[0.9375rem] font-medium md:text-base">
            {`${t.apiDocumentationPrefix} `}
            <a
              className="text-primary hover:opacity-80"
              href="https://api.go-champs.com/docs"
            >
              API
            </a>
            {t.apiDocumentationSuffix ? ` ${t.apiDocumentationSuffix}` : ''}.
          </p>
          {buildNumber && (
            <p className="text-xs opacity-70">
              Build: <em className="font-semibold not-italic">{buildNumber}</em>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
