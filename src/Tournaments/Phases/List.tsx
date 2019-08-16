import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import './List.scss';
import { TournamentPhaseEntity, TournamentPhaseState } from './state';

const TournamentPhaseCard: React.FC<{
	onDeleteTournamentPhase: any;
	url: string;
	tournamentPhase: TournamentPhaseEntity;
}> = ({ onDeleteTournamentPhase, url, tournamentPhase }) => (
	<div className="card item">
		<div className="card-header">
			<Link
				className="card-header-title"
				to={`${url}/TournamentPhaseEdit/${tournamentPhase.id}`}
			>
				<span className="title is-6">{tournamentPhase.title}</span>
			</Link>
			<div className="card-header-icon">
				<button
					className="button is-text"
					onClick={() => onDeleteTournamentPhase(tournamentPhase)}
				>
					<i className="fas fa-trash" />
				</button>
			</div>
		</div>
	</div>
);

export const List: React.FC<{
	currentOrganizationSlug: string;
	currentTournamentSlug: string;
	deleteTournamentPhase: any;
	tournamentPhaseState: TournamentPhaseState;
	tournamentState: TournamentState;
}> = ({
	currentOrganizationSlug,
	currentTournamentSlug,
	deleteTournamentPhase,
	tournamentPhaseState,
	tournamentState
}) => {
		const tournament = tournamentState.tournaments[currentTournamentSlug];
		const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
		return (
			<div className="columns is-multiline">
				<header className="column is-12">
					<NavBar
						organizationSlug={currentOrganizationSlug}
						tournament={tournament}
						tournamentSlug={currentTournamentSlug}
					/>
				</header>
				<div className="column is-8">
					<div className="columns is-mobile is-vcentered">
						<div className="column is-8">
							<h2 className="subtitle">Phases</h2>
						</div>
						<div className="column is-4 has-text-right">
							<Link className="button" to={`./TournamentPhaseNew`}>
								New phase
            </Link>
						</div>
					</div>
					{Object.keys(tournamentPhaseState.tournamentPhases).map(
						(key: string) => (
							<TournamentPhaseCard
								key={key}
								url={baseTournamentUrl}
								tournamentPhase={tournamentPhaseState.tournamentPhases[key]}
								onDeleteTournamentPhase={deleteTournamentPhase}
							/>
						)
					)}
				</div>
			</div>
		);
	};

export const Wrapper: React.FC<{
	deleteTournamentPhase: any;
	currentOrganizationSlug: string;
	currentTournamentSlug: string;
	tournamentState: TournamentState;
	tournamentPhaseState: TournamentPhaseState;
}> = ({
	currentOrganizationSlug,
	currentTournamentSlug,
	deleteTournamentPhase,
	tournamentState,
	tournamentPhaseState
}) => {
		return (
			<List
				currentOrganizationSlug={currentOrganizationSlug}
				currentTournamentSlug={currentTournamentSlug}
				deleteTournamentPhase={deleteTournamentPhase}
				tournamentState={tournamentState}
				tournamentPhaseState={tournamentPhaseState}
			/>
		);
	};

export default Wrapper;
