import React from 'react';
import Banner from '../Teams/Banner';
import { tournamentBySlug } from '../Tournaments/selectors';
import { teamById } from '../Teams/selectors';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { getGamesByFilter } from '../Games/effects';
import withTeam from './support/withTeam';
import { gameDates, gamesByDate, gamesLoading } from '../Games/selectors';
import ListByDate from '../Games/ListByDate';
import { Trans } from 'react-i18next';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { teamId } = props.match.params;
  const tournament = tournamentBySlug(
    state.tournaments,
    props.match.params.tournamentSlug
  );

  return {
    gamesByDate: gamesByDate(state.games),
    gamesLoading: gamesLoading(state.games),
    gameDates: gameDates(state.games),
    team: teamById(state.teams, teamId),
    tournament
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getGamesByFilter
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TeamViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function TeamView({ team, gameDates, gamesByDate, match }: TeamViewProps) {
  const organizationSlug = match.params.organizationSlug;
  const tournamentSlug = match.params.tournamentSlug;
  const baseUrl = `/${organizationSlug}/${tournamentSlug}`;
  return (
    <div className="column is-12">
      <div className="columns is-multiline">
        <div className="column is-12">
          <Banner team={team} />
        </div>

        {gameDates.length > 0 && (
          <div className="column is-12">
            <h2 className="title is-4">
              <Trans>games</Trans>
            </h2>
          </div>
        )}

        <div className="column is-12">
          <ListByDate
            gamesByDate={gamesByDate}
            dates={gameDates}
            baseUrl={baseUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default connector(withTeam(TeamView));
