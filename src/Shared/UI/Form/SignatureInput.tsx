import React, { useRef, useEffect } from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';

// @ts-ignore
import SignatureCanvas from 'react-signature-canvas';

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
  const signatureRef = useRef<any>(null);

  // Load existing signature when component mounts or value changes
  useEffect(() => {
    if (input.value && signatureRef.current) {
      signatureRef.current.fromDataURL(input.value);
    }
  }, [input.value]);

  const handleEnd = () => {
    if (signatureRef.current) {
      const dataUrl = signatureRef.current.toDataURL();
      input.onChange(dataUrl);
    }
  };

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
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
                Clear
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
