import { useEffect, useRef, useCallback } from 'react';
import { Socket, Channel } from 'phoenix';
import { LOCAL_STORAGE_TOKEN_KEY } from '../Accounts/constants';
import { Message } from './entity';

interface UsePhoenixChannelOptions {
  wsUrl: string;
  conversationId: string | null;
  onAssistantMessage: (message: Message) => void;
  onProcessing: (isProcessing: boolean) => void;
  onError: (text: string) => void;
  onConnected: () => void;
  onDisconnected: () => void;
}

interface UsePhoenixChannelResult {
  sendMessage: (content: string) => void;
}

const usePhoenixChannel = ({
  wsUrl,
  conversationId,
  onAssistantMessage,
  onProcessing,
  onError,
  onConnected,
  onDisconnected
}: UsePhoenixChannelOptions): UsePhoenixChannelResult => {
  const socketRef = useRef<Socket | null>(null);
  const channelRef = useRef<Channel | null>(null);

  const sendMessage = useCallback((content: string) => {
    if (channelRef.current) {
      channelRef.current.push('user_message', { content });
    }
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const socket = new Socket(wsUrl, { params: { token } });

    socket.connect();
    socketRef.current = socket;

    const channel = socket.channel(`ai:conversation:${conversationId}`, {});
    channelRef.current = channel;

    channel.on('assistant_message', (payload: { text: string }) => {
      onAssistantMessage({ role: 'assistant', content: payload.text });
      onProcessing(false);
    });

    channel.on('processing', () => {
      onProcessing(true);
    });

    channel.on('error', (payload: { text: string }) => {
      onError(payload.text);
      onProcessing(false);
    });

    channel
      .join()
      .receive('ok', () => {
        onConnected();
      })
      .receive('error', () => {
        onDisconnected();
      });

    channel.onClose(() => {
      onDisconnected();
    });

    channel.onError(() => {
      onDisconnected();
    });

    return () => {
      channel.leave();
      socket.disconnect();
      channelRef.current = null;
      socketRef.current = null;
    };
    // Callbacks are intentionally excluded — they should be stable refs from useAIChat
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsUrl, conversationId]);

  return { sendMessage };
};

export default usePhoenixChannel;
