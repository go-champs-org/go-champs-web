import React from 'react';
import Shimmer from '../Shared/UI/Shimmer';
import { RegistrationEntity } from './state';
import { Link } from 'react-router-dom';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import { AnyAction, Dispatch } from 'redux';

const LoadingCard: React.FC = () => (
  <div className="card item">
    <div className="card-header">
      <div className="card-header-title">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </div>
);

export const ListLoading: React.FC = () => (
  <div>
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </div>
);

const RegistrationCard: React.FC<{
  deleteRegistration: (
    registration: RegistrationEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  registration: RegistrationEntity;
  tournamentSlug: string;
}> = ({
  deleteRegistration,
  organizationSlug,
  registration,
  tournamentSlug
}) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`/${organizationSlug}/${tournamentSlug}/EditRegistration/${registration.id}`}
      >
        <span className="title is-6">{registration.title}</span>
      </Link>

      <div className="card-header-icon">
        <DoubleClickButton
          className="button is-text"
          onClick={() => deleteRegistration(registration)}
        >
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  deleteRegistration: (
    team: RegistrationEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  registrations: RegistrationEntity[];
  tournamentSlug: string;
}> = ({
  deleteRegistration,
  organizationSlug,
  registrations,
  tournamentSlug
}) => (
  <div>
    {registrations.map((registration: RegistrationEntity) => (
      <RegistrationCard
        key={registration.id}
        deleteRegistration={deleteRegistration}
        organizationSlug={organizationSlug}
        registration={registration}
        tournamentSlug={tournamentSlug}
      />
    ))}
  </div>
);

export default List;
