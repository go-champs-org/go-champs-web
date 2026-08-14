import React from 'react';
import { useTranslation } from 'react-i18next';
import './FieldStatusIcon.scss';

export type FieldStatus = 'idle' | 'checking' | 'available';

/**
 * The spinner and the check mark a field shows while it is being validated
 * against the server.
 *
 * Deliberately not a Font Awesome `<i>`: the app loads Font Awesome's SVG with
 * JavaScript build, which replaces every `<i class="fas ...">` with an `<svg>`
 * of its own. React keeps updating the element it created — the one Font
 * Awesome swapped out — so an icon whose class changes at runtime freezes on
 * whatever it rendered first, and the spinner never becomes a check mark.
 */
const FieldStatusIcon: React.FC<{ status: FieldStatus }> = ({ status }) => {
  const { t } = useTranslation();

  if (status === 'idle') {
    return null;
  }

  return (
    <span
      className="field-status-icon"
      data-testid="field-status-icon"
      role="status"
    >
      {/* The shapes carry no meaning of their own: what a screen reader reads
          is the translated text below, announced as the state changes. */}
      <span className="field-status-text">
        {status === 'checking'
          ? t('checkingUsernameAvailability')
          : t('usernameAvailable')}
      </span>

      {status === 'checking' ? (
        <span className="field-status-spinner" aria-hidden="true" />
      ) : (
        <svg className="field-status-check" viewBox="0 0 16 16" aria-hidden>
          <path
            d="M2.5 8.5l3.5 3.5 7.5-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
};

export default FieldStatusIcon;
