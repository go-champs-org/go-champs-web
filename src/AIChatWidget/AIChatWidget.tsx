import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { StoreState } from '../store';
import useAIChat from './useAIChat';
import { AIChatPhase, ConversationStatus } from './entity';
import ChatWindow from './ChatWindow';
import WorkflowList from './WorkflowList';
import './AIChatWidget.scss';

const AIChatWidget: React.FC = () => {
  const account = useSelector((state: StoreState) => state.account.account);
  const location = useLocation();
  const {
    state,
    open,
    close,
    retryFetchWorkflows,
    selectWorkflow,
    backToPhaseOne,
    sendMessage,
    dismissError
  } = useAIChat();

  useEffect(() => {
    if (!account) return;
    if (
      location.pathname.indexOf('/organization/') !== -1 ||
      location.pathname.indexOf('/Organization/') !== -1 ||
      location.pathname.indexOf('/Account/Organizations') !== -1
    ) {
      if (!state.isOpen) {
        open();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, account]);

  // Only render for authenticated users
  if (!account) return <></>;

  const selectedWorkflowName = state.selectedWorkflow
    ? state.selectedWorkflow.name
    : '';

  return (
    <div className="ai-chat-widget">
      {state.isOpen && state.phase === AIChatPhase.WorkflowSelection && (
        <div className="ai-chat-window">
          <div className="ai-chat-window__header">
            <div className="ai-chat-window__title-group">
              <span className="ai-chat-window__title" />
            </div>
            <button
              className="ai-chat-window__close"
              onClick={close}
              type="button"
            >
              &#215;
            </button>
          </div>
          <WorkflowList
            workflows={state.workflows}
            isLoading={state.workflowsLoading}
            hasError={state.workflowsError}
            onSelect={selectWorkflow}
            onRetry={retryFetchWorkflows}
          />
          {state.isCreatingConversation && (
            <div className="ai-chat-widget__creating" />
          )}
        </div>
      )}
      {state.isOpen && state.phase === AIChatPhase.Conversation && (
        <ChatWindow
          workflowName={selectedWorkflowName}
          currentStep={state.currentStep}
          conversationStatus={
            state.conversationStatus || ConversationStatus.CollectingData
          }
          conversationError={state.conversationError}
          messages={state.messages}
          isConnected={state.isConnected}
          isProcessing={state.isProcessing}
          onSend={sendMessage}
          onBack={backToPhaseOne}
          onClose={close}
          onDismissError={dismissError}
          onStartOver={backToPhaseOne}
        />
      )}
      <button
        className={`ai-chat-widget__toggle${
          state.isOpen ? ' ai-chat-widget__toggle--open' : ''
        }`}
        onClick={state.isOpen ? close : open}
        aria-label={state.isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
      >
        {state.isOpen ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 4L16 16M16 4L4 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 5a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H6l-3 3V5z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
