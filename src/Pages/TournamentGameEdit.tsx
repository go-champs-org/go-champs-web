import React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournamentGame } from '../Tournaments/Games/actions';
import { TournamentGameState } from '../Tournaments/Games/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentGameEditMatchProps extends TournamentHomeMatchProps {
  tournamentGameId: string;
}

interface TournamentGameEditProps
  extends RouteComponentProps<TournamentGameEditMatchProps> {
  tournamentGameState: TournamentGameState;
  patchGame: any;
  requestTournamentGame: any;
}

const GameForm: React.FC = () => (
  <div>
    <div>
      <label>Away team name</label>
      <Field
        name="awayTeamName"
        component="input"
        type="text"
        placeholder="Away team name"
      />
    </div>
    <div>
      <label>Away team score</label>
      <Field
        name="awayScore"
        component="input"
        type="number"
        placeholder="Away team score"
      />
    </div>
    <div>
      <label>Home team name</label>
      <Field
        name="homeTeamName"
        component="input"
        type="text"
        placeholder="Home team name"
      />
    </div>
    <div>
      <label>Home team score</label>
      <Field
        name="homeScore"
        component="input"
        type="number"
        placeholder="Home team score"
      />
    </div>
    <div>
      <label>Location</label>
      <Field
        name="location"
        component="input"
        type="text"
        placeholder="Location"
      />
    </div>
    <div>
      <label>Datetime</label>
      <Field
        name="datetime"
        component="input"
        type="text"
        placeholder="Datetime"
      />
    </div>
  </div>
);

class TournamentGameEdit extends React.Component<TournamentGameEditProps> {
  render() {
    const canRender =
      this.props.tournamentGameState.tournamentGames[
      this.props.match.params.tournamentGameId
      ] && !this.props.tournamentGameState.isLoadingRequestTournamentGame;
    return <div>{canRender ? this.renderForm() : <div>Loading...</div>}</div>;
  }

  renderForm() {
    return (
      <Form
        onSubmit={this.props.patchGame}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <GameForm />
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
          </form>
        )}
      />
    );
  }

  componentDidMount() {
    if (
      !this.props.tournamentGameState.tournamentGames[
      this.props.match.params.tournamentGameId
      ]
    ) {
      this.props.requestTournamentGame(
        this.props.match.params.tournamentGameId
      );
    }
  }
}

const mapStateToProps = (state: any) => ({
  tournamentGameState: state.tournamentGames,
  gameState: state.games
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      requestTournamentGame: requestTournamentGame(tournamentId)
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentGameEdit)
);
