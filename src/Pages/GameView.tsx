import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { StoreState } from '../store';
import { gameById } from '../Games/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { getGame } from '../Games/effects';
import { connect, ConnectedProps } from 'react-redux';
import withGame from './support/withGame';
import { getTournamentBySlug } from '../Tournaments/effects';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { gameId = '' } = props.match.params;
  return {
    game: gameById(state.games, gameId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getGame,
      getTournamentBySlug
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type GameViewProps = ConnectedProps<typeof connector>;

function GameView({ game }: GameViewProps): React.ReactElement {
  return (
    <div className="column">
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <div className="tile is-child box">
            <div className="columns is-vcentered is-mobile is-multiline">
              <div className="column is-6 has-text-left">
                <small>20/10/2020 10:30:00</small>
              </div>

              <div className="column is-6 has-text-right">
                <small>Petrópolis</small>
              </div>

              <div className="column is-5 has-text-right">
                <h2 className="title">Panteras</h2>
              </div>

              <div className="column is-2 has-text-centered">
                <div className="columns is-vcentered is-gapless">
                  <div className="column is-5">
                    <span className="title">200</span>
                  </div>

                  <div className="column is-2">x</div>

                  <div className="column is-5">
                    <span className="title">200</span>
                  </div>
                </div>
              </div>

              <div className="column is-5 has-text-left">
                <h2 className="title">Titios</h2>
              </div>

              <div className="column is-12 has-text-centered">
                <small>Information</small>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-12 has-text-centered">
          <div className="tabs is-centered">
            <div className="columns is-multiline has-text-left">
              <div className="column is-12">
                <h2 className="subtitle">Panteras</h2>

                <div className="table-container">
                  <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                      <tr>
                        <th style={{ paddingLeft: '0' }}>Player</th>
                        <th>Pontos</th>
                        <th>Rebotes</th>
                        <th>Assistencias</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="column is-12">
                <h2 className="subtitle">Titios</h2>

                <div className="table-container">
                  <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                      <tr>
                        <th style={{ paddingLeft: '0' }}>Player</th>
                        <th>Pontos</th>
                        <th>Rebotes</th>
                        <th>Assistencias</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: '0' }}>Lair</td>
                        <td>20</td>
                        <td>12</td>
                        <td>11</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(withGame<GameViewProps>(GameView));
