import React from 'react';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import AboutIllustration from './AboutIllustration';
import './AboutV2.scss';

const AboutV2: React.FC = () => {
  return (
    <ThemeV2Provider>
      <div className="about-v2-wrapper">
        <NavBar />
        <main className="about-v2-page">
          <div className="about-v2-container">
            <div className="about-v2-illustration">
              <AboutIllustration />
            </div>

            <div className="about-v2-content-card">
              <h1 className="about-v2-title">Sobre nós</h1>

              <div className="about-v2-text">
                <p>
                  No GO CHAMPS, a gente vive o esporte como ele é:{' '}
                  <strong>dinâmico, competitivo e emocionante</strong>. Criamos
                  uma plataforma simples e poderosa para acompanhar campeonatos,
                  jogos e estatísticas do amador ao semiprofissional com
                  informação rápida, visual claro e experiência pensada para
                  quem joga, organiza e torce.
                </p>

                <p>
                  Nossa missão é conectar pessoas ao esporte que amam com dados
                  confiáveis, atualizados e fáceis de entender, valorizando
                  atletas, ligas e comunidades.{' '}
                  <strong>
                    Em um só lugar você encontra calendários, chaves, resultados
                    e estatísticas objetivas, com atualização a partir de dados
                    oficiais.
                  </strong>
                </p>

                <p>
                  Servimos torcedores que querem praticidade, atletas e equipes
                  que buscam visibilidade e histórico organizado, e
                  organizadores que precisam de um hub confiável para divulgar
                  seus campeonatos.
                </p>

                <p>
                  Nossos valores guiam tudo: jogo limpo, simplicidade que
                  escala, performance de verdade, acessibilidade para todos e
                  comunidade em primeiro lugar.
                </p>

                <p className="about-v2-stats">
                  Hoje já somamos <strong>+&#123;X&#125; campeonatos</strong>,{' '}
                  <strong>+&#123;Y&#125; jogos</strong> e{' '}
                  <strong>+&#123;Z&#125; usuários por mês</strong> — e estamos
                  só começando.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
};

export default AboutV2;
