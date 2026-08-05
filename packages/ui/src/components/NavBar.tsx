export interface NavLink {
  href: string;
  label: string;
}

export interface NavBarProps {
  links: NavLink[];
  logoHref?: string;
}

export function NavBar({ links, logoHref = '/' }: NavBarProps) {
  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <a href={logoHref} className="text-lg font-bold text-primary">
        Go Champs
      </a>
      <ul className="flex gap-6">
        {links.map(link => (
          <li key={link.href}>
            <a href={link.href} className="text-neutral-500 hover:text-primary">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
