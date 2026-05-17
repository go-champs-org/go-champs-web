import { useReducer, useCallback } from 'react';
import i18n from 'i18next';
import {
  AIChatState,
  AIChatAction,
  AIChatPhase,
  Message,
  Workflow,
  ConversationMeta
} from './entity';
import { fetchWorkflows, createConversation } from './aiChatHttpClient';
import { getWebSocketUrl } from '../Shared/env';
import usePhoenixChannel from './usePhoenixChannel';

const initialState: AIChatState = {
  phase: AIChatPhase.WorkflowSelection,
  workflows: [],
  workflowsLoading: false,
  workflowsError: false,
  selectedWorkflow: null,
  conversationId: null,
  messages: [],
  isConnected: false,
  isProcessing: false,
  conversationStatus: null,
  currentStep: null,
  conversationError: null,
  isCreatingConversation: false,
  isOpen: false
};

const reducer = (state: AIChatState, action: AIChatAction): AIChatState => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'SET_WORKFLOWS_LOADING':
      return { ...state, workflowsLoading: true, workflowsError: false };
    case 'SET_WORKFLOWS':
      return { ...state, workflowsLoading: false, workflows: action.payload };
    case 'SET_WORKFLOWS_ERROR':
      return { ...state, workflowsLoading: false, workflowsError: true };
    case 'SELECT_WORKFLOW':
      return { ...state, selectedWorkflow: action.payload };
    case 'SET_CREATING_CONVERSATION':
      return {
        ...state,
        isCreatingConversation: action.payload,
        conversationError: action.payload ? null : state.conversationError
      };
    case 'SET_CONVERSATION_META':
      return {
        ...state,
        conversationId: action.payload.id,
        conversationStatus: action.payload.status,
        currentStep: action.payload.current_step,
        phase: AIChatPhase.Conversation,
        isCreatingConversation: false,
        messages: []
      };
    case 'SET_CONVERSATION_ERROR':
      return {
        ...state,
        conversationError: action.payload,
        isCreatingConversation: false,
        isProcessing: false
      };
    case 'CLEAR_CONVERSATION_ERROR':
      return { ...state, conversationError: null };
    case 'BACK_TO_PHASE_ONE':
      return {
        ...state,
        phase: AIChatPhase.WorkflowSelection,
        conversationId: null,
        messages: [],
        isConnected: false,
        isProcessing: false,
        conversationStatus: null,
        currentStep: null,
        conversationError: null,
        selectedWorkflow: null,
        isCreatingConversation: false
        // workflows preserved intentionally
      };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'UPDATE_CONVERSATION_STATUS':
      return { ...state, conversationStatus: action.payload };
    default:
      return state;
  }
};

interface UseAIChatResult {
  state: AIChatState;
  open: () => void;
  close: () => void;
  retryFetchWorkflows: () => void;
  selectWorkflow: (workflow: Workflow) => void;
  backToPhaseOne: () => void;
  sendMessage: (content: string) => void;
  dismissError: () => void;
}

const useAIChat = (): UseAIChatResult => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadWorkflows = useCallback(async () => {
    dispatch({ type: 'SET_WORKFLOWS_LOADING' });
    try {
      const locale = i18n.language || 'en';
      const workflows = await fetchWorkflows(locale);
      dispatch({ type: 'SET_WORKFLOWS', payload: workflows });
    } catch {
      dispatch({ type: 'SET_WORKFLOWS_ERROR' });
    }
  }, []);

  const open = useCallback(() => {
    dispatch({ type: 'OPEN' });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: 'CLOSE' });
    dispatch({ type: 'BACK_TO_PHASE_ONE' });
  }, []);

  const retryFetchWorkflows = useCallback(() => {
    loadWorkflows();
  }, [loadWorkflows]);

  const selectWorkflow = useCallback(async (workflow: Workflow) => {
    dispatch({ type: 'SELECT_WORKFLOW', payload: workflow });
    dispatch({ type: 'SET_CREATING_CONVERSATION', payload: true });
    try {
      const locale = i18n.language || 'en';
      const meta: ConversationMeta = await createConversation(
        workflow.id,
        locale
      );
      dispatch({ type: 'SET_CONVERSATION_META', payload: meta });
    } catch {
      dispatch({
        type: 'SET_CONVERSATION_ERROR',
        payload: i18n.t('aiChat.createConversationError')
      });
    }
  }, []);

  const backToPhaseOne = useCallback(() => {
    dispatch({ type: 'BACK_TO_PHASE_ONE' });
  }, []);

  const dismissError = useCallback(() => {
    dispatch({ type: 'CLEAR_CONVERSATION_ERROR' });
  }, []);

  const handleAssistantMessage = useCallback((message: Message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  }, []);

  const handleProcessing = useCallback((isProcessing: boolean) => {
    dispatch({ type: 'SET_PROCESSING', payload: isProcessing });
  }, []);

  const handleError = useCallback((text: string) => {
    dispatch({ type: 'SET_CONVERSATION_ERROR', payload: text });
  }, []);

  const handleConnected = useCallback(() => {
    dispatch({ type: 'SET_CONNECTED', payload: true });
  }, []);

  const handleDisconnected = useCallback(() => {
    dispatch({ type: 'SET_CONNECTED', payload: false });
  }, []);

  const { sendMessage: channelSendMessage } = usePhoenixChannel({
    wsUrl: getWebSocketUrl(),
    conversationId: state.conversationId,
    onAssistantMessage: handleAssistantMessage,
    onProcessing: handleProcessing,
    onError: handleError,
    onConnected: handleConnected,
    onDisconnected: handleDisconnected
  });

  // Load workflows on first open when list is empty
  const openWithWorkflows = useCallback(() => {
    open();
    if (state.workflows.length === 0 && !state.workflowsLoading) {
      loadWorkflows();
    }
  }, [open, state.workflows.length, state.workflowsLoading, loadWorkflows]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || state.isProcessing) return;
      dispatch({ type: 'ADD_MESSAGE', payload: { role: 'user', content } });
      channelSendMessage(content);
      dispatch({ type: 'SET_PROCESSING', payload: true });
    },
    [state.isProcessing, channelSendMessage]
  );

  return {
    state,
    open: openWithWorkflows,
    close,
    retryFetchWorkflows,
    selectWorkflow,
    backToPhaseOne,
    sendMessage,
    dismissError
  };
};

export default useAIChat;
