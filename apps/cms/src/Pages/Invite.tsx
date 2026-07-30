import React from 'react';
import TeamRosterInvites from './TeamRosterInvites';
import { Route, Switch } from 'react-router-dom';

const Invite: React.FC = () => {
  return (
    <Switch>
      <Route path="/Invite/:inviteId" component={TeamRosterInvites} />
    </Switch>
  );
};

export default Invite;
