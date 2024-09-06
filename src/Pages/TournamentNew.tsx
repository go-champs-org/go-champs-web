import React, { Fragment } from 'react';
import arrayMutators from 'final-form-arrays';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { postTournament } from '../Tournaments/effects';
import { default as TournamentForm, FormLoading } from '../Tournaments/Form';
import { Form, FormRenderProps } from 'react-final-form';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import {
  organizationsLoading,
  organizationBySlug
} from '../Organizations/selectors';
import { OrganizationEntity } from '../Organizations/state';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Helmet from 'react-helmet';
import {
  postingTournament,
  tournamentPlayerStatsForSelectInput
} from '../Tournaments/selectors';
import { Trans } from 'react-i18next';
import { Mutator } from 'final-form';
import { SelectOptionType } from '../Shared/UI/Form/Select';

interface StateProps extends RouteComponentProps<RouteProps> {
  isPostingTournament: boolean;
  organization: OrganizationEntity;
  organizationsLoading: boolean;
  selectInputPlayerStats: SelectOptionType[];
}

type DispatchProps = {
  postTournament: (
    organizationId: string,
    tournament: TournamentEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
};

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { organizationSlug } = props.match.params;
  return {
    ...props,
    organization: organizationBySlug(state.organizations, organizationSlug),
    isPostingTournament: postingTournament(state.tournaments),
    organizationsLoading: organizationsLoading(state.organizations),
    selectInputPlayerStats: tournamentPlayerStatsForSelectInput(
      state.tournaments,
      ''
    )
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      postTournament
    },
    dispatch
  );
};

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    postTournament: (tournament: TournamentEntity) =>
      dispatchProps.postTournament(stateProps.organization.id, tournament)
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

type TournamentNewProps = ConnectedProps<typeof connector>;

const TournamentNew: React.FC<TournamentNewProps> = ({
  isPostingTournament,
  match,
  organizationsLoading,
  postTournament,
  selectInputPlayerStats
}) => {
  const { organizationSlug = '' } = match.params;
  const backUrl = `/Organization/${organizationSlug}`;
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>newTournament</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!organizationsLoading}
            loader={<FormLoading />}
          >
            <Form
              onSubmit={postTournament}
              initialValues={DEFAULT_TOURNAMENT}
              mutators={
                (arrayMutators as unknown) as {
                  [key: string]: Mutator<TournamentEntity>;
                }
              }
              render={(props: FormRenderProps<TournamentEntity>) => (
                <TournamentForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPostingTournament}
                  organizationSlug={organizationSlug}
                  push={props.form.mutators.push}
                  selectInputPlayerStats={selectInputPlayerStats}
                />
              )}
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs! | New Tournament</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(TournamentNew);
