import React, { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Trans } from 'react-i18next';
import './ConsentInput.scss';

export interface ConsentInputProps
  extends FieldRenderProps<string, HTMLInputElement> {
  id: string;
  fileUrl: string;
}

function ConsentInput({ id, input, fileUrl }: ConsentInputProps) {
  const [hasClickedOnDocument, setHasClickedOnDocument] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(0);

  const handleAgree = () => {
    setHasAgreed(1);
    input.onChange(!!!hasAgreed);
  };

  return (
    <>
      <div className="has-text-centered">
        <a
          className="consent-link"
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setHasClickedOnDocument(true)}
        >
          <Trans>consentInputViewDocument</Trans>
        </a>
      </div>
      <div className="has-text-centered">
        <input
          id={id}
          type="checkbox"
          className="is-checkradio"
          disabled={!hasClickedOnDocument}
          value={hasAgreed}
          onChange={handleAgree}
        />
        <label htmlFor={id} className="is-size-7">
          <Trans>consentInputAgree</Trans>
        </label>
      </div>
    </>
  );
}

export default ConsentInput;
