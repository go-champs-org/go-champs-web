'use client';

import { useEffect, useRef, useState } from 'react';
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
  loginHref?: string;
  loginLabel?: string;
}

export function NavBar({
  links,
  logoHref = '/',
  logoSrc,
  loginHref,
  loginLabel
}: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav ref={navRef} className="relative bg-neutral-950 px-6 py-4 lg:px-[101px] lg:py-8">
      <div className="flex items-center justify-between">
        <a href={logoHref} className="block shrink-0">
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt="Go Champs" className="h-10 w-auto lg:h-12" />
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
          aria-controls="nav-menu"
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
                className="rounded-xl px-4 py-2.5 text-base font-medium text-white hover:opacity-80"
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
                className="block rounded-2xl bg-primary px-6 py-4 text-base font-medium text-white hover:bg-primary-dark"
              >
                {loginLabel}
              </a>
            </li>
          )}
        </ul>
      </div>

      {isOpen && (
        <ul id="nav-menu-mobile" className="mt-4 flex flex-col gap-2 lg:hidden">
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-xl px-4 py-2.5 text-base font-medium text-white hover:opacity-80"
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
                className="block rounded-2xl bg-primary px-6 py-4 text-center text-base font-medium text-white hover:bg-primary-dark"
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
