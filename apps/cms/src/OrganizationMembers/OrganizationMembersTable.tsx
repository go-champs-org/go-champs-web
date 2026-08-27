import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Field,
  FieldRenderProps,
  Form,
  FormRenderProps
} from 'react-final-form';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import LoadingButton from '../Shared/UI/LoadingButton';
import SelectInput, { SelectOptionType } from '../Shared/UI/Form/Select';
import StringInput from '../Shared/UI/Form/StringInput';
import StandaloneSelect from '../Shared/UI/Form/StandaloneSelect';
import './OrganizationMembersTable.scss';
import {
  DEFAULT_ORGANIZATION_MEMBER,
  OrganizationMemberEntity,
  OrganizationMemberRole
} from './state';

function OrganizationMemberRow({
  organizationMember,
  removeOrganizationMember,
  updateOrganizationMember,
  rolesForSelectInput
}: {
  organizationMember: OrganizationMemberEntity;
  removeOrganizationMember: (
    organizationMember: OrganizationMemberEntity
  ) => void;
  updateOrganizationMember: (
    organizationMember: OrganizationMemberEntity
  ) => void;
  rolesForSelectInput: SelectOptionType[];
}) {
  const handleRoleChange = (role: string) => {
    updateOrganizationMember({
      ...organizationMember,
      role: role as OrganizationMemberRole
    });
  };

  return (
    <tr>
      <td>{organizationMember.username}</td>
      <td className="has-text-centered">
        <StandaloneSelect
          value={organizationMember.role}
          options={rolesForSelectInput}
          onChange={handleRoleChange}
        />
      </td>
      <td className="has-text-centered">
        <DoubleClickButton
          className="button is-small"
          onClick={() => removeOrganizationMember(organizationMember)}
        >
          <span className="icon is-small">
            <i className="fas fa-trash" />
          </span>
        </DoubleClickButton>
      </td>
    </tr>
  );
}

interface Props {
  isAddingOrganizationMember: boolean;
  organizationMembers: OrganizationMemberEntity[];
  addOrganizationMember: (
    organizationMember: OrganizationMemberEntity
  ) => Promise<string | undefined>;
  removeOrganizationMember: (
    organizationMember: OrganizationMemberEntity
  ) => void;
  updateOrganizationMember: (
    organizationMember: OrganizationMemberEntity
  ) => void;
}

function OrganizationMembersTable({
  isAddingOrganizationMember,
  organizationMembers,
  addOrganizationMember,
  removeOrganizationMember,
  updateOrganizationMember
}: Props) {
  const { t } = useTranslation();
  const [usernameError, setUsernameError] = useState<string | undefined>(
    undefined
  );

  const rolesForSelectInput: SelectOptionType[] = [
    {
      value: OrganizationMemberRole.GAME_OPERATOR,
      label: t('gameOperator')
    },
    {
      value: OrganizationMemberRole.OWNER,
      label: t('owner')
    }
  ];

  return (
    <div>
      <div className="table-container">
        <table className="table is-fullwidth is-narrow organization-members-table">
          <thead>
            <tr>
              <th>
                <Trans>username</Trans>
              </th>
              <th className="has-text-centered">
                <Trans>role</Trans>
              </th>
              <th className="has-text-centered">
                <Trans>revoke</Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            {organizationMembers.map(organizationMember => (
              <OrganizationMemberRow
                key={organizationMember.id}
                organizationMember={organizationMember}
                removeOrganizationMember={removeOrganizationMember}
                updateOrganizationMember={updateOrganizationMember}
                rolesForSelectInput={rolesForSelectInput}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="new-organization-member">
        <Form
          onSubmit={async (values, form) => {
            const error = await addOrganizationMember(values);
            setUsernameError(error);

            if (!error) {
              form.restart();
            }
          }}
          initialValues={DEFAULT_ORGANIZATION_MEMBER}
          render={({
            handleSubmit,
            submitting,
            pristine,
            valid
          }: FormRenderProps<OrganizationMemberEntity>) => (
            <form onSubmit={handleSubmit}>
              <div className="columns is-multiline">
                <div className="column is-12">
                  <div className="field">
                    <label className="label">
                      <Trans>username</Trans>
                    </label>

                    <p className="control is-expanded">
                      <Field name="username" component={StringInput} />
                    </p>

                    {usernameError && (
                      <p className="help is-danger">{usernameError}</p>
                    )}
                  </div>

                  <div className="field">
                    <label className="label">
                      <Trans>role</Trans>
                    </label>

                    <div className="control is-expanded">
                      <Field
                        name="role"
                        render={(
                          props: FieldRenderProps<string, HTMLSelectElement>
                        ) => (
                          <SelectInput
                            {...props}
                            options={rolesForSelectInput}
                            placeholder={t('selectRole')}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <LoadingButton
                isLoading={isAddingOrganizationMember}
                className="button is-primary"
                type="submit"
                disabled={submitting || pristine || !valid}
              >
                <Trans>addMember</Trans>
              </LoadingButton>
            </form>
          )}
        ></Form>
      </div>
    </div>
  );
}

export default OrganizationMembersTable;
