import React from 'react';
import { Field } from 'react-final-form';
import { Trans } from 'react-i18next';
import StringInput from '../Shared/UI/Form/StringInput';
import LoadingButton from '../Shared/UI/LoadingButton';

const TeamRosterInviteResponseForm = () => {
  return (
    <div>
      <form className="form">
        <div className="field">
          <label className="label">
            <Trans>name</Trans>
          </label>

          <div className="control">
            <Field name="name" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>email</Trans>
          </label>

          <div className="control">
            <Field name="email" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>shirtName</Trans>
          </label>

          <div className="control">
            <Field name="shirtName" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>shirtNumber</Trans>
          </label>

          <div className="control">
            <Field name="shirtNumber" component={StringInput} />
          </div>
        </div>

        <div className="field">
          <label className="label">Instagram</label>
          <div className="control">
            <Field
              name="instagram"
              component={StringInput}
              type="text"
              placeholder="www.instagram.com/your-tournament"
            />
          </div>

          {/* <p className="help is-info">
                        {`https://www.instagram.com/${values.instagram ? values.instagram : ''
                            }`}
                    </p> */}
        </div>

        <LoadingButton
          isLoading={false}
          className="button is-primary"
          type="submit"
          //   disabled={submitting || pristine}
        >
          <Trans>save</Trans>
        </LoadingButton>
      </form>
    </div>
  );
};

export default TeamRosterInviteResponseForm;
