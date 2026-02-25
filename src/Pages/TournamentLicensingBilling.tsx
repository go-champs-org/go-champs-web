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
import planHttpClient from '../Plans/planHttpClient';
import billingContractHttpClient from '../BillingContracts/billingContractHttpClient';
import AdminMenu from '../Tournaments/AdminMenu';
import Helmet from 'react-helmet';
import {
  ApiBillingAgreement,
  ApiBillingContract,
  ApiPlan
} from '../Shared/httpClient/apiTypes';
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
  const [billingContract, setBillingContract] = useState<ApiBillingContract>({
    content: '',
    slug: ''
  });
  const [plans, setPlans] = useState<ApiPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const backUrl = `/${organizationSlug}/${tournamentSlug}/Edit`;

  useEffect(() => {
    const fetchData = async () => {
      if (!tournament.id || !tournament.sportSlug) return;

      try {
        // Fetch all required data in parallel
        const [agreements, contracts, sportPlans] = await Promise.all([
          tournamentHttpClient.getBillingAgreement(tournament.id),
          billingContractHttpClient.getAll(),
          planHttpClient.getByFilter({ sport_slug: tournament.sportSlug })
        ]);

        setExistingAgreement(
          agreements && agreements.length > 0 ? agreements[0] : null
        );
        setBillingContract(
          contracts && contracts.length > 0
            ? contracts[0]
            : { content: '', slug: '' }
        );
        setPlans(sportPlans || []);
      } catch (error) {
        console.error('Error fetching billing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (tournament.id && tournament.sportSlug) {
      fetchData();
    }
  }, [tournament.id, tournament.sportSlug]);

  const onSubmit = async (values: BillingFormData) => {
    if (!values.acceptedTerms) {
      return { acceptedTerms: 'You must accept the terms and conditions' };
    }

    setIsSubmitting(true);

    try {
      const billingData: ApiBillingAgreement = {
        plan_slug: values.plan_slug || 'premium-monthly',
        selected_campaign_slugs: values.selected_campaign_slugs || [],
        due_day: values.due_day || 1,
        signed_at: new Date().toISOString(),
        billing_contract_slug: billingContract.slug || 'standard-terms-v2',
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
                initialValues={{
                  acceptedTerms: false,
                  selected_campaign_slugs: []
                }}
                render={(props: FormRenderProps<BillingFormData>) => (
                  <BillingAgreementForm
                    {...props}
                    backUrl={backUrl}
                    isSubmitting={isSubmitting}
                    showSuccess={showSuccess}
                    billingContract={billingContract}
                    plans={plans}
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
