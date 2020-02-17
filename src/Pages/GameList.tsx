import React, { Fragment } from 'react';
import TopBreadcrumbs from '../Tournaments/Common/TopBreadcrumbs';
import AdminMenu from '../Tournaments/AdminMenu';
import { connect, ConnectedProps } from 'react-redux';
import { phaseByIdOrDefault, sortedPhases } from '../Phases/selectors';
import { StoreState } from '../store';
import withPhase from './support/withPhase';

interface OwnProps {
  organizationSlug: string;
  phaseId: string;
  tournamentSlug: string;
}

const mapStateToProps = (state: StoreState, props: OwnProps) => {
  return {
    games: [],
    phase: phaseByIdOrDefault(state.phases, props.phaseId),
    phases: sortedPhases(state.phases)
  };
};

const connector = connect(mapStateToProps);

type GameListProps = ConnectedProps<typeof connector> & OwnProps;

const GameList: React.FC<GameListProps> = ({
  games,
  phase,
  phases,
  organizationSlug,
  tournamentSlug
}) => {
  return (
    <Fragment>
      <div className="column is-12">
        <TopBreadcrumbs
          organizationSlug={organizationSlug}
          phases={phases}
          tournamentSlug={tournamentSlug}
        />
      </div>

      <div className="column is-12">
        <div className="columns is-multiline">
          <div className="column">Game list</div>

          <div className="is-divider-vertical"></div>

          <aside className="column is-4">
            <AdminMenu
              organizationSlug={organizationSlug}
              tournamentSlug={tournamentSlug}
              phase={phase}
            />
          </aside>
        </div>
      </div>
    </Fragment>
  );
};

export default connector(withPhase<GameListProps>(GameList));
