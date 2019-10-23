import React from 'react';
import { List } from '../Tournaments/List';

class Search extends React.Component {
  render() {
    return (
      <div>
        <section className="hero">
          <div className="hero-head">
            <div className="container">
              <h1 className="title">Busca de torneiro</h1>

              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium is-primary"
                    type="text"
                    placeholder="Procure torneios..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-body">
            <List deleteTournament={true} tournaments={[]} url="" />
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
