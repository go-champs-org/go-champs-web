import ApiError from '../Shared/httpClient/ApiError';
import { isLegalDocumentsOutdatedError } from './legalDocumentHttpClient';

describe('isLegalDocumentsOutdatedError', () => {
  it('is true for a 422 naming outdated legal documents', () => {
    const error = new ApiError({
      status: 422,
      data: {
        errors: { accepted_legal_document_ids: ['legal_documents_outdated'] }
      }
    });

    expect(isLegalDocumentsOutdatedError(error)).toBe(true);
  });

  it('is false for any other refusal', () => {
    const required = new ApiError({
      status: 422,
      data: {
        errors: { accepted_legal_document_ids: ['legal_acceptance_required'] }
      }
    });
    const serverError = new ApiError({ status: 500, data: {} });

    expect(isLegalDocumentsOutdatedError(required)).toBe(false);
    expect(isLegalDocumentsOutdatedError(serverError)).toBe(false);
    expect(isLegalDocumentsOutdatedError(new Error('network'))).toBe(false);
  });
});
