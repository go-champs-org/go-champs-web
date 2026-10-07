'use client';

import { useState, type ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavBarAccount {
  href: string;
  label: string;
}

export interface NavBarProps {
  links: NavLink[];
  logoHref?: string;
  logoSrc?: string;
  logoSrcMobile?: string;
  loginHref?: string;
  loginLabel?: string;
  account?: NavBarAccount;
  localeSwitcher?: ReactNode;
}

// Same width rule as the Footer and the page sections, so every edge lines up
// with the content column.
const CONTAINER_CLASS =
  'mx-auto flex h-full max-w-[calc(var(--content-max-width,1200px)+2.5rem)] items-center justify-between gap-4 px-5 lg:max-w-[calc(var(--content-max-width,1200px)+4rem)] lg:gap-3 lg:px-8';

const BURGER_BAR_CLASS =
  'block h-0.5 w-full rounded-sm bg-white transition-all duration-300';

const LOGO_CLASS = 'h-10 w-auto lg:h-[72px]';

const resolveAuthLink = ({
  account,
  loginHref,
  loginLabel
}: Pick<NavBarProps, 'account' | 'loginHref' | 'loginLabel'>) => {
  if (account) return account;
  if (loginHref && loginLabel) return { href: loginHref, label: loginLabel };
  return undefined;
};

function LogoImage({
  logoSrc,
  logoSrcMobile
}: Pick<NavBarProps, 'logoSrc' | 'logoSrcMobile'>) {
  if (!logoSrc) {
    return <span className="text-lg font-bold text-primary">Go Champs</span>;
  }

  if (!logoSrcMobile) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logoSrc} alt="Go Champs" className={LOGO_CLASS} />;
  }

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={logoSrc} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrcMobile} alt="Go Champs" className={LOGO_CLASS} />
    </picture>
  );
}

// Sits in the always-visible header, so a long handle must shrink and
// truncate instead of pushing the menu button off a narrow screen.
function AuthLink({ link }: { link: NavBarAccount }) {
  return (
    <a
      href={link.href}
      className="inline-flex h-11 min-w-0 max-w-[10rem] items-center rounded-lg bg-primary px-4 text-base font-bold text-neutral-900 transition-all hover:-translate-y-px hover:opacity-90 sm:max-w-none lg:h-auto lg:px-6 lg:py-2 lg:text-[0.9375rem] lg:font-semibold"
    >
      <span className="truncate">{link.label}</span>
    </a>
  );
}

const barClass = (isOpen: boolean, openClass: string) =>
  `${BURGER_BAR_CLASS} ${isOpen ? openClass : ''}`;

function BurgerButton({
  isOpen,
  onToggle
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex size-11 shrink-0 cursor-pointer flex-col justify-center gap-1 rounded-lg border border-white/20 px-3 lg:hidden"
      aria-label="menu"
      aria-expanded={isOpen}
      aria-controls="nav-menu-mobile"
    >
      <span className={barClass(isOpen, 'translate-y-1.5 rotate-45')} />
      <span className={barClass(isOpen, 'opacity-0')} />
      <span className={barClass(isOpen, '-translate-y-1.5 -rotate-45')} />
    </button>
  );
}

function DesktopMenu({
  links,
  localeSwitcher
}: Pick<NavBarProps, 'links' | 'localeSwitcher'>) {
  return (
    <ul id="nav-menu" className="hidden items-center gap-12 lg:flex">
      <li>
        <ul className="flex items-center gap-7">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap text-[0.9375rem] font-medium text-white transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </li>
      <li className="flex items-center gap-3">
        {localeSwitcher}
        <ThemeToggle />
      </li>
    </ul>
  );
}

function MobileMenu({
  links,
  localeSwitcher
}: Pick<NavBarProps, 'links' | 'localeSwitcher'>) {
  return (
    <div
      id="nav-menu-mobile"
      className="absolute inset-x-0 top-full flex flex-col gap-5 bg-navbar p-5 shadow-[0_4px_20px_var(--shadow-strong)] lg:hidden"
    >
      <ul className="flex flex-col">
        {links.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className="block border-b border-white/10 py-3 text-base font-medium text-white hover:text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        {localeSwitcher}
        <ThemeToggle />
      </div>
    </div>
  );
}

export function NavBar({
  links,
  logoHref = '/',
  logoSrc,
  logoSrcMobile,
  loginHref,
  loginLabel,
  account,
  localeSwitcher
}: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const authLink = resolveAuthLink({ account, loginHref, loginLabel });

  return (
    <nav className="sticky top-0 z-50 h-[var(--navbar-height)] bg-navbar">
      <div className={CONTAINER_CLASS}>
        <a
          href={logoHref}
          className="block shrink-0 transition-opacity hover:opacity-90 lg:mr-auto"
        >
          <LogoImage logoSrc={logoSrc} logoSrcMobile={logoSrcMobile} />
        </a>

        <DesktopMenu links={links} localeSwitcher={localeSwitcher} />

        <div className="flex min-w-0 items-center gap-2">
          {authLink && <AuthLink link={authLink} />}
          <BurgerButton
            isOpen={isOpen}
            onToggle={() => setIsOpen(open => !open)}
          />
        </div>
      </div>

      {isOpen && <MobileMenu links={links} localeSwitcher={localeSwitcher} />}
    </nav>
  );
}
