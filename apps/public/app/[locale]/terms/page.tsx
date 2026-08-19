import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';

// Ported verbatim from apps/cms/src/PagesV2/TermsBR/TermsBRV2.tsx:
// the text is hardcoded PT-BR in the CMS too (no i18n keys), so there is nothing
// to translate here — only the Bulma/SCSS classes became Tailwind.
const HEADING_CLASS =
  'mb-4 mt-8 text-[1.375rem] font-bold text-foreground md:text-[1.5rem]';
const SECTION_CLASS = 'mb-8 last:mb-0';
const LINK_CLASS = 'text-primary transition-colors hover:underline';
const STRONG_CLASS = 'font-semibold text-foreground';

export default async function TermsPage({
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
            Termos de Uso
          </h1>

          <div className="text-[0.9375rem] leading-[1.7] text-muted sm:text-base">
            <p className="mb-8 text-[0.9375rem] italic text-muted">
              Última atualização: 11/04/2026
            </p>

            <p className="mb-4">
              <strong className={STRONG_CLASS}>Bem-vindo à Go Champs!</strong>
            </p>

            <p className="mb-4">
              Estes Termos de Uso regulam o acesso e utilização da plataforma Go
              Champs. Ao utilizar nossos serviços, você concorda com estes
              termos.
            </p>

            <p className="mb-4">
              Caso não concorde, recomendamos não utilizar a plataforma.
            </p>

            <section className={SECTION_CLASS}>
              {/* First section heading drops the top margin: the intro
                  paragraphs above it already provide the spacing. */}
              <h2 className={`${HEADING_CLASS} mt-0`}>1. Sobre a plataforma</h2>
              <p className="mb-4">
                A Go Champs é uma plataforma digital que permite a criação,
                gestão e acompanhamento de torneios esportivos, incluindo
                cadastro de equipes, jogadores, partidas e estatísticas.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>2. Cadastro e conta</h2>
              <p className="mb-4">
                Para utilizar determinadas funcionalidades, o usuário deverá
                criar uma conta, fornecendo informações verdadeiras e
                atualizadas.
              </p>

              <p className="mb-4">O usuário é responsável por:</p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">
                  Manter a confidencialidade de sua conta
                </li>
                <li className="mb-2">
                  Todas as atividades realizadas sob sua conta
                </li>
              </ul>

              <p className="mb-4">
                A Go Champs poderá suspender ou encerrar contas em caso de uso
                indevido.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>3. Uso permitido</h2>
              <p className="mb-4">
                O usuário concorda em utilizar a plataforma apenas para fins
                legais e legítimos.
              </p>

              <p className="mb-4">É proibido:</p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">
                  Utilizar a plataforma para fins ilícitos
                </li>
                <li className="mb-2">
                  Inserir informações falsas ou enganosas
                </li>
                <li className="mb-2">Violar direitos de terceiros</li>
                <li className="mb-2">
                  Tentar acessar áreas restritas ou comprometer a segurança do
                  sistema
                </li>
              </ul>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>4. Conteúdo do usuário</h2>
              <p className="mb-4">Os usuários podem inserir conteúdos como:</p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">Nomes de equipes e jogadores</li>
                <li className="mb-2">Informações de partidas</li>
                <li className="mb-2">
                  Imagens e dados relacionados a torneios
                </li>
              </ul>

              <p className="mb-4">
                O usuário é responsável pelo conteúdo que publica.
              </p>

              <p className="mb-4">
                Ao publicar conteúdo, o usuário concede à Go Champs uma licença
                não exclusiva para utilizar, exibir e processar esse conteúdo
                dentro da plataforma.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>5. Propriedade intelectual</h2>
              <p className="mb-4">
                Todo o conteúdo da plataforma, incluindo software, design,
                logotipo e funcionalidades, pertence à Go Champs e está
                protegido por leis de propriedade intelectual.
              </p>

              <p className="mb-4">
                É proibida a reprodução ou uso sem autorização.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>6. Disponibilidade do serviço</h2>
              <p className="mb-4">
                A Go Champs se esforça para manter a plataforma disponível, mas
                não garante funcionamento contínuo ou livre de erros.
              </p>

              <p className="mb-4">Podemos:</p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">Modificar funcionalidades</li>
                <li className="mb-2">Interromper serviços temporariamente</li>
                <li className="mb-2">Realizar manutenções</li>
              </ul>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>
                7. Limitação de responsabilidade
              </h2>
              <p className="mb-4">A Go Champs não se responsabiliza por:</p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">Danos decorrentes do uso da plataforma</li>
                <li className="mb-2">
                  Perda de dados causada por falhas externas
                </li>
                <li className="mb-2">
                  Decisões tomadas com base nas informações da plataforma
                </li>
              </ul>

              <p className="mb-4">
                A utilização do serviço é por conta e risco do usuário.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>8. Planos e cobranças</h2>
              <p className="mb-4">Algumas funcionalidades podem ser pagas.</p>

              <p className="mb-4">
                Os valores, formas de cobrança e condições serão apresentados ao
                usuário no momento da contratação.
              </p>

              <p className="mb-4">
                A falta de pagamento pode resultar na suspensão do acesso a
                determinadas funcionalidades.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>9. Publicidade</h2>
              <p className="mb-4">
                A plataforma pode exibir anúncios por meio de parceiros, como o
                Google AdSense.
              </p>

              <p className="mb-4">
                Esses anúncios podem ser personalizados com base na navegação do
                usuário.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>10. Privacidade</h2>
              <p className="mb-4">
                O tratamento de dados pessoais é regido pela nossa Política de
                Privacidade, disponível em:{' '}
                <Link href={`/${locale}/privacy`} className={LINK_CLASS}>
                  Política de Privacidade
                </Link>
                .
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>11. Encerramento de conta</h2>
              <p className="mb-4">
                O usuário pode solicitar a exclusão de sua conta a qualquer
                momento.
              </p>

              <p className="mb-4">
                A Go Champs também poderá encerrar contas em caso de violação
                destes termos.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>12. Alterações nos termos</h2>
              <p className="mb-4">
                Estes Termos de Uso podem ser atualizados a qualquer momento.
              </p>

              <p className="mb-4">
                O uso contínuo da plataforma após alterações representa
                concordância com os novos termos.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>13. Legislação aplicável</h2>
              <p className="mb-4">
                Estes termos são regidos pelas leis da República Federativa do
                Brasil.
              </p>
            </section>

            <section className={SECTION_CLASS}>
              <h2 className={HEADING_CLASS}>14. Contato</h2>
              <p className="mb-4">Em caso de dúvidas, entre em contato:</p>

              <p className="mb-4">
                <strong className={STRONG_CLASS}>E-mail:</strong>{' '}
                contato@go-champs.com
                <br />
                <strong className={STRONG_CLASS}>Plataforma:</strong> Go Champs
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
