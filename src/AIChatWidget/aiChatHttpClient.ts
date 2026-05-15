import httpClient from '../Shared/httpClient/httpClient';
import { REACT_APP_API_HOST } from '../Shared/env';
import { Workflow, ConversationMeta } from './entity';

const AI_API = `${REACT_APP_API_HOST}v1/ai`;

interface ApiWorkflowsResponse {
  data: Array<{ id: string; name: string; description: string }>;
}

interface ApiConversationResponse {
  data: { id: string; status: string; current_step: string };
}

export const fetchWorkflows = async (locale: string): Promise<Workflow[]> => {
  const url = `${AI_API}/workflows?locale=${encodeURIComponent(locale)}`;
  const response = await httpClient.get<ApiWorkflowsResponse>(url);
  return response.data.map(w => ({
    id: w.id,
    name: w.name,
    description: w.description
  }));
};

export const createConversation = async (
  workflowId: string,
  locale: string
): Promise<ConversationMeta> => {
  const response = await httpClient.post<object, ApiConversationResponse>(
    `${AI_API}/conversations`,
    { workflow: workflowId, locale }
  );
  return {
    id: response.data.id,
    status: response.data.status as ConversationMeta['status'],
    current_step: response.data.current_step
  };
};
