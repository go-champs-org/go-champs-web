import type { Ref } from 'react';

export interface RemoteImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
  imgRef?: Ref<HTMLImageElement>;
}

// Team crests, player photos and organization logos live on arbitrary
// user-uploaded hosts: next/image would need each one allow-listed in
// next.config.js, so every remote image on the public site is a plain <img>
// with the same decode treatment instead. Defaults to lazy — a caller
// rendering one above the fold (a page's own hero photo) opts into eager.
export function RemoteImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  onError,
  imgRef
}: RemoteImageProps) {
  return (
    <img
      ref={imgRef}
      onError={onError}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
}
