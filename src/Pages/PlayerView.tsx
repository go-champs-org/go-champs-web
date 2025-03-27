import React from 'react';
import withPlayerStatsLogsForPlayer from './support/withPlayerStatsLogsForPlayer';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../store';
import { tournamentBySlug } from '../Tournaments/selectors';
import { playerById } from '../Players/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { getPlayerStatsLogsByFilter } from '../PlayerStatsLog/effects';
import Banner from '../Players/Banner';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { playerId } = props.match.params;
  const tournament = tournamentBySlug(
    state.tournaments,
    props.match.params.tournamentSlug
  );

  return {
    player: playerById(state.players, state.teams, playerId),
    tournament
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getPlayerStatsLogsByFilter
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PlayerViewProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function PlayerView({ player }: PlayerViewProps) {
  return (
    <div className="column is-12">
      <div className="columns is-multiline">
        <div className="column is-12">
          <Banner player={player} />
        </div>

        <div className="column is-12">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div className="columns">
                  <div className="column">
                    <p className="title is-5">Goals</p>
                    <p className="subtitle is-5">5</p>
                  </div>
                  <div className="column">
                    <p className="title is-5">Assists</p>
                    <p className="subtitle is-5">5</p>
                  </div>
                  <div className="column">
                    <p className="title is-5">Yellow cards</p>
                    <p className="subtitle is-5">5</p>
                  </div>
                  <div className="column">
                    <p className="title is-5">Red cards</p>
                    <p className="subtitle is-5">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12">
          <div className="card">
            <div className="card-content">
              <div className="table-container">
                <table className="table is-fullwidth">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Opponent</th>
                      <th>Goals</th>
                      <th>Assists</th>
                      <th>Yellow cards</th>
                      <th>Red cards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2019-01-01</td>
                      <td>Opponent</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>2019-01-01</td>
                      <td>Opponent</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>2019-01-01</td>
                      <td>Opponent</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>2019-01-01</td>
                      <td>Opponent</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(withPlayerStatsLogsForPlayer(PlayerView));
