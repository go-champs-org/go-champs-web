import { getApiHost } from '../env';
import httpClient from '../httpClient';
import { ApiLegalDocument, ApiLegalDocumentsResponse } from './apiTypes';

export type LegalDocumentKind = ApiLegalDocument['kind'];

export interface LegalDocument {
  id: string;
  kind: LegalDocumentKind;
  locale: string;
  version: string;
  title: string;
  // Markdown.
  content: string;
  effectiveAt: string;
}

// The Terms of Use and Privacy Policy versions in force, as the API serves
// them: the same text a signup accepts.
export const getCurrentLegalDocuments = async (
  locale = 'pt-BR'
): Promise<LegalDocument[]> => {
  const url = new URL('v1/legal-documents/current', getApiHost());
  url.searchParams.set('locale', locale);

  const { data } = await httpClient.get<ApiLegalDocumentsResponse>(
    url.toString()
  );

  return data.map(document => ({
    id: document.id,
    kind: document.kind,
    locale: document.locale,
    version: document.version,
    title: document.title,
    content: document.content,
    effectiveAt: document.effective_at
  }));
};
