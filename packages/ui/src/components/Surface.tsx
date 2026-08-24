import type React from 'react';

export type SurfaceElement = 'div' | 'section' | 'article' | 'header' | 'aside';

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
  // The panel is a visual shell, not a landmark: pages pick the element that
  // matches their outline so the surface never flattens the document.
  as?: SurfaceElement;
}

// The one raised block of the public site — every card, panel and banner is
// this, so the border and background live here instead of being retyped per
// page.
const SURFACE_CLASSES = 'rounded-xl border border-border bg-surface';

export function Surface({
  as: Element = 'div',
  className = '',
  children,
  ...rest
}: SurfaceProps) {
  return (
    <Element className={`${SURFACE_CLASSES} ${className}`.trim()} {...rest}>
      {children}
    </Element>
  );
}
