import React, { Fragment, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form, FormRenderProps } from 'react-final-form';
import { FormApi } from 'final-form';
import Helmet from 'react-helmet';
import { Trans } from 'react-i18next';
import { StoreState } from '../store';
import {
  deleteAccountIdentity,
  postAccountIdentity,
  putAccountIdentity,
  requestAccountIdentity
} from '../AccountIdentities/effects';
import {
  accountIdentity,
  accountIdentityLoading,
  deletingAccountIdentity,
  savingAccountIdentity
} from '../AccountIdentities/selectors';
import {
  AccountIdentityFormValues,
  AccountIdentityModifiedFields
} from '../AccountIdentities/dataMappers';
import {
  default as AccountIdentityForm,
  FormLoading
} from '../AccountIdentities/Form';
import ComponentLoader from '../Shared/UI/ComponentLoader';

const mapStateToProps = (state: StoreState) => ({
  isDeleting: deletingAccountIdentity(state.accountIdentity),
  isLoading: accountIdentityLoading(state.accountIdentity),
  isSaving: savingAccountIdentity(state.accountIdentity),
  accountIdentity: accountIdentity(state.accountIdentity)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteAccountIdentity,
      postAccountIdentity,
      putAccountIdentity,
      requestAccountIdentity
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type AccountIdentityEditProps = ConnectedProps<typeof connector>;

function AccountIdentityEdit({
  accountIdentity,
  deleteAccountIdentity,
  isDeleting,
  isLoading,
  isSaving,
  postAccountIdentity,
  putAccountIdentity,
  requestAccountIdentity
}: AccountIdentityEditProps): React.ReactElement {
  useEffect(() => {
    requestAccountIdentity();
  }, [requestAccountIdentity]);

  const exists = Boolean(accountIdentity.id);
  const backUrl = '/Account';

  const initialValues: AccountIdentityFormValues = {
    fullLegalName: accountIdentity.fullLegalName,
    taxId: '',
    governmentId: '',
    dateOfBirth: accountIdentity.dateOfBirth
  };

  const handleSubmit = (
    formValues: AccountIdentityFormValues,
    form: FormApi<AccountIdentityFormValues, AccountIdentityFormValues>
  ) => {
    const modified = (form.getState().modified ||
      {}) as AccountIdentityModifiedFields;

    return exists
      ? putAccountIdentity(formValues, modified)
      : postAccountIdentity(formValues, modified);
  };

  const handleDelete = () => deleteAccountIdentity();

  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>identity</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <ComponentLoader canRender={!isLoading} loader={<FormLoading />}>
            <Form
              onSubmit={handleSubmit}
              initialValues={initialValues}
              render={(props: FormRenderProps<AccountIdentityFormValues>) => (
                <AccountIdentityForm
                  {...props}
                  backUrl={backUrl}
                  exists={exists}
                  isLoading={isSaving}
                  isDeleting={isDeleting}
                  taxIdLast4={accountIdentity.taxIdLast4}
                  governmentIdLast4={accountIdentity.governmentIdLast4}
                  onDelete={handleDelete}
                />
              )}
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs | Identity</title>
      </Helmet>
    </Fragment>
  );
}

export default connector(AccountIdentityEdit);
