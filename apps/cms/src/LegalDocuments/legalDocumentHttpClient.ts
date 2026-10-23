import httpClient from '../Shared/httpClient/httpClient';
import ApiError from '../Shared/httpClient/ApiError';
import {
  ApiLegalAcceptanceRequest,
  ApiLegalDocument,
  ApiLegalDocumentsResponse
} from '../Shared/httpClient/apiTypes';
import { REACT_APP_API_HOST } from '../Shared/env';

const LEGAL_ACCEPTANCES_API = `${REACT_APP_API_HOST}v1/accounts/legal-acceptances`;

const getPending = async (): Promise<ApiLegalDocument[]> => {
  const response = await httpClient.get<ApiLegalDocumentsResponse>(
    `${LEGAL_ACCEPTANCES_API}/pending`
  );

  return response.data || [];
};

// Answers with what is still pending after the acceptance.
const accept = async (ids: string[]): Promise<ApiLegalDocument[]> => {
  const response = await httpClient.post<
    ApiLegalAcceptanceRequest,
    ApiLegalDocumentsResponse
  >(LEGAL_ACCEPTANCES_API, { accepted_legal_document_ids: ids });

  return response.data || [];
};

// The API refuses ids that are no longer the current versions; the client
// fetches the pending documents again and asks for the acceptance once more.
export const isLegalDocumentsOutdatedError = (error: unknown): boolean =>
  error instanceof ApiError &&
  error.payload.status === 422 &&
  (error.payload.data?.errors?.accepted_legal_document_ids || []).includes(
    'legal_documents_outdated'
  );

export default {
  accept,
  getPending
};
