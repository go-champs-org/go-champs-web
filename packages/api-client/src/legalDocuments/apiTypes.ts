export interface ApiLegalDocument {
  id: string;
  kind: 'terms_of_use' | 'privacy_policy';
  locale: string;
  version: string;
  title: string;
  content: string;
  content_sha256: string;
  effective_at: string;
  requires_reacceptance: boolean;
}

export interface ApiLegalDocumentsResponse {
  data: ApiLegalDocument[];
}
