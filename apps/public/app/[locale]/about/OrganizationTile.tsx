import Image from 'next/image';
import { publicPath } from '../../../src/i18n/publicPath';

export function OrganizationTile({
  name,
  slug,
  logo,
  className = ''
}: {
  name: string;
  slug: string;
  logo: string;
  className?: string;
}) {
  return (
    <li className={`min-w-0 ${className}`}>
      <a
        href={publicPath(`/${slug}`)}
        title={name}
        className="flex h-[88px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 px-2 text-[0.5625rem] font-extrabold uppercase tracking-[0.03em] text-white transition-colors hover:border-primary"
      >
        <span className="relative block h-10 w-full shrink-0">
          <Image
            src={logo}
            alt=""
            fill
            unoptimized
            sizes="200px"
            className="object-contain"
          />
        </span>
        <span className="line-clamp-1 opacity-80">{name}</span>
      </a>
    </li>
  );
}
