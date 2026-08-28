import type React from 'react';

export interface ProfileBannerProps {
  as?: 'section' | 'div';
  className?: string;
  testId?: string;
  ariaHidden?: boolean;
  children?: React.ReactNode;
}

const BANNER_GRADIENT =
  'bg-[linear-gradient(115deg,#2f4419_0%,#4d6b2c_55%,#7a9949_130%)]';

// Colors are literal, not theme tokens: the banner stays green in both themes.
export function ProfileBanner({
  as: Element = 'section',
  className = '',
  testId,
  ariaHidden,
  children
}: ProfileBannerProps) {
  return (
    <Element
      className={`relative overflow-hidden ${BANNER_GRADIENT} ${className}`}
      data-testid={testId}
      aria-hidden={ariaHidden}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/illustrations/background-accessory.svg')] bg-[length:auto_260%] bg-[position:right_-2rem_center] bg-no-repeat opacity-35 mix-blend-multiply"
      />
      {children}
    </Element>
  );
}
