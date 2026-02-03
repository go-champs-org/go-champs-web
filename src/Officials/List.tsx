import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { OfficialEntity } from './state';
import { AnyAction, Dispatch } from 'redux';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';

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

const OfficialCard: React.FC<{
  deleteOfficial: (
    official: OfficialEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  official: OfficialEntity;
  tournamentSlug: string;
}> = ({ deleteOfficial, organizationSlug, official, tournamentSlug }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`/${organizationSlug}/${tournamentSlug}/EditOfficial/${official.id}`}
      >
        <span className="title is-6">{official.name}</span>
      </Link>

      <div className="card-header-icon">
        <DoubleClickButton
          className="button is-text"
          onClick={() => deleteOfficial(official)}
        >
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  deleteOfficial: (
    official: OfficialEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  officials: OfficialEntity[];
  tournamentSlug: string;
}> = ({ deleteOfficial, organizationSlug, officials, tournamentSlug }) => (
  <div>
    {officials.map((official: OfficialEntity) => (
      <OfficialCard
        key={official.id}
        deleteOfficial={deleteOfficial}
        organizationSlug={organizationSlug}
        official={official}
        tournamentSlug={tournamentSlug}
      />
    ))}
  </div>
);

export default List;
