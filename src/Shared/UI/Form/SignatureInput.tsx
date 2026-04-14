import React, { useRef, useEffect } from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';
import SignatureCanvas from 'react-signature-canvas';
import { Trans } from 'react-i18next';

interface SignatureInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  allowClear?: boolean;
}

function SignatureInput({
  input,
  meta,
  className,
  allowClear = true
}: SignatureInputProps) {
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const lastLoadedValue = useRef<string>('');

  // Load existing signature when component mounts or value changes
  useEffect(() => {
    // Only load if the value is different from what we last loaded
    // This prevents re-loading the same signature after drawing
    if (input.value !== lastLoadedValue.current && signatureRef.current) {
      if (input.value) {
        signatureRef.current.fromDataURL(input.value);
        lastLoadedValue.current = input.value;
      } else {
        signatureRef.current.clear();
        lastLoadedValue.current = '';
      }
    }
  }, [input.value]);

  const handleEnd = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.getTrimmedCanvas().toDataURL();
      lastLoadedValue.current = dataUrl;
      input.onChange(dataUrl);
    }
  };

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      lastLoadedValue.current = '';
      input.onChange('');
    }
  };

  return (
    <MetaInput
      className={className}
      component={inputMetaClasses => (
        <div>
          <div
            style={{
              border: '1px solid #dbdbdb',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            <SignatureCanvas
              ref={signatureRef}
              penColor="blue"
              canvasProps={{
                width: 400,
                height: 200,
                className: inputMetaClasses
              }}
              onEnd={handleEnd}
            />
          </div>
          {allowClear && (
            <div style={{ marginTop: '0.5rem' }}>
              <button
                type="button"
                className="button is-small is-light"
                onClick={handleClear}
              >
                <Trans>clear</Trans>
              </button>
            </div>
          )}
        </div>
      )}
      meta={meta}
    />
  );
}

export default SignatureInput;
