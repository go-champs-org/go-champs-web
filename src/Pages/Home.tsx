import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import {
  deleteOrganization,
  getOrganizations,
  postOrganization
} from '../Organizations/effects';
import { OrganizationState } from '../Organizations/state';
import { StoreState } from '../store';

interface HomeProps extends RouteComponentProps {
  deleteOrganization: any;
  organizationState: OrganizationState;
  postOrganization: any;
  getOrganizations: any;
}

class Home extends React.Component<HomeProps> {
  render() {
    return (
      <div className="hero is-medium">
        <div className="hero-head">
          <div className="content">
            <div className="columns is-vcentered">
              <div className="column is-6">
                <h1 className="title">Go Champs!</h1>

                <span className="subtitle">
                  A web app mais maneira para gerenciar torneios
                </span>
              </div>

              <div className="column is-6">
                <img
                  src="https://cronhub.io/img/ch-dashboard-shadow.png"
                  alt="Demo Tournament"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-body">
          <div className="has-text-centered">
            <h1 className="title">O que é o Go Champs?</h1>

            <p style={{ marginBottom: '1.5rem' }}>
              Go Champs! É uma aplicacão para você criar seu torneio e gerenciar
              fases, times, jogos, classificacões e muito mais.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              As informacões ficam disponibilizadas para qualquer pessoa acessar
              e pode acompanhar seu torneio.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              Acesse nosso torneio exemplo clicando&nbsp;
              <a
                href="sec-mun-esportes/liga-municipal"
                style={{ color: '#970c10' }}
              >
                aqui
              </a>
              .
            </p>
          </div>
        </div>

        <div className="hero-foot">
          <div className="has-text-centered">
            <h1 className="title">Mande seu feedback</h1>

            <div className="columns is-centered">
              <div className="column is-half">
                <div className="field">
                  <label className="label">Nome</label>
                  <div className="control">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="Usain Bolt"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input is-primary"
                      type="text"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Mensagem</label>
                  <div className="control">
                    <textarea
                      className="textarea is-primary"
                      placeholder=""
                    ></textarea>
                  </div>
                </div>

                <div className="control">
                  <button className="button is-primary">Enviar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getOrganizations();
  }
}

const mapStateToProps = (state: StoreState) => ({
  organizationState: state.organizations
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      deleteOrganization,
      postOrganization,
      getOrganizations
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
