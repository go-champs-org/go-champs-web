import React, {
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
  KeyboardEvent
} from 'react';
import { useTranslation } from 'react-i18next';
import { ConversationStatus } from './entity';
import './MessageInput.scss';

export interface MessageInputHandle {
  focus: () => void;
}

interface MessageInputProps {
  onSend: (content: string) => void;
  isDisabled: boolean;
  conversationStatus?: ConversationStatus;
  onStartOver?: () => void;
  onClose?: () => void;
}

const MessageInput = forwardRef<MessageInputHandle, MessageInputProps>(
  function MessageInput(
    {
      onSend,
      isDisabled,
      conversationStatus,
      onStartOver,
      onClose
    }: MessageInputProps,
    ref
  ) {
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }
    }));

    const isTerminal =
      conversationStatus === ConversationStatus.Completed ||
      conversationStatus === ConversationStatus.Cancelled;

    const handleSend = useCallback(() => {
      const trimmed = value.trim();
      if (!trimmed || isDisabled) return;
      onSend(trimmed);
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [value, isDisabled, onSend]);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    if (isTerminal) {
      return (
        <div className="ai-chat-message-input ai-chat-message-input--terminal">
          {onStartOver ? (
            <button
              className="ai-chat-message-input__start-over"
              onClick={onStartOver}
              type="button"
            >
              {t('aiChat.startOverButton')}
            </button>
          ) : null}
          {onClose ? (
            <button
              className="ai-chat-message-input__close-terminal"
              onClick={onClose}
              type="button"
            >
              {t('aiChat.closeButton')}
            </button>
          ) : null}
        </div>
      );
    }

    return (
      <div className="ai-chat-message-input">
        <textarea
          className="ai-chat-message-input__textarea"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          ref={textareaRef}
          placeholder={t('aiChat.answerPlaceholder')}
          rows={1}
        />
        <button
          className="ai-chat-message-input__button"
          onClick={handleSend}
          disabled={isDisabled || !value.trim()}
        >
          {t('aiChat.sendButton')}
        </button>
      </div>
    );
  }
);

export default MessageInput;
