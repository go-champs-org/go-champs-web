import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <div>
        <section className="hero">
          <div className="hero-body">
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
        </section>
      </div>
    );
  }
}

export default Search;
