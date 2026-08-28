export interface RemoteImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

// Team crests, player photos and organization logos live on arbitrary
// user-uploaded hosts: next/image would need each one allow-listed in
// next.config.js, so every remote image on the public site is a plain <img>
// with the same lazy-load/decode treatment instead.
export function RemoteImage({ src, alt, width, height, className = '' }: RemoteImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
