import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ThemeV2Provider } from '../ThemeV2';
import NavBar from '../PagesV2/Shared/NavBar';
import Footer from '../PagesV2/Shared/Footer';
import CardV2 from '../PagesV2/Shared/CardV2';
import smartphone from '../assets/illustrations/smartphone.svg';
import { ApiLegalDocument } from '../Shared/httpClient/apiTypes';
import legalDocumentHttpClient from './legalDocumentHttpClient';
import './LegalDocumentPageV2.scss';

interface LegalDocumentPageV2Props {
  kind: ApiLegalDocument['kind'];
  fallbackTitle: string;
}

const formatEffectiveAt = (effectiveAt: string) =>
  new Date(effectiveAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

// The current version of a legal document, as the API serves it (GC-346): the
// same text a signup accepts.
function LegalDocumentPageV2({
  kind,
  fallbackTitle
}: LegalDocumentPageV2Props) {
  const [document, setDocument] = useState<ApiLegalDocument | undefined>();
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    legalDocumentHttpClient
      .getCurrent()
      .then(documents => {
        const current = documents.find(candidate => candidate.kind === kind);
        setDocument(current);
        setHasFailed(!current);
      })
      .catch(() => setHasFailed(true));
  }, [kind]);

  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          <div className="page-v2-container">
            <div className="legal-document-illustration">
              <img src={smartphone} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">
                {document ? document.title : fallbackTitle}
              </h1>

              <div className="card-v2-content legal-document-content">
                {document && (
                  <>
                    <p className="legal-document-update-date">
                      Última atualização:{' '}
                      {formatEffectiveAt(document.effective_at)}
                    </p>
                    <ReactMarkdown>{document.content}</ReactMarkdown>
                  </>
                )}

                {hasFailed && (
                  <p>
                    Não foi possível carregar o documento. Tente novamente mais
                    tarde.
                  </p>
                )}
              </div>
            </CardV2>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default LegalDocumentPageV2;
