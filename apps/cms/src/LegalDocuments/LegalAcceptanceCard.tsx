import React, { useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ApiLegalDocument } from '../Shared/httpClient/apiTypes';
import { displayToast } from '../Shared/bulma/toast';
import legalDocumentHttpClient, {
  isLegalDocumentsOutdatedError
} from './legalDocumentHttpClient';
import './LegalAcceptanceCard.scss';

// Asks an account that has not accepted the current Terms of Use and Privacy
// Policy to accept them (GC-347). Shows nothing when there is nothing pending;
// never blocks the rest of the page.
function LegalAcceptanceCard() {
  const { t } = useTranslation();
  const [pending, setPending] = useState<ApiLegalDocument[]>([]);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadPending = useCallback(async () => {
    try {
      setPending(await legalDocumentHttpClient.getPending());
    } catch {
      setPending([]);
    }
  }, []);

  useEffect(() => {
    loadPending();
  }, [loadPending]);

  const handleAccept = async () => {
    setIsSubmitting(true);

    try {
      const stillPending = await legalDocumentHttpClient.accept(
        pending.map(document => document.id)
      );
      setPending(stillPending);
      setHasAgreed(false);
      displayToast(t('legalAcceptanceAccepted'), 'is-success');
    } catch (error) {
      if (isLegalDocumentsOutdatedError(error)) {
        setHasAgreed(false);
        await loadPending();
        displayToast(t('legalAcceptanceOutdated'), 'is-danger');
      } else {
        displayToast(t('legalAcceptanceError'), 'is-danger');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pending.length === 0) {
    return null;
  }

  return (
    <div className="hero is-small legal-acceptance-card slide-fade-content">
      <div className="hero-body">
        <div className="legal-acceptance-content">
          <div className="legal-acceptance-text">
            <p className="is-size-5 legal-acceptance-title">
              <Trans>legalAcceptanceTitle</Trans>
            </p>
            <div className="legal-acceptance-agree">
              <input
                id="legal-acceptance-agree"
                type="checkbox"
                className="is-checkradio"
                checked={hasAgreed}
                disabled={isSubmitting}
                onChange={event => setHasAgreed(event.target.checked)}
              />
              <label htmlFor="legal-acceptance-agree">
                <Trans i18nKey="legalAcceptanceAgree">
                  Li e aceito os
                  <a href="/TermsBR" target="_blank" rel="noopener noreferrer">
                    Termos de Uso
                  </a>
                  e a
                  <a
                    href="/PrivacyPolicyBR"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Política de Privacidade
                  </a>
                </Trans>
              </label>
            </div>
          </div>
          <button
            className={`button is-dark ${isSubmitting ? 'is-loading' : ''}`}
            disabled={!hasAgreed || isSubmitting}
            onClick={handleAccept}
          >
            <Trans>legalAcceptanceAccept</Trans>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LegalAcceptanceCard;
