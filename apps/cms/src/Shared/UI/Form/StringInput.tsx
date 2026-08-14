import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import MetaInput from './MetaInput';
import FieldStatusIcon, { FieldStatus } from './FieldStatusIcon';

export type InputStatus = FieldStatus;

interface StringInputProps extends FieldRenderProps<string, HTMLElement> {
  className?: string;
  disabled?: boolean;
  status?: InputStatus;
}

const StringInput: React.FunctionComponent<StringInputProps> = ({
  input,
  meta,
  className,
  disabled = false,
  status = 'idle'
}) => {
  const hasStatusIcon = status !== 'idle';

  return (
    <MetaInput
      className={className}
      component={inputMetaClasses => (
        <div className={`control${hasStatusIcon ? ' has-icons-right' : ''}`}>
          <input
            className={`input ${inputMetaClasses}`}
            type="text"
            {...input}
            disabled={disabled}
          />

          {hasStatusIcon && (
            <span className="icon is-small is-right">
              <FieldStatusIcon status={status} />
            </span>
          )}
        </div>
      )}
      meta={meta}
    />
  );
};

export default StringInput;
