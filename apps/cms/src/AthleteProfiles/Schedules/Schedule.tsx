import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../../store';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import ScheduleView from '../../Shared/Schedules/Schedule';
import {
  scheduleDates,
  scheduleGamesByDate,
  scheduleHasError,
  scheduleLoading
} from '../../Shared/Schedules/selectors';
import { requestSchedule } from './effects';

const mapStateToProps = (state: StoreState) => ({
  dates: scheduleDates(state.athleteProfiles.schedules),
  gamesByDate: scheduleGamesByDate(state.athleteProfiles.schedules),
  hasError: scheduleHasError(state.athleteProfiles.schedules),
  isLoading: scheduleLoading(state.athleteProfiles.schedules)
});

// Typed as a thunk dispatch so the effect's promise survives: the calendar
// waits for a response before jumping to the newly loaded day.
const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, undefined, AnyAction>
) => ({
  requestSchedule: (where: RequestFilter): Promise<void> =>
    dispatch(requestSchedule(where))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

interface ScheduleOwnProps {
  hasLinkedTournaments: boolean;
}

type ScheduleProps = ConnectedProps<typeof connector> & ScheduleOwnProps;

function Schedule(props: ScheduleProps) {
  return (
    <ScheduleView
      {...props}
      notLinkedMessageKey="notPlayingInTournamentsYet"
      sectionTitleClassName="title is-5 athlete-profile-page__section-title"
    />
  );
}

export default connector(Schedule);
