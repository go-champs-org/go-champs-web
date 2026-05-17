import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from './entity';
import MessageBubble from './MessageBubble';
import './MessageList.scss';

interface MessageListProps {
  messages: Message[];
  isProcessing: boolean;
}

function MessageList({ messages, isProcessing }: MessageListProps) {
  const { t } = useTranslation();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isProcessing]);

  return (
    <div className="ai-chat-message-list">
      {messages.length === 0 && (
        <p className="ai-chat-message-list__empty">{t('aiChat.emptyState')}</p>
      )}
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
      {isProcessing && (
        <div className="ai-chat-message-list__typing">
          <div className="ai-chat-message-list__typing-bubble">
            <span>···</span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
