import React, { useCallback, useEffect, useState } from 'react';
import { useField } from 'react-final-form';
import { Trans } from 'react-i18next';
import { ApiLegalDocument } from '../Shared/httpClient/apiTypes';
import legalDocumentHttpClient from './legalDocumentHttpClient';
import LegalAcceptanceLabel from './LegalAcceptanceLabel';
import './LegalAcceptanceField.scss';

const OUTDATED = 'legal_documents_outdated';

const mustAccept = (ids: string[] | undefined) =>
  ids && ids.length > 0 ? undefined : 'required';

// The signup's acceptance of the current Terms of Use and Privacy Policy
// (GC-346). Ticking it puts the ids of the current versions in `name`; when the
// API answers that they are no longer current, it loads them again and unticks.
function LegalAcceptanceField({ name }: { name: string }) {
  const [documents, setDocuments] = useState<ApiLegalDocument[]>([]);
  const { input, meta } = useField<string[]>(name, { validate: mustAccept });
  const isOutdated = (meta.submitError || []).includes(OUTDATED);

  const loadDocuments = useCallback(async () => {
    try {
      setDocuments(await legalDocumentHttpClient.getCurrent());
    } catch {
      setDocuments([]);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const { onChange } = input;
  useEffect(() => {
    if (isOutdated) {
      onChange([]);
      loadDocuments();
    }
  }, [isOutdated, onChange, loadDocuments]);

  return (
    <div className="legal-acceptance-field">
      <div className="legal-acceptance-field-agree">
        <input
          id="signup-legal-acceptance"
          type="checkbox"
          className="is-checkradio"
          checked={(input.value || []).length > 0}
          disabled={documents.length === 0}
          onChange={event =>
            onChange(
              event.target.checked ? documents.map(document => document.id) : []
            )
          }
        />
        <LegalAcceptanceLabel htmlFor="signup-legal-acceptance" />
      </div>
      {isOutdated && (
        <p className="legal-acceptance-field-error">
          <Trans>legalAcceptanceOutdated</Trans>
        </p>
      )}
    </div>
  );
}

export default LegalAcceptanceField;
