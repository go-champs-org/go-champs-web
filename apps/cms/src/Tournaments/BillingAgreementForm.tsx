import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Field, FieldRenderProps, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import LoadingButton from '../Shared/UI/LoadingButton';
import MarkdownContent from '../Shared/UI/MarkdownContent';
import Select from '../Shared/UI/Form/Select';
import { useTranslatedSelectOptions } from '../Shared/hooks/useTranslatedSelectOptions';
import { ApiBillingContract, ApiPlan } from '../Shared/httpClient/apiTypes';
import { parseAmount, formatCurrency } from '../Shared/currencyUtils';
import { plansForSelectInput } from '../Plans/selectors';
import planHttpClient from '../Plans/planHttpClient';
import './BillingAgreementForm.scss';
import CheckboxInput from '../Shared/UI/Form/CheckboxInput';
import { required } from '../Shared/UI/Form/Validators/commonValidators';

export interface BillingFormData {
  acceptedTerms: boolean;
  isTrial: boolean;
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
  onTrialToggle: (isTrial: boolean) => void;
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
  plans = [],
  onTrialToggle
}: BillingAgreementFormProps): React.ReactElement {
  const { t } = useTranslation();
  const [campaignInputs, setCampaignInputs] = useState<string[]>(['']);
  const [campaignValidations, setCampaignValidations] = useState<
    Record<string, { valid: boolean; amount: number; name?: string }>
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
      const validations: Record<
        string,
        { valid: boolean; amount: number; name?: string }
      > = {};

      try {
        const validationPromises = campaignSlugs
          .filter(slug => slug.trim() !== '')
          .map(async slug => {
            try {
              const result = await planHttpClient.validateCampaign(
                planSlug,
                slug.trim()
              );
              validations[slug] = {
                valid: result.valid,
                amount: parseAmount(result.campaign.amount),
                name: result.campaign.name
              };
            } catch (error) {
              console.error(`Error validating campaign ${slug}:`, error);
              validations[slug] = { valid: false, amount: 0 };
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
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }

      validationTimeoutRef.current = setTimeout(() => {
        validateCampaignSlugs(planSlug, campaignSlugs);
      }, 500);
    },
    [validateCampaignSlugs]
  );

  const updateCampaignInputs = useCallback(
    (newInputs: string[]) => {
      setCampaignInputs(newInputs);
      const validCampaigns = newInputs.filter(slug => slug.trim() !== '');
      values.selected_campaign_slugs = validCampaigns;

      if (!values.isTrial && values.plan_slug && validCampaigns.length > 0) {
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
    if (!values.isTrial && values.plan_slug && campaignInputs.length > 0) {
      const validCampaigns = campaignInputs.filter(slug => slug.trim() !== '');
      if (validCampaigns.length > 0) {
        debouncedValidation(values.plan_slug, validCampaigns);
      }
    }
  }, [values.plan_slug, debouncedValidation, campaignInputs, values.isTrial]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, []);

  // Re-fetch plans when isTrial changes; cancel pending validation and clear
  // stale campaign validation state when trial is enabled.
  useEffect(() => {
    if (values.isTrial) {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
        validationTimeoutRef.current = null;
      }
      setCampaignValidations({});
    }
    onTrialToggle(values.isTrial);
  }, [values.isTrial]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check if all campaigns are valid (always true when trial is enabled)
  const allCampaignsValid = useMemo(() => {
    if (values.isTrial) return true;
    const validCampaigns = campaignInputs.filter(slug => slug.trim() !== '');
    if (validCampaigns.length === 0) return true;
    return validCampaigns.every(
      slug =>
        campaignValidations[slug] && campaignValidations[slug].valid === true
    );
  }, [values.isTrial, campaignInputs, campaignValidations]);

  // Calculate total campaign discount (always 0 when trial is enabled)
  const totalCampaignDiscount = useMemo(() => {
    if (values.isTrial) return 0;
    const validCampaigns = campaignInputs.filter(slug => slug.trim() !== '');
    return validCampaigns.reduce((total, slug) => {
      const campaign = campaignValidations[slug];
      return total + (campaign && campaign.valid ? campaign.amount || 0 : 0);
    }, 0);
  }, [values.isTrial, campaignInputs, campaignValidations]);

  // Final price is always 0 when trial is enabled
  const finalPricePerGame = useMemo(() => {
    if (values.isTrial) return 0;
    if (!selectedPlan) return 0;
    const planAmount = parseAmount(selectedPlan.amount);
    return Math.max(0, planAmount - totalCampaignDiscount);
  }, [values.isTrial, selectedPlan, totalCampaignDiscount]);

  return (
    <div className="column is-12">
      {showSuccess && (
        <div className="notification is-success">
          <Trans>useAgreementAcceptedSuccessfully</Trans>
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
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>

        {/* Trial checkbox */}
        <div className="field">
          <div className="control">
            <Field
              name="isTrial"
              type="checkbox"
              render={(props: FieldRenderProps<string, HTMLInputElement>) => (
                <CheckboxInput {...props} id="isTrial" />
              )}
            />

            <label className="label" htmlFor="isTrial">
              <Trans>isTrialTournament</Trans>
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">
            <Trans>plan</Trans>
          </label>
          <div className="control">
            <Field
              name="plan_slug"
              render={(props: FieldRenderProps<string, HTMLSelectElement>) => (
                <Select
                  {...props}
                  options={translatedPlanOptions}
                  isClearable
                />
              )}
            />
          </div>
          {plans.length === 0 && (
            <div className="help is-info">
              <Trans>noPlansAvailable</Trans>
            </div>
          )}
          {selectedPlan && (
            <div className="help is-info">
              <Trans>amountPerGame</Trans>:{' '}
              {values.isTrial
                ? formatCurrency(0, t)
                : formatCurrency(parseAmount(selectedPlan.amount), t)}
              <div className="mt-1">
                {t(`plans.${selectedPlan.slug}.description`, {
                  keySeparator: '.'
                })}
              </div>
            </div>
          )}
        </div>

        {/* Campaigns section — hidden when trial is enabled */}
        {!values.isTrial && (
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
                      campaignValidations[campaignSlug] &&
                      campaignValidations[campaignSlug].valid === false
                        ? 'is-danger'
                        : campaignSlug.trim() &&
                          campaignValidations[campaignSlug] &&
                          campaignValidations[campaignSlug].valid === true
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
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
                <span>
                  <Trans>addCampaign</Trans>
                </span>
              </button>
            </div>
            {!allCampaignsValid && (
              <p className="help is-danger">
                <Trans>someInvalidCampaigns</Trans>
              </p>
            )}
          </div>
        )}

        {selectedPlan && (
          <div className="field">
            <div className="box has-background-light">
              <h4 className="title is-6">
                <Trans>priceBreakdown</Trans>
              </h4>
              <div className="content">
                <div className="is-flex is-justify-content-space-between">
                  <span>
                    <Trans>basePlanPrice</Trans>:
                  </span>
                  <span className="has-text-weight-bold">
                    {values.isTrial
                      ? formatCurrency(0, t)
                      : formatCurrency(parseAmount(selectedPlan.amount), t)}
                  </span>
                </div>
                {!values.isTrial && totalCampaignDiscount > 0 && (
                  <div className="is-flex is-justify-content-space-between">
                    <span>
                      <Trans>totalCampaignDiscounts</Trans>:
                    </span>
                    <span className="has-text-weight-bold has-text-success">
                      - {formatCurrency(totalCampaignDiscount, t)}
                    </span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="is-flex is-justify-content-space-between is-size-5">
                  <span className="has-text-weight-bold">
                    <Trans>finalPricePerGame</Trans>:
                  </span>
                  <span className="has-text-weight-bold">
                    {formatCurrency(finalPricePerGame, t)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="field">
          <div className="control">
            <Field
              name="acceptedTerms"
              type="checkbox"
              render={(props: FieldRenderProps<string, HTMLInputElement>) => (
                <CheckboxInput {...props} id="acceptedTerms" />
              )}
              validate={required}
            />

            <label className="label" htmlFor="acceptedTerms">
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
                (!values.isTrial && isValidatingCampaigns)
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
