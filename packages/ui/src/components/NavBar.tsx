'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';

export interface NavLink {
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
}

export function NavBar({
  links,
  logoHref = '/',
  logoSrc,
  logoSrcMobile,
  loginHref,
  loginLabel
}: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-navbar px-6 py-4 shadow-[0_2px_8px_var(--shadow-elevated)] lg:px-[101px] lg:py-8">
      <div className="flex items-center justify-between">
        <a href={logoHref} className="block shrink-0">
          {logoSrc && logoSrcMobile ? (
            <picture>
              <source media="(min-width: 1024px)" srcSet={logoSrc} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrcMobile} alt="Go Champs" className="h-[34px] w-auto lg:h-[72px]" />
            </picture>
          ) : logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt="Go Champs" className="h-[34px] w-auto lg:h-[72px]" />
          ) : (
            <span className="text-lg font-bold text-primary">Go Champs</span>
          )}
        </a>

        <button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          className="flex size-10 items-center justify-center text-white lg:hidden"
          aria-label="menu"
          aria-expanded={isOpen}
          aria-controls="nav-menu-mobile"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        <ul
          id="nav-menu"
          className="hidden items-center gap-2 lg:flex lg:gap-7"
        >
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-white hover:opacity-80 lg:text-[0.9375rem]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li aria-hidden="true">
            <span className="block h-6 w-px bg-white/30" />
          </li>
          <li>
            <ThemeToggle />
          </li>
          {loginHref && loginLabel && (
            <li>
              <a
                href={loginHref}
                className="block rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark lg:px-6 lg:text-[0.9375rem]"
              >
                {loginLabel}
              </a>
            </li>
          )}
        </ul>
      </div>

      {isOpen && (
        <ul id="nav-menu-mobile" className="mt-4 flex flex-col gap-2 bg-navbar p-6 shadow-[0_4px_20px_var(--shadow-strong)] lg:hidden">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white hover:opacity-80 lg:text-[0.9375rem]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex items-center justify-between px-4 py-2.5">
            <ThemeToggle />
          </li>
          {loginHref && loginLabel && (
            <li>
              <a
                href={loginHref}
                className="block rounded-lg bg-primary px-5 py-2 text-center text-sm font-semibold text-white hover:bg-primary-dark lg:px-6 lg:text-[0.9375rem]"
              >
                {loginLabel}
              </a>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
