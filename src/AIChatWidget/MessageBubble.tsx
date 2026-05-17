import React from 'react';
import DOMPurify from 'dompurify';
import { Message } from './entity';
import './MessageBubble.scss';

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  if (message.role === 'assistant') {
    const clean = DOMPurify.sanitize(message.content);
    return (
      <div className="ai-chat-bubble ai-chat-bubble--assistant">
        <div
          className="ai-chat-bubble__content"
          dangerouslySetInnerHTML={{ __html: clean }}
        />
      </div>
    );
  }

  return (
    <div className="ai-chat-bubble ai-chat-bubble--user">
      <div className="ai-chat-bubble__content">{message.content}</div>
    </div>
  );
}

export default MessageBubble;
