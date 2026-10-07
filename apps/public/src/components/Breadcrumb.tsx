import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  currentLabel: string;
}

function BreadcrumbLink({ label, href }: BreadcrumbItem) {
  return (
    <>
      <li>
        <Link href={href} className="hover:text-primary-dark">
          {label}
        </Link>
      </li>
      <li aria-hidden="true">/</li>
    </>
  );
}

export function Breadcrumb({ items, currentLabel }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map(item => (
          <BreadcrumbLink key={`${item.href}-${item.label}`} {...item} />
        ))}
        <li className="font-semibold text-primary-dark" aria-current="page">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}
