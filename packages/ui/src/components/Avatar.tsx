import { RemoteImage } from './RemoteImage';
import { initials } from '../utils/initials';

export interface AvatarProps {
  name: string;
  logoUrl: string;
  size: number;
  className?: string;
}

// An organization or team with no logo falls back to a circle of its own
// initials, the same fallback both the sidebar and the tournament card need.
export function Avatar({ name, logoUrl, size, className = '' }: AvatarProps) {
  return logoUrl ? (
    <RemoteImage
      src={logoUrl}
      alt={name}
      width={size}
      height={size}
      className={`rounded-full border-4 border-[#a6cd63] object-cover ${className}`}
    />
  ) : (
    <div
      style={{ width: size, height: size }}
      className={`flex flex-shrink-0 items-center justify-center rounded-full border-4 border-[#a6cd63] bg-primary text-foreground ${className}`}
    >
      {initials(name)}
    </div>
  );
}
