import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Field, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import BehindFeatureFlag from '../Shared/UI/BehindFeatureFlag';
import LoadingButton from '../Shared/UI/LoadingButton';
import MarkdownContent from '../Shared/UI/MarkdownContent';
import Select from '../Shared/UI/Form/Select';
import { useTranslatedSelectOptions } from '../Shared/hooks/useTranslatedSelectOptions';
import { ApiBillingContract, ApiPlan } from '../Shared/httpClient/apiTypes';
import { plansForSelectInput } from '../Plans/selectors';
import planHttpClient from '../Plans/planHttpClient';

export interface BillingFormData {
  acceptedTerms: boolean;
  plan_slug?: string;
  selected_campaign_slugs?: string[];
  due_day?: number;
}

interface BillingAgreementFormProps extends FormRenderProps<BillingFormData> {
  backUrl: string;
  isSubmitting: boolean;
  showSuccess: boolean;
  billingContract?: ApiBillingContract;
  plans?: ApiPlan[];
}

function BillingAgreementForm({
  backUrl,
  isSubmitting,
  showSuccess,
  handleSubmit,
  values,
  errors,
  submitFailed,
  submitError,
  billingContract,
  plans = []
}: BillingAgreementFormProps): React.ReactElement {
  const { t } = useTranslation();
  const [campaignInputs, setCampaignInputs] = useState<string[]>(['']);
  const [campaignValidations, setCampaignValidations] = useState<
    Record<string, boolean>
  >({});
  const [isValidatingCampaigns, setIsValidatingCampaigns] = useState(false);
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get translated select options for plans
  const translatedPlanOptions = useTranslatedSelectOptions(
    plansForSelectInput(plans),
    'plans'
  );

  // Find selected plan for amount display
  const selectedPlan = useMemo(
    () => plans.find(plan => plan.slug === values.plan_slug),
    [plans, values.plan_slug]
  );

  // Validate campaign slugs when plan or campaigns change
  const validateCampaignSlugs = useCallback(
    async (planSlug: string, campaignSlugs: string[]) => {
      if (!planSlug || campaignSlugs.length === 0) {
        setCampaignValidations({});
        return;
      }

      setIsValidatingCampaigns(true);
      const validations: Record<string, boolean> = {};

      try {
        const validationPromises = campaignSlugs
          .filter(slug => slug.trim() !== '')
          .map(async slug => {
            try {
              const result = await planHttpClient.validateCampaign(
                planSlug,
                slug.trim()
              );
              validations[slug] = result.valid;
            } catch (error) {
              console.error(`Error validating campaign ${slug}:`, error);
              validations[slug] = false;
            }
          });

        await Promise.all(validationPromises);
        setCampaignValidations(validations);
      } catch (error) {
        console.error('Error validating campaigns:', error);
      } finally {
        setIsValidatingCampaigns(false);
      }
    },
    []
  );

  // Debounced validation function
  const debouncedValidation = useCallback(
    (planSlug: string, campaignSlugs: string[]) => {
      // Clear previous timeout
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }

      // Set new timeout
      validationTimeoutRef.current = setTimeout(() => {
        validateCampaignSlugs(planSlug, campaignSlugs);
      }, 500); // Wait 500ms after user stops typing
    },
    [validateCampaignSlugs]
  );

  const updateCampaignInputs = useCallback(
    (newInputs: string[]) => {
      setCampaignInputs(newInputs);
      // Update form values
      const validCampaigns = newInputs.filter(slug => slug.trim() !== '');
      values.selected_campaign_slugs = validCampaigns;

      // Validate if plan is selected (debounced)
      if (values.plan_slug && validCampaigns.length > 0) {
        debouncedValidation(values.plan_slug, validCampaigns);
      }
    },
    [values, debouncedValidation]
  );

  const addCampaignInput = useCallback(() => {
    const newInputs = [...campaignInputs, ''];
    updateCampaignInputs(newInputs);
  }, [campaignInputs, updateCampaignInputs]);

  const removeCampaignInput = useCallback(
    (index: number) => {
      if (campaignInputs.length > 1) {
        const newInputs = campaignInputs.filter((_, i) => i !== index);
        updateCampaignInputs(newInputs);
      }
    },
    [campaignInputs, updateCampaignInputs]
  );

  const updateCampaignInput = useCallback(
    (index: number, value: string) => {
      const newInputs = [...campaignInputs];
      newInputs[index] = value;
      updateCampaignInputs(newInputs);
    },
    [campaignInputs, updateCampaignInputs]
  );

  // Validate campaigns when plan changes
  useEffect(() => {
    if (values.plan_slug && campaignInputs.length > 0) {
      const validCampaigns = campaignInputs.filter(slug => slug.trim() !== '');
      if (validCampaigns.length > 0) {
        debouncedValidation(values.plan_slug, validCampaigns);
      }
    }
  }, [values.plan_slug, debouncedValidation]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, []);

  // Check if all campaigns are valid
  const allCampaignsValid = useMemo(() => {
    const validCampaigns = campaignInputs.filter(slug => slug.trim() !== '');
    if (validCampaigns.length === 0) return true; // No campaigns is valid
    return validCampaigns.every(slug => campaignValidations[slug] === true);
  }, [campaignInputs, campaignValidations]);
  return (
    <div className="column is-12">
      {showSuccess && (
        <div className="notification is-success">
          <Trans>billingAgreementAcceptedSuccessfully</Trans>
          <br />
          <Trans>redirectingToTournamentEdit</Trans>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          className="box"
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            marginBottom: '1rem'
          }}
        >
          {billingContract && billingContract.content ? (
            <MarkdownContent
              content={billingContract.content}
              className="content"
            />
          ) : (
            <div className="content">
              <p>Loading billing terms...</p>
            </div>
          )}
        </div>

        <BehindFeatureFlag>
          <div className="field">
            <label className="label">
              <Trans>plan</Trans>
            </label>
            <div className="control">
              <Field
                name="plan_slug"
                component={Select}
                options={translatedPlanOptions}
                isClearable
              />
            </div>
            {selectedPlan && (
              <div className="help is-info">
                <Trans>amountPerGame</Trans>: {selectedPlan.amount}
                <div className="mt-1">
                  {t(`plans.${selectedPlan.slug}.description`, {
                    keySeparator: '.'
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="field">
            <label className="label">
              <Trans>campaigns</Trans>
            </label>
            {campaignInputs.map((campaignSlug, index) => (
              <div key={index} className="field has-addons mb-2">
                <div className="control is-expanded">
                  <input
                    className={`input ${
                      campaignSlug.trim() &&
                      campaignValidations[campaignSlug] === false
                        ? 'is-danger'
                        : campaignSlug.trim() &&
                          campaignValidations[campaignSlug] === true
                        ? 'is-success'
                        : ''
                    }`}
                    type="text"
                    placeholder="e.g., summer-2026"
                    value={campaignSlug}
                    onChange={e => updateCampaignInput(index, e.target.value)}
                  />
                  {campaignSlug.trim() && isValidatingCampaigns && (
                    <span className="icon is-small is-right">
                      <i className="fas fa-spinner fa-pulse"></i>
                    </span>
                  )}
                </div>
                <div className="control">
                  {campaignInputs.length > 1 && (
                    <button
                      type="button"
                      className="button is-danger"
                      onClick={() => removeCampaignInput(index)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="field">
              <button
                type="button"
                className="button is-small is-light"
                onClick={addCampaignInput}
              >
                <i className="fas fa-plus mr-1"></i>
                <Trans>addCampaign</Trans>
              </button>
            </div>
            {!allCampaignsValid && (
              <p className="help is-danger">
                <Trans>someInvalidCampaigns</Trans>
              </p>
            )}
          </div>

          <div className="field">
            <label className="label">
              <Trans>dueDay</Trans>
            </label>
            <div className="control">
              <Field
                name="due_day"
                component="input"
                type="number"
                className="input"
                min="1"
                max="31"
              />
            </div>
          </div>
        </BehindFeatureFlag>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <Field name="acceptedTerms" component="input" type="checkbox" />{' '}
              <Trans>iAcceptTheTermsAndConditions</Trans>
            </label>
            {errors && errors.acceptedTerms && submitFailed && (
              <p className="help is-danger">{errors.acceptedTerms}</p>
            )}
          </div>
        </div>

        {submitError && (
          <div className="notification is-danger">{submitError}</div>
        )}

        <div className="field is-grouped">
          <div className="control">
            <LoadingButton
              isLoading={isSubmitting || showSuccess}
              className="button is-primary"
              disabled={
                !values.acceptedTerms ||
                isSubmitting ||
                showSuccess ||
                !allCampaignsValid ||
                isValidatingCampaigns
              }
            >
              <Trans>acceptAndSubmit</Trans>
            </LoadingButton>
          </div>
          <div className="control">
            <Link to={backUrl} className="button is-light">
              <Trans>cancel</Trans>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BillingAgreementForm;
