import React, { Fragment } from 'react';
import List from '../Search/List';
import Helmet from 'react-helmet';

const Search: React.FC = () => (
  <Fragment>
    <List />

    <Helmet>
      <title>Go Champs! | Search Tournaments</title>

      <meta
        name="description"
        content="Pesquise torneios para ficar informado."
      />
    </Helmet>
  </Fragment>
);

export default Search;
