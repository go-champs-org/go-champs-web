export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
}

export enum ConversationStatus {
  CollectingData = 'collecting_data',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface ConversationMeta {
  id: string;
  status: ConversationStatus;
  current_step: string;
}

export enum AIChatPhase {
  WorkflowSelection = 'workflow_selection',
  Conversation = 'conversation'
}

export interface AIChatState {
  phase: AIChatPhase;
  // workflow selection
  workflows: Workflow[];
  workflowsLoading: boolean;
  workflowsError: boolean;
  selectedWorkflow: Workflow | null;
  // conversation
  conversationId: string | null;
  messages: Message[];
  isConnected: boolean;
  isProcessing: boolean;
  conversationStatus: ConversationStatus | null;
  currentStep: string | null;
  conversationError: string | null;
  isCreatingConversation: boolean;
  // widget
  isOpen: boolean;
}

export type AIChatAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_WORKFLOWS_LOADING' }
  | { type: 'SET_WORKFLOWS'; payload: Workflow[] }
  | { type: 'SET_WORKFLOWS_ERROR' }
  | { type: 'SELECT_WORKFLOW'; payload: Workflow }
  | { type: 'SET_CREATING_CONVERSATION'; payload: boolean }
  | { type: 'SET_CONVERSATION_META'; payload: ConversationMeta }
  | { type: 'SET_CONVERSATION_ERROR'; payload: string }
  | { type: 'CLEAR_CONVERSATION_ERROR' }
  | { type: 'BACK_TO_PHASE_ONE' }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'UPDATE_CONVERSATION_STATUS'; payload: ConversationStatus };
