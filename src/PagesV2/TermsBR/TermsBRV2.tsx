import React from 'react';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import smartphone from '../../assets/illustrations/smartphone.svg';
import './TermsBRV2.scss';

function TermsBRV2() {
  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          <div className="page-v2-container">
            <div className="terms-br-illustration">
              <img src={smartphone} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">Termos de Uso</h1>

              <div className="card-v2-content terms-br-content">
                <p className="terms-br-update-date">
                  Última atualização: 11/04/2026
                </p>

                <p>
                  <strong>Bem-vindo à Go Champs!</strong>
                </p>

                <p>
                  Estes Termos de Uso regulam o acesso e utilização da
                  plataforma Go Champs. Ao utilizar nossos serviços, você
                  concorda com estes termos.
                </p>

                <p>Caso não concorde, recomendamos não utilizar a plataforma.</p>

                <section className="terms-br-section">
                  <h2>1. Sobre a plataforma</h2>
                  <p>
                    A Go Champs é uma plataforma digital que permite a criação,
                    gestão e acompanhamento de torneios esportivos, incluindo
                    cadastro de equipes, jogadores, partidas e estatísticas.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>2. Cadastro e conta</h2>
                  <p>
                    Para utilizar determinadas funcionalidades, o usuário deverá
                    criar uma conta, fornecendo informações verdadeiras e
                    atualizadas.
                  </p>

                  <p>O usuário é responsável por:</p>
                  <ul>
                    <li>Manter a confidencialidade de sua conta</li>
                    <li>Todas as atividades realizadas sob sua conta</li>
                  </ul>

                  <p>
                    A Go Champs poderá suspender ou encerrar contas em caso de
                    uso indevido.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>3. Uso permitido</h2>
                  <p>
                    O usuário concorda em utilizar a plataforma apenas para fins
                    legais e legítimos.
                  </p>

                  <p>É proibido:</p>
                  <ul>
                    <li>Utilizar a plataforma para fins ilícitos</li>
                    <li>Inserir informações falsas ou enganosas</li>
                    <li>Violar direitos de terceiros</li>
                    <li>
                      Tentar acessar áreas restritas ou comprometer a segurança
                      do sistema
                    </li>
                  </ul>
                </section>

                <section className="terms-br-section">
                  <h2>4. Conteúdo do usuário</h2>
                  <p>Os usuários podem inserir conteúdos como:</p>
                  <ul>
                    <li>Nomes de equipes e jogadores</li>
                    <li>Informações de partidas</li>
                    <li>Imagens e dados relacionados a torneios</li>
                  </ul>

                  <p>O usuário é responsável pelo conteúdo que publica.</p>

                  <p>
                    Ao publicar conteúdo, o usuário concede à Go Champs uma
                    licença não exclusiva para utilizar, exibir e processar esse
                    conteúdo dentro da plataforma.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>5. Propriedade intelectual</h2>
                  <p>
                    Todo o conteúdo da plataforma, incluindo software, design,
                    logotipo e funcionalidades, pertence à Go Champs e está
                    protegido por leis de propriedade intelectual.
                  </p>

                  <p>É proibida a reprodução ou uso sem autorização.</p>
                </section>

                <section className="terms-br-section">
                  <h2>6. Disponibilidade do serviço</h2>
                  <p>
                    A Go Champs se esforça para manter a plataforma disponível,
                    mas não garante funcionamento contínuo ou livre de erros.
                  </p>

                  <p>Podemos:</p>
                  <ul>
                    <li>Modificar funcionalidades</li>
                    <li>Interromper serviços temporariamente</li>
                    <li>Realizar manutenções</li>
                  </ul>
                </section>

                <section className="terms-br-section">
                  <h2>7. Limitação de responsabilidade</h2>
                  <p>A Go Champs não se responsabiliza por:</p>
                  <ul>
                    <li>Danos decorrentes do uso da plataforma</li>
                    <li>Perda de dados causada por falhas externas</li>
                    <li>
                      Decisões tomadas com base nas informações da plataforma
                    </li>
                  </ul>

                  <p>A utilização do serviço é por conta e risco do usuário.</p>
                </section>

                <section className="terms-br-section">
                  <h2>8. Planos e cobranças</h2>
                  <p>Algumas funcionalidades podem ser pagas.</p>

                  <p>
                    Os valores, formas de cobrança e condições serão
                    apresentados ao usuário no momento da contratação.
                  </p>

                  <p>
                    A falta de pagamento pode resultar na suspensão do acesso a
                    determinadas funcionalidades.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>9. Publicidade</h2>
                  <p>
                    A plataforma pode exibir anúncios por meio de parceiros,
                    como o Google AdSense.
                  </p>

                  <p>
                    Esses anúncios podem ser personalizados com base na
                    navegação do usuário.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>10. Privacidade</h2>
                  <p>
                    O tratamento de dados pessoais é regido pela nossa Política
                    de Privacidade, disponível em:{' '}
                    <a href="/PrivacyPolicyBRV2">Política de Privacidade</a>.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>11. Encerramento de conta</h2>
                  <p>
                    O usuário pode solicitar a exclusão de sua conta a qualquer
                    momento.
                  </p>

                  <p>
                    A Go Champs também poderá encerrar contas em caso de
                    violação destes termos.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>12. Alterações nos termos</h2>
                  <p>
                    Estes Termos de Uso podem ser atualizados a qualquer
                    momento.
                  </p>

                  <p>
                    O uso contínuo da plataforma após alterações representa
                    concordância com os novos termos.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>13. Legislação aplicável</h2>
                  <p>
                    Estes termos são regidos pelas leis da República Federativa
                    do Brasil.
                  </p>
                </section>

                <section className="terms-br-section">
                  <h2>14. Contato</h2>
                  <p>Em caso de dúvidas, entre em contato:</p>

                  <p>
                    <strong>E-mail:</strong> contato@go-champs.com
                    <br />
                    <strong>Plataforma:</strong> Go Champs
                  </p>
                </section>
              </div>
            </CardV2>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default TermsBRV2;
