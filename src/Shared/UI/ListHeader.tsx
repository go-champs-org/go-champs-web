import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface ListHeaderProps {
  newUrl: string;
  title: string;
  hasFilter?: boolean;
}

const ListHeader: React.FC<ListHeaderProps> = ({ newUrl, title }) => {
  return (
    <Fragment>
      <div className="column is-6">
        <h2 className="subtitle">{title}</h2>
      </div>

      <div className="column is-6 has-text-right">
        <Link className="button is-text" to={newUrl}>
          New
        </Link>
      </div>
    </Fragment>
  );
};

export default ListHeader;
