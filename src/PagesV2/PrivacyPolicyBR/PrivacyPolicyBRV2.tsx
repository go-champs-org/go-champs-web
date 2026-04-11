import React from 'react';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import smartphone from '../../assets/illustrations/smartphone.svg';
import './PrivacyPolicyBRV2.scss';

function PrivacyPolicyBRV2() {
  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          <div className="page-v2-container">
            <div className="privacy-policy-br-illustration">
              <img src={smartphone} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">Política de Privacidade</h1>

              <div className="card-v2-content privacy-policy-br-content">
                {/* TODO: Add privacy policy content here */}
                <p className="privacy-policy-br-update-date">
                  Última atualização: 11/04/2026
                </p>

                <section className="privacy-policy-br-section">
                  <h2>1. Introdução</h2>
                  <p>
                    A Go Champs valoriza a sua privacidade e está comprometida
                    com a proteção dos dados pessoais dos usuários, em
                    conformidade com a Lei Geral de Proteção de Dados (Lei nº
                    13.709/2018 - LGPD).
                  </p>

                  <p>
                    Esta Política de Privacidade descreve como coletamos, usamos
                    e protegemos suas informações ao utilizar nossa plataforma.
                  </p>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>2. Coleta de Dados</h2>
                  <p>Coletamos as seguintes informações:</p>

                  <ul>
                    <li>Dados fornecidos pelo usuário:</li>
                    <ul>
                      <li>Informações de cadastro (nome, email, etc.)</li>
                      <li>Dados de perfil (foto, biografia, etc.)</li>
                    </ul>

                    <li>Dados coletados automaticamente:</li>
                    <ul>
                      <li>
                        Informações de uso (como você interage com a plataforma)
                      </li>
                      <li>
                        Dados de localização (informações sobre sua localização
                        geográfica, se permitido)
                      </li>
                      <li>Dados de dispositivo, como:</li>
                      <ul>
                        <li>Endereço IP</li>
                        <li>Tipo de dispositivo e navegador</li>
                        <li>Páginas acessadas e tempo de navegação</li>
                        <li>Cookies e identificadores online</li>
                      </ul>
                    </ul>
                  </ul>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>3. Uso de Dados</h2>

                  <p>
                    Os dados coletados são utilizados para melhorar nossos
                    serviços, personalizar a experiência do usuário e garantir a
                    segurança da plataforma.
                  </p>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>4. Compartilhamento de Dados</h2>
                  <p>Não vendemos dados pessoais.</p>

                  <p>Podemos compartilhar dados com:</p>
                  <ul>
                    <li>
                      Prestadores de serviços (ex: hospedagem, analytics,
                      publicidade)
                    </li>
                    <li>Parceiros necessários para operação da plataforma</li>
                  </ul>

                  <p>
                    Todos os terceiros seguem padrões adequados de segurança e
                    proteção de dados.
                  </p>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>5. Armazenamento e segurança</h2>

                  <p>
                    Adotamos medidas de segurança para proteger seus dados
                    contra acesso não autorizado, alteração, divulgação ou
                    destruição.
                  </p>

                  <p>
                    Os dados são armazenados em servidores seguros e mantidos
                    apenas pelo tempo necessário para cumprir as finalidades
                    descritas nesta política.
                  </p>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>6. Direitos do Usuário</h2>

                  <p>Nos termos da LGPD, você tem direito a:</p>
                  <ul>
                    <li>Confirmar a existência de tratamento de dados</li>
                    <li>Acessar seus dados</li>
                    <li>Corrigir dados incompletos ou desatualizados</li>
                    <li>Solicitar anonimização ou exclusão</li>
                    <li>Revogar o consentimento</li>
                  </ul>

                  <p>
                    Para exercer seus direitos, entre em contato pelo e-mail:
                    contato@go-champs.com
                  </p>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>7. Cookies e publicidade</h2>

                  <p>Utilizamos cookies para:</p>
                  <ul>
                    <li>Garantir o funcionamento da plataforma</li>
                    <li>Analisar o uso do site</li>
                    <li>Exibir anúncios</li>
                  </ul>

                  <p>
                    Utilizamos serviços de terceiros, como o Google AdSense, que
                    podem usar cookies (incluindo o cookie DoubleClick) para
                    exibir anúncios personalizados com base nas visitas
                    anteriores do usuário a este e a outros sites.
                  </p>

                  <p>
                    O Google e seus parceiros podem usar cookies para veicular
                    anúncios personalizados.
                  </p>

                  <p>
                    Você pode desativar a personalização de anúncios acessando:{' '}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://adssettings.google.com
                    </a>
                  </p>

                  <p>
                    Para mais informações sobre como o Google gerencia dados em
                    produtos de publicidade:{' '}
                    <a
                      href="https://policies.google.com/technologies/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://policies.google.com/technologies/ads
                    </a>
                  </p>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>8. Transferência internacional de dados</h2>

                  <p>
                    Podemos transferir seus dados para servidores localizados
                    fora do Brasil, garantindo que as medidas de proteção
                    adequadas estejam em vigor para proteger suas informações.
                  </p>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>9. Alterações nesta política</h2>
                  <p>
                    Podemos atualizar esta política de privacidade
                    periodicamente. Recomendamos revisar esta página
                    regularmente para se manter informado sobre como estamos
                    protegendo suas informações.
                  </p>
                </section>

                <section className="privacy-policy-br-section">
                  <h2>10. Contato</h2>
                  <p>
                    Se você tiver dúvidas ou preocupações sobre esta política de
                    privacidade, entre em contato conosco pelo e-mail:
                    contato@go-champs.com
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

export default PrivacyPolicyBRV2;
