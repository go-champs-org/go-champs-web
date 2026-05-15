import React from 'react';
import { Message } from './entity';
import './MessageBubble.scss';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`ai-chat-bubble ai-chat-bubble--${message.role}`}>
      <div className="ai-chat-bubble__content">{message.content}</div>
    </div>
  );
};

export default MessageBubble;
