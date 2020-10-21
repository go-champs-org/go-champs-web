import React, { Fragment } from 'react';
import { StoreState } from '../store';
import { currentPhaseId, phaseLoading } from '../Phases/selectors';
import { tournamentLoading } from '../Tournaments/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import { getPhase } from '../Phases/effects';
import { getGamesByFilter } from '../Games/effects';
import { RouteProps } from './support/routerInterfaces';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import PhaseHome from './PhaseHome';
import Shimmer from '../Shared/UI/Shimmer';
import PhaseManage from './PhaseManage';
import GameList from './GameList';
import GameNew from './GameNew';
import GameEdit from './GameEdit';
import DrawList from './DrawList';
import DrawNew from './DrawNew';
import DrawEdit from './DrawEdit';
import EliminationList from './EliminationList';
import EliminationNew from './EliminationNew';
import EliminationEdit from './EliminationEdit';
import AuthenticatedRoute from '../Accounts/AuthenticatedRoute';
import GameEditAdvanced from './GameEditAdvanced';

export const PhaseHomeLoading: React.FC = () => (
  <Fragment>
    <div className="column is-12">
      <Shimmer>
        <div
          style={{
            height: '13px',
            marginTop: '13px',
            width: '250px'
          }}
        ></div>
      </Shimmer>
    </div>

    <div className="column">
      <div className="columns is-multiline">
        <div className="column is-12">
          <Shimmer>
            <div
              style={{
                height: '150px',
                marginTop: '13px',
                width: '350px'
              }}
            ></div>
          </Shimmer>
        </div>

        <div className="column is-12">
          <Shimmer>
            <div
              style={{
                height: '150px',
                marginTop: '13px',
                width: '350px'
              }}
            ></div>
          </Shimmer>
        </div>
      </div>
    </div>

    <div className="is-divider-vertical is-hidden-tablet-only"></div>

    <aside className="column is-4-desktop is-12-tablet">
      <div className="columns is-multiline">
        <div className="column is-12 has-text-centered">
          <Shimmer>
            <div
              style={{
                height: '13px',
                marginTop: '13px',
                width: '260px'
              }}
            ></div>
          </Shimmer>
        </div>
        <div className="column is-12 has-text-centered">
          <Shimmer>
            <div
              style={{
                height: '150px',
                marginTop: '13px',
                width: '260px'
              }}
            ></div>
          </Shimmer>
        </div>
      </div>
    </aside>
  </Fragment>
);

const mapStateToProps = (state: StoreState) => ({
  currentPhaseId: currentPhaseId(state.phases),
  phaseLoading: phaseLoading(state.phases),
  tournamentLoading: tournamentLoading(state.tournaments)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getGamesByFilter,
      getPhase
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PhaseLoaderProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

const PhaseLoader: React.FC<PhaseLoaderProps> = ({
  currentPhaseId,
  match,
  getGamesByFilter,
  getPhase,
  tournamentLoading
}) => {
  const {
    organizationSlug = '',
    tournamentSlug = '',
    phaseId = ''
  } = match.params;
  const selectedPhaseId = phaseId ? phaseId : currentPhaseId;
  const basePhaseManageUrl = `/${organizationSlug}/${tournamentSlug}/Manage/${selectedPhaseId}`;
  return (
    <ComponentLoader
      canRender={!tournamentLoading}
      loader={<PhaseHomeLoading />}
    >
      <Switch>
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/EditDraw/:drawId`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <DrawEdit
                {...props}
                basePhaseManageUrl={basePhaseManageUrl}
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/EditElimination/:eliminationId`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <EliminationEdit
                {...props}
                basePhaseManageUrl={basePhaseManageUrl}
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/EditGameAdvanced/:gameId`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <GameEditAdvanced {...props} />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/EditGame/:gameId`}
          render={(props: RouteComponentProps<RouteProps>) => (
            <AuthenticatedRoute>
              <GameEdit
                {...props}
                basePhaseManageUrl={basePhaseManageUrl}
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/NewDraw`}
          render={() => (
            <AuthenticatedRoute>
              <DrawNew
                basePhaseManageUrl={basePhaseManageUrl}
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/NewElimination`}
          render={() => (
            <AuthenticatedRoute>
              <EliminationNew
                basePhaseManageUrl={basePhaseManageUrl}
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/NewGame`}
          render={() => (
            <AuthenticatedRoute>
              <GameNew
                basePhaseManageUrl={basePhaseManageUrl}
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/Draws`}
          render={() => (
            <AuthenticatedRoute>
              <DrawList
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/Eliminations`}
          render={() => (
            <AuthenticatedRoute>
              <EliminationList
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId/Games`}
          render={() => (
            <AuthenticatedRoute>
              <GameList
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage/:phaseId`}
          render={() => (
            <AuthenticatedRoute>
              <PhaseManage
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Manage`}
          render={() => (
            <AuthenticatedRoute>
              <PhaseManage
                organizationSlug={organizationSlug}
                phaseId={selectedPhaseId}
                getGamesByFilter={getGamesByFilter}
                getPhase={getPhase}
                tournamentSlug={tournamentSlug}
              />
            </AuthenticatedRoute>
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Phase/:phaseId`}
          render={() => (
            <PhaseHome
              organizationSlug={organizationSlug}
              phaseId={selectedPhaseId}
              getGamesByFilter={getGamesByFilter}
              getPhase={getPhase}
              tournamentSlug={tournamentSlug}
            />
          )}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug`}
          render={() => (
            <PhaseHome
              organizationSlug={organizationSlug}
              phaseId={selectedPhaseId}
              getGamesByFilter={getGamesByFilter}
              getPhase={getPhase}
              tournamentSlug={tournamentSlug}
            />
          )}
        />
      </Switch>
    </ComponentLoader>
  );
};

export default connector(PhaseLoader);
