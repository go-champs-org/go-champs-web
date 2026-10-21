'use client';

import { useState } from 'react';
import { RemoteImage } from './RemoteImage';
import { initials } from '../utils/initials';

export interface AvatarProps {
  name: string;
  logoUrl: string;
  size: number;
  className?: string;
}

// An image that failed before hydration never fires React's onError, so the
// ref callback checks the already-settled state.
export const hasBrokenLoad =(img: HTMLImageElement | null): boolean =>
  img?.complete === true && img.naturalWidth === 0;

// An organization or team with no logo, or one whose image fails to load,
// falls back to a circle of its own initials, the same fallback both the
// sidebar and the tournament card need.
export function Avatar({ name, logoUrl, size, className = '' }: AvatarProps) {
  const [failedUrl, setFailedUrl] = useState('');
  const showLogo = logoUrl !== '' && logoUrl !== failedUrl;
  const markFailed = () => setFailedUrl(logoUrl);

  return showLogo ? (
    <RemoteImage
      src={logoUrl}
      alt={name}
      width={size}
      height={size}
      onError={markFailed}
      imgRef={(img) => {
        hasBrokenLoad(img) && markFailed();
      }}
      className={`shrink-0 object-contain ${className}`}
    />
  ) : (
    <div
      style={{ width: size, height: size }}
      className={`flex flex-shrink-0 items-center justify-center rounded-full border-2 border-accent-text bg-primary text-foreground ${className}`}
    >
      {initials(name)}
    </div>
  );
}
