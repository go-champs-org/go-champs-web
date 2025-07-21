import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import LoadingButton from '../Shared/UI/LoadingButton';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import {
  Field,
  FieldRenderProps,
  Form,
  FormRenderProps
} from 'react-final-form';
import { CoachEntity, DEFAULT_COACH } from './state';
import './CoachingStaffTable.scss';
import StringInput from '../Shared/UI/Form/StringInput';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';

function CoachRow({
  coach,
  removeCoach,
  updateCoach,
  coachTypesForSelectInput
}: {
  coach: CoachEntity;
  removeCoach: (coach: CoachEntity) => void;
  updateCoach: (coach: CoachEntity) => void;
  coachTypesForSelectInput: SelectOptionType[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCoach, setEditedCoach] = useState<CoachEntity>(coach);
  const { t } = useTranslation();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCoach({ ...editedCoach, name: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedCoach({ ...editedCoach, type: e.target.value });
  };

  const handleSave = () => {
    updateCoach(editedCoach);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr key={coach.id}>
        <td>
          <input
            className="input"
            type="text"
            value={editedCoach.name}
            onChange={handleNameChange}
          />
        </td>
        <td className="has-text-centered">
          <div className="select">
            <select value={editedCoach.type} onChange={handleTypeChange}>
              {coachTypesForSelectInput.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </td>
        <td className="has-text-centered">
          <p className="buttons is-justify-content-center">
            <button className="button" onClick={handleSave}>
              <span className="icon is-small">
                <i className="fas fa-check-circle" />
              </span>
            </button>

            <button className="button" onClick={() => setIsEditing(false)}>
              <span className="icon is-small">
                <i className="fas fa-times" />
              </span>
            </button>
          </p>
        </td>
      </tr>
    );
  }

  return (
    <tr key={coach.id}>
      <td>{coach.name}</td>
      <td className="has-text-centered">
        {t(`coachTypes.${coach.type}`, { keySeparator: '.' })}
      </td>
      <td className="has-text-centered">
        <p className="buttons is-justify-content-center	">
          <button
            className="button is-small"
            onClick={() => setIsEditing(true)}
          >
            <span className="icon is-small">
              <i className="fas fa-edit" />
            </span>
          </button>
          <DoubleClickButton
            className="button is-small"
            onClick={() => removeCoach(coach)}
          >
            <span className="icon is-small">
              <i className="fas fa-trash" />
            </span>
          </DoubleClickButton>
        </p>
      </td>
    </tr>
  );
}

interface Props {
  isAddingCoach: boolean;
  coaches: CoachEntity[];
  addCoach: (coach: CoachEntity) => void;
  removeCoach: (coach: CoachEntity) => void;
  updateCoach: (coach: CoachEntity) => void;
  coachTypesForSelectInput: SelectOptionType[];
}

function CoachingStaffTable({
  addCoach,
  removeCoach,
  updateCoach,
  isAddingCoach,
  coaches,
  coachTypesForSelectInput
}: Props) {
  return (
    <div>
      <div className="table-container">
        <table className="table is-fullwidth is-narrow">
          <thead>
            <tr>
              <th>
                <Trans>fullName</Trans>
              </th>
              <th className="has-text-centered">
                <Trans>role</Trans>
              </th>
              <th className="has-text-centered">
                <Trans>actions</Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            {coaches.map(coach => (
              <CoachRow
                key={coach.id}
                coach={coach}
                removeCoach={removeCoach}
                updateCoach={updateCoach}
                coachTypesForSelectInput={coachTypesForSelectInput}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="new-coach">
        <Form
          onSubmit={async (values, form) => {
            await addCoach(values);
            form.restart();
          }}
          initialValues={DEFAULT_COACH}
          render={({
            handleSubmit,
            submitting,
            pristine,
            valid
          }: FormRenderProps<CoachEntity>) => (
            <form onSubmit={handleSubmit} className="form">
              <h2 className="subtitle">
                <Trans>newCoach</Trans>
              </h2>

              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <label className="label">
                      <Trans>fullName</Trans>
                    </label>

                    <p className="control is-expanded">
                      <Field name="name" component={StringInput} />
                    </p>
                  </div>

                  <div className="field">
                    <label className="label">
                      <Trans>role</Trans>
                    </label>

                    <div className="control is-expanded">
                      <Field
                        name="type"
                        render={(
                          props: FieldRenderProps<string, HTMLSelectElement>
                        ) => (
                          <SelectInput
                            {...props}
                            options={coachTypesForSelectInput}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <LoadingButton
                isLoading={isAddingCoach}
                className="button is-primary"
                type="submit"
                disabled={submitting || pristine || !valid}
              >
                <Trans>save</Trans>
              </LoadingButton>
            </form>
          )}
        ></Form>
      </div>
    </div>
  );
}
export default CoachingStaffTable;
