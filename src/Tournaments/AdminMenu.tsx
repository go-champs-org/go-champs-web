import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity, PhaseTypes } from '../Phases/state';
import { Trans } from 'react-i18next';
import phaseHttpClient from '../Phases/phaseHttpClient';

interface AdminMenuProps {
  organizationSlug: string;
  phase?: PhaseEntity;
  tournamentSlug: string;
}

interface AdminPhaseMenuProps {
  organizationSlug: string;
  phase: PhaseEntity;
  tournamentSlug: string;
}

const AdminPhaseMenu: React.FC<AdminPhaseMenuProps> = ({
  organizationSlug,
  phase,
  tournamentSlug
}) => {
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluate = async () => {
    try {
      setIsEvaluating(true);
      await phaseHttpClient.postEvaluate(phase.id);
    } catch (error) {
      console.error('Error evaluating phase:', error);
    } finally {
      setIsEvaluating(false);
    }
  };
  const DrawMenu = (
    <Fragment>
      <p className="menu-label">
        <Trans>roundsMenuTitle</Trans>
      </p>

      <ul className="menu-list">
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}/Games`}
          >
            <Trans>games</Trans>
          </Link>
        </li>
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}/Draws`}
          >
            <Trans>rounds</Trans>
          </Link>
        </li>
        <li>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              handleEvaluate();
            }}
            style={{
              cursor: isEvaluating ? 'not-allowed' : 'pointer',
              opacity: isEvaluating ? 0.6 : 1
            }}
          >
            <Trans>evaluatePhase</Trans>
            {isEvaluating && (
              <span className="icon is-small is-right">
                <i className="fas fa-spinner fa-spin"></i>
              </span>
            )}
          </a>
        </li>
      </ul>
    </Fragment>
  );

  const EliminationMenu = (
    <Fragment>
      <p className="menu-label">
        <Trans>groupStandingsMenuTitle</Trans>
      </p>

      <ul className="menu-list">
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}/Games`}
          >
            <Trans>games</Trans>
          </Link>
        </li>
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}/Eliminations`}
          >
            <Trans>groupStandings</Trans>
          </Link>
        </li>
        <li>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              handleEvaluate();
            }}
            style={{
              cursor: isEvaluating ? 'not-allowed' : 'pointer',
              opacity: isEvaluating ? 0.6 : 1
            }}
          >
            <Trans>evaluatePhase</Trans>
            {isEvaluating && (
              <span className="icon is-small is-right">
                <i className="fas fa-spinner fa-spin"></i>
              </span>
            )}
          </a>
        </li>
      </ul>
    </Fragment>
  );
  return (
    <Fragment>
      {phase.type === PhaseTypes.draw ? DrawMenu : EliminationMenu}
    </Fragment>
  );
};

const AdminMenu: React.FC<AdminMenuProps> = ({
  organizationSlug,
  phase,
  tournamentSlug
}) => {
  const PhaseMenu = phase ? (
    <AdminPhaseMenu
      organizationSlug={organizationSlug}
      phase={phase}
      tournamentSlug={tournamentSlug}
    />
  ) : (
    <div></div>
  );
  return (
    <aside className="menu">
      <p className="menu-label">
        <Trans>general</Trans>
      </p>

      <ul className="menu-list">
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Edit`}>
            <Trans>informations</Trans>
          </Link>
        </li>
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Phases`}>
            <Trans>phases</Trans>
          </Link>
        </li>
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Teams`}>
            <Trans>teams</Trans>
          </Link>
        </li>
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Players`}>
            <Trans>players</Trans>
          </Link>
        </li>
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Officials`}>
            <Trans>officials</Trans>
          </Link>
        </li>
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Registrations`}>
            <Trans>registrations</Trans>
          </Link>
        </li>
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/FixedPlayerStatsTables`}
          >
            <Trans>fixedPlayerStatsTables</Trans>
          </Link>
        </li>
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/ScoreboardSettings`}
          >
            <Trans>scoreboardSettings</Trans>
          </Link>
        </li>
      </ul>
      {PhaseMenu}
    </aside>
  );
};

export default AdminMenu;
