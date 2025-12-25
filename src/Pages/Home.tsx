import React, { Fragment } from 'react';
import List from '../RecentlyViews/List';
import './Home.scss';

const Home: React.FC = () => (
  <Fragment>
    <div className="home-page">
      <List />
    </div>
  </Fragment>
);

export default Home;
