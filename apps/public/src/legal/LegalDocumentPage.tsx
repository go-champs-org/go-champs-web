import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { getCurrentLegalDocuments } from '@gochamps/api-client';
import type {
  LegalDocument,
  LegalDocumentKind
} from '@gochamps/api-client';

const HEADING_CLASS =
  'mb-4 mt-8 text-[1.375rem] font-bold text-foreground md:text-[1.5rem]';
const LINK_CLASS = 'text-primary transition-colors hover:underline';
const STRONG_CLASS = 'font-semibold text-foreground';

// The Markdown the API serves, in the classes the hardcoded pages used.
const MARKDOWN_COMPONENTS: Components = {
  h2: ({ children }) => <h2 className={HEADING_CLASS}>{children}</h2>,
  p: ({ children }) => <p className="mb-4">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc [&_ul]:mt-2 [&_ul]:mb-0">{children}</ul>
  ),
  li: ({ children }) => <li className="mb-2">{children}</li>,
  strong: ({ children }) => <strong className={STRONG_CLASS}>{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className={LINK_CLASS}>
      {children}
    </a>
  )
};

const formatEffectiveAt = (effectiveAt: string) =>
  new Date(effectiveAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

// The page is still worth serving when the API is down: it says so instead of
// an error page.
const loadDocument = async (
  kind: LegalDocumentKind
): Promise<LegalDocument | null> => {
  try {
    const documents = await getCurrentLegalDocuments('pt-BR');
    return documents.find(document => document.kind === kind) ?? null;
  } catch (error) {
    console.error(`Failed to fetch the current ${kind}:`, error);
    return null;
  }
};

// The current version of a legal document, as the API serves it (GC-346): the
// same text a signup accepts. The text is PT-BR only.
export default async function LegalDocumentPage({
  kind,
  fallbackTitle
}: {
  kind: LegalDocumentKind;
  fallbackTitle: string;
}) {
  const document = await loadDocument(kind);

  return (
    <main className="bg-background py-12 px-6">
      <div className="mx-auto grid max-w-[var(--content-max-width)] grid-cols-1 items-start gap-12 lg:grid-cols-2">
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
            {document ? document.title : fallbackTitle}
          </h1>

          <div className="text-[0.9375rem] leading-[1.7] text-muted sm:text-base">
            {document ? (
              <>
                <p className="mb-8 text-[0.9375rem] italic text-muted">
                  Última atualização: {formatEffectiveAt(document.effectiveAt)}
                </p>
                <div className="[&>h2:first-child]:mt-0">
                  <ReactMarkdown components={MARKDOWN_COMPONENTS}>
                    {document.content}
                  </ReactMarkdown>
                </div>
              </>
            ) : (
              <p className="mb-4">
                Não foi possível carregar o documento. Tente novamente mais
                tarde.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
