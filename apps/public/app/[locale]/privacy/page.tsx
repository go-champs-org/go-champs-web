import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';

// Ported verbatim from apps/cms/src/PagesV2/PrivacyPolicyBR/PrivacyPolicyBRV2.tsx:
// the text is hardcoded PT-BR in the CMS too (no i18n keys), so there is nothing
// to translate here — only the Bulma/SCSS classes became Tailwind.
const HEADING_CLASS =
  'mb-4 mt-8 text-[1.375rem] font-bold text-foreground md:text-[1.5rem]';
const SECTION_CLASS = 'mb-8 last:mb-0';
const LINK_CLASS = 'text-primary transition-colors hover:underline';

export default async function PrivacyPolicyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-background py-12 px-6">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-2">
        {/* The offset clears the sticky NavBar via its own --navbar-height
            token — with a smaller top the illustration slides under the bar
            as the page scrolls. */}
        <Image
          src="/illustrations/smartphone.svg"
          alt=""
          aria-hidden="true"
          width={440}
          height={622}
          priority
          className="mx-auto hidden h-auto w-full max-w-[440px] lg:sticky lg:top-[calc(var(--navbar-height)+1rem)] lg:block"
        />

        <div className="mx-auto w-full max-w-[560px] rounded-xl border border-border px-4 py-6 shadow-[0_4px_20px_var(--shadow-elevated)] sm:rounded-2xl sm:px-6 sm:py-8 md:p-10 lg:p-12">
          <h1 className="mb-4 text-center text-[1.375rem] font-bold leading-tight text-foreground sm:text-[1.5rem] md:text-left md:text-[1.75rem] lg:text-[2rem]">
            Política de Privacidade
          </h1>

          <div className="text-[0.9375rem] leading-[1.7] text-muted sm:text-base">
            <p className="mb-8 text-[0.9375rem] italic text-muted">
              Última atualização: 11/04/2026
            </p>

            <section className={SECTION_CLASS}>
              <h2 className={`${HEADING_CLASS} mt-0`}>1. Introdução</h2>
              <p className="mb-4">
                A Go Champs valoriza a sua privacidade e está comprometida com a
                proteção dos dados pessoais dos usuários, em conformidade com a
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
              </p>

              <p className="mb-4">
                Esta Política de Privacidade descreve como coletamos, usamos e
                protegemos suas informações ao utilizar nossa plataforma.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>2. Coleta de Dados</h2>
              <p className="mb-4">Coletamos as seguintes informações:</p>

              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">
                  Dados fornecidos pelo usuário:
                  <ul className="mt-2 ml-6 list-disc">
                    <li className="mb-2">
                      Informações de cadastro (nome, email, etc.)
                    </li>
                    <li className="mb-2">
                      Dados de perfil (foto, biografia, etc.)
                    </li>
                  </ul>
                </li>

                <li className="mb-2">
                  Dados coletados automaticamente:
                  <ul className="mt-2 ml-6 list-disc">
                    <li className="mb-2">
                      Informações de uso (como você interage com a plataforma)
                    </li>
                    <li className="mb-2">
                      Dados de localização (informações sobre sua localização
                      geográfica, se permitido)
                    </li>
                    <li className="mb-2">
                      Dados de dispositivo, como:
                      <ul className="mt-2 ml-6 list-disc">
                        <li className="mb-2">Endereço IP</li>
                        <li className="mb-2">
                          Tipo de dispositivo e navegador
                        </li>
                        <li className="mb-2">
                          Páginas acessadas e tempo de navegação
                        </li>
                        <li className="mb-2">
                          Cookies e identificadores online
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>3. Uso de Dados</h2>

              <p className="mb-4">
                Os dados coletados são utilizados para melhorar nossos serviços,
                personalizar a experiência do usuário e garantir a segurança da
                plataforma.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>4. Compartilhamento de Dados</h2>
              <p className="mb-4">Não vendemos dados pessoais.</p>

              <p className="mb-4">Podemos compartilhar dados com:</p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">
                  Prestadores de serviços (ex: hospedagem, analytics,
                  publicidade)
                </li>
                <li className="mb-2">
                  Parceiros necessários para operação da plataforma
                </li>
              </ul>

              <p className="mb-4">
                Todos os terceiros seguem padrões adequados de segurança e
                proteção de dados.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>5. Armazenamento e segurança</h2>

              <p className="mb-4">
                Adotamos medidas de segurança para proteger seus dados contra
                acesso não autorizado, alteração, divulgação ou destruição.
              </p>

              <p className="mb-4">
                Os dados são armazenados em servidores seguros e mantidos apenas
                pelo tempo necessário para cumprir as finalidades descritas
                nesta política.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>6. Direitos do Usuário</h2>

              <p className="mb-4">Nos termos da LGPD, você tem direito a:</p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">
                  Confirmar a existência de tratamento de dados
                </li>
                <li className="mb-2">Acessar seus dados</li>
                <li className="mb-2">
                  Corrigir dados incompletos ou desatualizados
                </li>
                <li className="mb-2">Solicitar anonimização ou exclusão</li>
                <li className="mb-2">Revogar o consentimento</li>
              </ul>

              <p className="mb-4">
                Para exercer seus direitos, entre em contato pelo e-mail:
                contato@go-champs.com
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>7. Cookies e publicidade</h2>

              <p className="mb-4">Utilizamos cookies para:</p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">Garantir o funcionamento da plataforma</li>
                <li className="mb-2">Analisar o uso do site</li>
                <li className="mb-2">Exibir anúncios</li>
              </ul>

              <p className="mb-4">
                Utilizamos serviços de terceiros, como o Google AdSense, que
                podem usar cookies (incluindo o cookie DoubleClick) para exibir
                anúncios personalizados com base nas visitas anteriores do
                usuário a este e a outros sites.
              </p>

              <p className="mb-4">
                O Google e seus parceiros podem usar cookies para veicular
                anúncios personalizados.
              </p>

              <p className="mb-4">
                Você pode desativar a personalização de anúncios acessando:{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  https://adssettings.google.com
                </a>
              </p>

              <p className="mb-4">
                Para mais informações sobre como o Google gerencia dados em
                produtos de publicidade:{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  https://policies.google.com/technologies/ads
                </a>
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>
                8. Transferência internacional de dados
              </h2>

              <p className="mb-4">
                Podemos transferir seus dados para servidores localizados fora
                do Brasil, garantindo que as medidas de proteção adequadas
                estejam em vigor para proteger suas informações.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>9. Alterações nesta política</h2>
              <p className="mb-4">
                Podemos atualizar esta política de privacidade periodicamente.
                Recomendamos revisar esta página regularmente para se manter
                informado sobre como estamos protegendo suas informações.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>10. Contato</h2>
              <p className="mb-4">
                Se você tiver dúvidas ou preocupações sobre esta política de
                privacidade, entre em contato conosco pelo e-mail:
                contato@go-champs.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
