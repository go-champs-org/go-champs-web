import React, { Fragment } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { OrganizationEntity, DEFAULT_MEMBER, MemberEntity } from './state';
import StringInput from '../Shared/UI/Form/StringInput';
import Shimmer from '../Shared/UI/Shimmer';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import {
  required,
  composeValidators,
  mustBeSlug
} from '../Shared/UI/Form/Validators/commonValidators';
import { FieldArray } from 'react-final-form-arrays';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';

interface OrganizationMemberProps {
  name: string;
  onRemove: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MemberForm: React.FC<OrganizationMemberProps> = ({ name, onRemove }) => {
  return (
    <Fragment>
      <tr>
        <td style={{ paddingLeft: '0' }}>
          <Field
            name={`${name}.username`}
            component={StringInput}
            type="text"
          />
        </td>

        <td
          className="has-text-right"
          style={{ paddingRight: '0', verticalAlign: 'middle' }}
        >
          <DoubleClickButton
            className="button has-tooltip-top"
            onClick={onRemove}
          >
            <i className="fas fa-trash" />
          </DoubleClickButton>
        </td>
      </tr>
    </Fragment>
  );
};

export const FormLoading: React.FC = () => (
  <div className="columns is-multiline">
    <div className="column is-12">
      <label className="label">Name</label>
      <Shimmer>
        <div
          style={{
            height: '13px',
            marginTop: '13px',
            width: '250px'
          }}
        ></div>
      </Shimmer>
    </div>

    <div className="column is-12">
      <label className="label">Slug</label>
      <Shimmer>
        <div
          style={{
            height: '13px',
            marginTop: '13px',
            width: '250px'
          }}
        ></div>
      </Shimmer>
    </div>
  </div>
);

interface FieldArrayActions {
  value: any[];
  remove: (index: number) => void;
  swap: (indexA: number, indexB: number) => void;
}

const onRemoveMember = (items: FieldArrayActions, index: number) => (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  event.preventDefault();
  return items.remove(index);
};

interface FormProps extends FormRenderProps<OrganizationEntity> {
  isLoading: boolean;
  backUrl: string;
  push: (fieldName: string, member: MemberEntity) => {};
}

const Form: React.FC<FormProps> = ({
  isLoading,
  backUrl,
  handleSubmit,
  submitting,
  pristine,
  push,
  values,
  validating,
  valid
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <Field
              name="name"
              component={StringInput}
              type="text"
              placeholder="Name"
              validate={required}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Slug</label>

          <div className="control">
            <Field
              name="slug"
              component={StringInput}
              type="text"
              placeholder="slug"
              validate={composeValidators([required, mustBeSlug])}
            />
          </div>

          <p className="help is-info">
            {`${document.location.origin}/${values.slug ? values.slug : ''}`}
          </p>
        </div>

        <div className="field">
          <FieldArray name="members">
            {({ fields }) => (
              <div className="table-container">
                <table className="table is-fullwidth is-striped is-hoverable">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: '0' }}>Members</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {fields.map((name, index) => (
                      <MemberForm
                        name={name}
                        onRemove={onRemoveMember(fields, index)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </FieldArray>
        </div>

        <div className="columns is-multiline">
          <div className="column is-12">
            <button
              className="button is-fullwidth is-medium"
              type="button"
              onClick={() => push('members', DEFAULT_MEMBER)}
            >
              Add member
            </button>
          </div>

          <div className="column is-12">
            <LoadingButton
              isLoading={isLoading}
              className="button is-primary"
              type="submit"
              disabled={submitting || pristine || !valid || validating}
            >
              Save
            </LoadingButton>
          </div>
        </div>
      </form>

      <Link to={backUrl}>
        <button className="button is-small is-info is-outlined">
          <span className="icon">
            <i className="fas fa-caret-left"></i>
          </span>

          <span>Back</span>
        </button>
      </Link>
    </div>
  );
};

export default Form;
