import React, { Fragment } from 'react';
import List from '../Search/List';
import Helmet from 'react-helmet';

import { Dispatch, bindActionCreators } from 'redux';
import { getAccount } from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import withAccount from './support/withAccount';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAccount
    },
    dispatch
  );

const connector = connect(null, mapDispatchToProps);

type SearchProps = ConnectedProps<typeof connector>;

const Search: React.FC<SearchProps> = () => (
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

export default connector(withAccount(Search));
