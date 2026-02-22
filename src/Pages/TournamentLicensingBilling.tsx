import React, { Fragment, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import { tournamentBySlug, tournamentLoading } from '../Tournaments/selectors';
import tournamentHttpClient from '../Tournaments/tournamentHttpClient';
import AdminMenu from '../Tournaments/AdminMenu';
import Helmet from 'react-helmet';
import { ApiBillingAgreement } from '../Shared/httpClient/apiTypes';
import { Form, FormRenderProps } from 'react-final-form';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import BillingAgreementForm, {
  BillingFormData
} from '../Tournaments/BillingAgreementForm';
import ExistingBillingAgreement from '../Tournaments/ExistingBillingAgreement';
import { getCountryCodeFromBrowser } from '../Shared/countryCodeUtils';
import withTournament from './support/withTournament';
import { FormLoading } from '../Tournaments/Form';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { tournamentSlug } = props.match.params;
  return {
    ...props,
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentLoading: tournamentLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TournamentLicensingBillingProps = ConnectedProps<typeof connector>;

const TournamentLicensingBilling: React.FC<TournamentLicensingBillingProps> = ({
  match,
  history,
  tournament,
  tournamentLoading
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const [
    existingAgreement,
    setExistingAgreement
  ] = useState<ApiBillingAgreement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const backUrl = `/${organizationSlug}/${tournamentSlug}/Edit`;

  useEffect(() => {
    const fetchExistingAgreement = async () => {
      if (!tournament.id) return;

      try {
        const agreements = await tournamentHttpClient.getBillingAgreement(
          tournament.id
        );
        setExistingAgreement(
          agreements && agreements.length > 0 ? agreements[0] : null
        );
      } catch (error) {
        console.error('Error fetching billing agreement:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (tournament.id) {
      fetchExistingAgreement();
    }
  }, [tournament.id]);

  const onSubmit = async (values: BillingFormData) => {
    if (!values.acceptedTerms) {
      return { acceptedTerms: 'You must accept the terms and conditions' };
    }

    setIsSubmitting(true);

    try {
      const billingData: ApiBillingAgreement = {
        plan_id: values.plan_id || 'premium-monthly',
        campaign_slug: values.campaign_slug || 'summer-2026',
        due_day: values.due_day || 1,
        signed_at: new Date().toISOString(),
        billing_contract_slug: 'standard-terms-v2',
        country_code: getCountryCodeFromBrowser()
      };

      const result = await tournamentHttpClient.postBillingAgreement(
        tournament.id,
        billingData
      );
      setExistingAgreement(result);
      setShowSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        history.push(backUrl);
      }, 2000);
    } catch (error) {
      console.error('Error submitting billing agreement:', error);
      return {
        _error: 'Failed to submit billing agreement. Please try again.'
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className="column">
        <div className="columns is-multiline">
          <div className="column is-12">
            <h2 className="subtitle">
              <Trans>billingAgreement</Trans>
            </h2>
          </div>

          <ComponentLoader
            canRender={!tournamentLoading && !isLoading}
            loader={<FormLoading />}
          >
            {existingAgreement ? (
              <ExistingBillingAgreement
                agreement={existingAgreement}
                backUrl={backUrl}
              />
            ) : (
              <Form
                onSubmit={onSubmit}
                initialValues={{ acceptedTerms: false }}
                render={(props: FormRenderProps<BillingFormData>) => (
                  <BillingAgreementForm
                    {...props}
                    backUrl={backUrl}
                    isSubmitting={isSubmitting}
                    showSuccess={showSuccess}
                  />
                )}
              />
            )}
          </ComponentLoader>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>

      <Helmet>
        <title>Go Champs | Billing Agreement</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(
  withTournament<TournamentLicensingBillingProps>(TournamentLicensingBilling)
);
