const VISIBLE_CLASS_NAME =
  'inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary/10';

// `inline-flex` would override the `hidden` attribute, so visibility is a class.
export const manageButtonClassName = (isMember: boolean): string =>
  isMember ? VISIBLE_CLASS_NAME : 'hidden';
