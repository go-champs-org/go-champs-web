import React from 'react';
import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';

const Result: React.FC<{ tournament: ApiTournamentWithDependecies }> = ({
  tournament
}) => <div>{JSON.stringify(tournament)}</div>;

export default Result;
