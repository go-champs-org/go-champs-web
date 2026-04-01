import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Trans } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getTournamentBySlug,
  getBillingAgreement
} from '../Tournaments/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  tournamentBySlug,
  tournamentLoading,
  billingAgreementByTournamentSlug,
  billingAgreementLoading
} from '../Tournaments/selectors';
import tournamentHttpClient from '../Tournaments/tournamentHttpClient';
import planHttpClient from '../Plans/planHttpClient';
import billingContractHttpClient from '../BillingContracts/billingContractHttpClient';
import AdminMenu from '../Tournaments/AdminMenu';
import Helmet from 'react-helmet';
import {
  ApiBillingAgreement,
  ApiBillingAgreementRequestData,
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
    tournamentLoading: tournamentLoading(state.tournaments),
    existingAgreement: billingAgreementByTournamentSlug(
      state.tournaments,
      tournamentSlug
    ),
    billingAgreementLoading: billingAgreementLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getTournamentBySlug,
      getBillingAgreement
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TournamentLicensingBillingProps = ConnectedProps<typeof connector>;

function TournamentLicensingBilling({
  match,
  history,
  tournament,
  tournamentLoading,
  existingAgreement,
  billingAgreementLoading,
  getBillingAgreement
}: TournamentLicensingBillingProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  const [billingContract, setBillingContract] = useState<ApiBillingContract>({
    content: '',
    slug: ''
  });
  const [plans, setPlans] = useState<ApiPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const backUrl = `/${organizationSlug}/${tournamentSlug}/Edit`;

  const fetchPlans = useCallback(
    async (sportSlug: string, supportsTrials: boolean): Promise<ApiPlan[]> => {
      const sportPlans = await planHttpClient.getByFilter({
        sport_slug: sportSlug,
        ...(supportsTrials ? { supports_trials: true } : {})
      });
      const result = sportPlans || [];
      setPlans(result);
      return result;
    },
    []
  );

  const handleTrialToggle = useCallback(
    async (isTrial: boolean, change: (field: string, value: any) => void) => {
      if (tournament.sportSlug) {
        try {
          const fetchedPlans = await fetchPlans(tournament.sportSlug, isTrial);
          if (fetchedPlans.length > 0) {
            if (isTrial) {
              change('plan_slug', fetchedPlans[0].slug);
            } else {
              // When disabling trial, ensure the selected plan is valid for non-trial plans
              change('plan_slug', fetchedPlans[0].slug);
            }
          }
        } catch (error) {
          console.error('Error re-fetching plans for trial toggle:', error);
        }
      }
    },
    [tournament.sportSlug, fetchPlans]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!tournament.id) return;

      try {
        const contracts = await billingContractHttpClient.getAll();

        setBillingContract(
          contracts && contracts.length > 0
            ? contracts[0]
            : { content: '', slug: '' }
        );

        if (tournament.sportSlug) {
          await fetchPlans(tournament.sportSlug, false);
        } else {
          setPlans([]);
        }
      } catch (error) {
        console.error('Error fetching billing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (tournament.id) {
      fetchData();
    }
  }, [tournament.id, tournament.sportSlug, fetchPlans]);

  const onSubmit = async (values: BillingFormData) => {
    if (!values.acceptedTerms) {
      return { acceptedTerms: 'You must accept the terms and conditions' };
    }

    setIsSubmitting(true);

    try {
      const billingData: ApiBillingAgreementRequestData = {
        plan_slug: values.plan_slug || 'premium-monthly',
        selected_campaign_slugs: values.isTrial
          ? []
          : values.selected_campaign_slugs || [],
        due_day: values.due_day || 1,
        signed_at: new Date().toISOString(),
        billing_contract_slug: billingContract.slug || 'standard-terms-v2',
        country_code: getCountryCodeFromBrowser(),
        trial_enabled: values.isTrial
      };

      await tournamentHttpClient.postBillingAgreement(
        tournament.id,
        billingData
      );

      await getBillingAgreement(tournament.id);

      setShowSuccess(true);

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
              <Trans>useAgreement</Trans>
            </h2>
          </div>

          <ComponentLoader
            canRender={
              !tournamentLoading && !billingAgreementLoading && !isLoading
            }
            loader={<FormLoading />}
          >
            {existingAgreement ? (
              <ExistingBillingAgreement
                agreement={existingAgreement}
                backUrl={backUrl}
                billingContract={billingContract}
              />
            ) : (
              <Form
                onSubmit={onSubmit}
                initialValues={{
                  acceptedTerms: false,
                  isTrial: false,
                  selected_campaign_slugs: []
                }}
                keepDirtyOnReinitialize
                render={(props: FormRenderProps<BillingFormData>) => (
                  <BillingAgreementForm
                    {...props}
                    backUrl={backUrl}
                    isSubmitting={isSubmitting}
                    showSuccess={showSuccess}
                    billingContract={billingContract}
                    plans={plans}
                    onTrialToggle={isTrial =>
                      handleTrialToggle(isTrial, props.form.change)
                    }
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
}

export default connector(
  withTournament<TournamentLicensingBillingProps>(TournamentLicensingBilling)
);
