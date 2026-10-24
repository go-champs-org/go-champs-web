import React from 'react';
import { Trans } from 'react-i18next';

// "Li e aceito os Termos de Uso e a Política de Privacidade", each document
// opening in a new tab so the form or card underneath keeps its state.
function LegalAcceptanceLabel({ htmlFor }: { htmlFor: string }) {
  return (
    <label htmlFor={htmlFor}>
      <Trans i18nKey="legalAcceptanceAgree">
        Li e aceito os
        <a href="/TermsBR" target="_blank" rel="noopener noreferrer">
          Termos de Uso
        </a>
        e a
        <a href="/PrivacyPolicyBR" target="_blank" rel="noopener noreferrer">
          Política de Privacidade
        </a>
      </Trans>
    </label>
  );
}

export default LegalAcceptanceLabel;
