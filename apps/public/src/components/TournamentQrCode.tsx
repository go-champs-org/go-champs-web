'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { FaQrcode } from 'react-icons/fa6';

export interface TournamentQrCodeProps {
  // The tournament's shareable path, without a locale prefix: the edge routes
  // /:org/:tournament here, and that is the address people pass around.
  path: string;
  openLabel: string;
  closeLabel: string;
  caption: string;
  scanLabel: string;
}

// Built from the host being viewed rather than a configured site URL, so the
// code a visitor scans points back at the environment they are on.
const shareUrl = (path: string): string =>
  typeof window === 'undefined' ? path : `${window.location.origin}${path}`;

export function TournamentQrCode({
  path,
  openLabel,
  closeLabel,
  caption,
  scanLabel
}: TournamentQrCodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const value = shareUrl(path);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={openLabel}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary-dark transition-colors hover:bg-primary/10"
      >
        <FaQrcode aria-hidden="true" className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-lg bg-surface p-6 text-center">
            <h2 className="text-lg font-extrabold text-foreground">{caption}</h2>

            <div className="rounded bg-white p-3">
              <QRCode
                value={value}
                size={180}
                data-testid="tournament-qr-code"
                data-value={value}
              />
            </div>

            <p className="text-sm text-muted">{scanLabel}</p>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-primary-dark hover:bg-primary/10"
            >
              {closeLabel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
