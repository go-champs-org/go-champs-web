import React from 'react';
import { TeamEntity } from '../Teams/state';
import Identifier from '../Teams/Indentifier';
import classNames from 'classnames';

const basicTeamClasses = {
  column: true,
  'is-8': true
};

const basicScoreClasses = {
  column: true,
  'is-4': true,
  'has-text-right': true
};

function TeamAndScore({
  team,
  score,
  placeholder = '',
  canDisplayScore = true,
  customTeamClasses = '',
  customScoreClasses = ''
}: {
  team: TeamEntity;
  score: number;
  placeholder?: string;
  canDisplayScore?: boolean;
  customTeamClasses?: string;
  customScoreClasses?: string;
}) {
  const teamClasses = classNames(basicTeamClasses, customTeamClasses);
  const scoreClasses = classNames(basicScoreClasses, customScoreClasses);

  return (
    <div className="columns is-mobile">
      <div className={teamClasses} style={{ padding: '.3rem' }}>
        {team.id ? <Identifier team={team} /> : placeholder}
      </div>

      <div className={scoreClasses} style={{ padding: '.3rem' }}>
        {canDisplayScore && score}
      </div>
    </div>
  );
}

export default TeamAndScore;
