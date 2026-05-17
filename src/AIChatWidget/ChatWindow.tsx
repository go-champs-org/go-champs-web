import React from 'react';
import { useTranslation } from 'react-i18next';
import { Message, ConversationStatus } from './entity';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './ChatWindow.scss';

interface ChatWindowProps {
  workflowName: string;
  conversationStatus: ConversationStatus;
  conversationError: string | null;
  messages: Message[];
  isConnected: boolean;
  isProcessing: boolean;
  onSend: (content: string) => void;
  onBack: () => void;
  onClose: () => void;
  onDismissError: () => void;
  onStartOver: () => void;
}

function ChatWindow({
  workflowName,
  conversationStatus,
  conversationError,
  messages,
  isConnected,
  isProcessing,
  onSend,
  onBack,
  onClose,
  onDismissError,
  onStartOver
}: ChatWindowProps) {
  const { t } = useTranslation();

  return (
    <div className="ai-chat-window">
      <div className="ai-chat-window__header">
        <button
          className="ai-chat-window__back"
          onClick={onBack}
          type="button"
          aria-label={t('aiChat.backButton')}
        >
          &#8592;
        </button>
        <div className="ai-chat-window__title-group">
          <span className="ai-chat-window__title">{workflowName}</span>
        </div>
        <button
          className="ai-chat-window__close"
          onClick={onClose}
          type="button"
          aria-label={t('aiChat.closeButton')}
        >
          &#215;
        </button>
      </div>
      {conversationError ? (
        <div className="ai-chat-window__error-banner">
          <span>{conversationError}</span>
          <button
            className="ai-chat-window__error-dismiss"
            onClick={onDismissError}
            type="button"
            aria-label={t('aiChat.closeButton')}
          >
            &#215;
          </button>
        </div>
      ) : null}
      <MessageList messages={messages} isProcessing={isProcessing} />
      <MessageInput
        onSend={onSend}
        isDisabled={isProcessing || !isConnected}
        conversationStatus={conversationStatus}
        onStartOver={onStartOver}
        onClose={onClose}
      />
    </div>
  );
}

export default ChatWindow;
