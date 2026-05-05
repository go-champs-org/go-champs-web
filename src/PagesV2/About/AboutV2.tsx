import React from 'react';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import handsOnTrophy from '../../assets/illustrations/hands-on-trophy.svg';
import './AboutV2.scss';
import lairPhoto from '../../assets/photos/lair.png';
import wagnerPhoto from '../../assets/photos/wagner.png';
import juliaPhoto from '../../assets/photos/julia.png';
import isaPhoto from '../../assets/photos/isa.png';
import ruanPhoto from '../../assets/photos/ruan.png';

function AboutV2() {
  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          <div className="page-v2-container">
            <div className="about-v2-illustration">
              <img src={handsOnTrophy} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">Sobre nós</h1>

              <div className="card-v2-content">
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
            </CardV2>
          </div>

          <div className="about-v2-team-section">
            <CardV2>
              <h2 className="card-v2-title">O time</h2>

              <div className="card-v2-content">
                <div className="about-v2-team-grid">
                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={lairPhoto} alt="Lair Júnior" />
                    </div>
                    <h3 className="about-v2-team-member-name">Lair Júnior</h3>
                    <p className="about-v2-team-member-role">Fundador</p>
                    <p className="about-v2-team-member-bio">
                      Apaixonada por construir em comunidade — seja em times de
                      tecnologia ou nas quadras de basquete.
                    </p>
                    <p className="about-v2-team-member-bio">
                      <a
                        href="https://www.lairjr.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Quer me conhecer melhor?
                      </a>
                    </p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={isaPhoto} alt="Isadora Paixão" />
                    </div>
                    <h3 className="about-v2-team-member-name">
                      Isadora Paixão
                    </h3>
                    <p className="about-v2-team-member-role">
                      Product Designer
                    </p>
                    <p className="about-v2-team-member-bio">
                      Transformando problemas em experiências. Obcecada por
                      entender pessoas. Entre dados, intuição e design também
                      sou Astróloga.
                    </p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={ruanPhoto} alt="Ruan Victor" />
                    </div>
                    <h3 className="about-v2-team-member-name">
                      Ruan Victor
                    </h3>
                    <p className="about-v2-team-member-role">Software Engineer</p>
                    <p className="about-v2-team-member-bio">
                      The Jedi.
                    </p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={wagnerPhoto} alt="Wagner Assis" />
                    </div>
                    <h3 className="about-v2-team-member-name">Wagner Assis</h3>
                    <p className="about-v2-team-member-role">
                      Mobile Engineer
                    </p>
                    <p className="about-v2-team-member-bio">
                      Nerd, fã de esportes como basquete e futebol, torcedor do
                      SC Internacional.
                    </p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={juliaPhoto} alt="Julia Ipê" />
                    </div>
                    <h3 className="about-v2-team-member-name">Julia Ipê</h3>
                    <p className="about-v2-team-member-role">Social Media</p>
                    <p className="about-v2-team-member-bio">
                      Conecto pessoas e propósitos por meio da comunicação.
                      Intensa, apaixonada por gente, por pets e pela vida —
                      idealizadora na essência e prática na ação.
                    </p>
                  </div>
                </div>
              </div>
            </CardV2>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default AboutV2;
