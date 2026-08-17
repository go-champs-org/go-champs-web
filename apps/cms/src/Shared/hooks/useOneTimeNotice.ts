import { useCallback, useState } from 'react';

const LOCAL_STORAGE_ONE_TIME_NOTICE_KEY = 'one-time-notices';

const seenNotices = (): string[] => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_ONE_TIME_NOTICE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const markNoticeAsSeen = (noticeKey: string) => {
  try {
    const notices = seenNotices();

    if (!notices.includes(noticeKey)) {
      localStorage.setItem(
        LOCAL_STORAGE_ONE_TIME_NOTICE_KEY,
        JSON.stringify([...notices, noticeKey])
      );
    }
  } catch {
    // Storage is unavailable, notice will simply show again next time
  }
};

const useOneTimeNotice = (noticeKey: string) => {
  const [isVisible, setIsVisible] = useState(
    () => !seenNotices().includes(noticeKey)
  );

  const dismiss = useCallback(() => {
    markNoticeAsSeen(noticeKey);
    setIsVisible(false);
  }, [noticeKey]);

  return { isVisible, dismiss };
};

export default useOneTimeNotice;
