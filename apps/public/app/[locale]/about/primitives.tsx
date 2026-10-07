import type { ReactNode } from 'react';
import Image from 'next/image';

export type Translate = (key: string) => string;

const CONTAINER_CLASS =
  'mx-auto w-full max-w-[calc(var(--content-max-width)+2.5rem)] px-5 md:max-w-[calc(var(--content-max-width)+4rem)] md:px-8';

const TONES = {
  default: 'bg-background text-foreground',
  alt: 'bg-surface-alt text-foreground',
  dark: 'bg-navbar text-white'
} as const;

export function Container({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${CONTAINER_CLASS} ${className}`}>{children}</div>;
}

export function Section({
  tone = 'default',
  id,
  className = '',
  children
}: {
  tone?: keyof typeof TONES;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${TONES[tone]} py-16 md:py-24 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  className = 'text-accent-text'
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`block text-[0.8125rem] font-extrabold uppercase leading-tight tracking-[0.14em] md:text-base ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  inverted = false
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  inverted?: boolean;
}) {
  return (
    <div className="mb-10 flex max-w-[800px] flex-col gap-4">
      <Eyebrow className={inverted ? 'text-primary' : 'text-accent-text'}>
        {eyebrow}
      </Eyebrow>
      <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.02em] md:text-[2.875rem]">
        {title}
      </h2>
      {description && (
        <p className="text-[1.0625rem] leading-normal text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

export function Photo({
  src,
  sizes,
  priority = false,
  className = ''
}: {
  src: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[20px] ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

export function ArrowButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-navbar px-6 py-4 text-base font-medium tracking-[0.01em] text-white transition-all hover:-translate-y-px hover:opacity-90 md:w-[292px]"
    >
      {label}
      <Image
        src="/about/arrow-outward.svg"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
      />
    </a>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items.map(item => (
        <li
          key={item}
          className="flex items-start gap-3 text-[0.9375rem] font-medium leading-[1.45]"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background">
            <Image
              src="/about/check.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export const CARD_CLASS =
  'flex flex-col overflow-hidden rounded-[20px] border border-border bg-surface';
