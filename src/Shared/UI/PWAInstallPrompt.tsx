import React, { useState, useEffect } from 'react';
import './PWAInstallPrompt.scss';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const PWAInstallPrompt: React.FC = () => {
  const [
    deferredPrompt,
    setDeferredPrompt
  ] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      // Check if running in standalone mode (PWA installed)
      const isStandalone = window.matchMedia('(display-mode: standalone)')
        .matches;
      // Check if running in a webview (mobile app wrapper)
      const isWebview = (window.navigator as any).standalone === true;

      return isStandalone || isWebview;
    };

    setIsInstalled(checkIfInstalled());

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e);
      // Show our custom install prompt
      setShowInstallPrompt(true);
    };

    // Listen for the app being installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if we should show the prompt after a delay
    const timer = setTimeout(() => {
      if (!isInstalled && !deferredPrompt) {
        // For iOS devices that don't support beforeinstallprompt
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isInStandaloneMode = (window.navigator as any).standalone;

        if (isIOS && !isInStandaloneMode) {
          setShowInstallPrompt(true);
        }
      }
    }, 3000); // Show after 3 seconds

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, [deferredPrompt, isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the native install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      // Clear the prompt
      setDeferredPrompt(null);
    }

    // Hide our custom prompt
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Remember user dismissed it (you could store this in localStorage)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if already installed or user recently dismissed
  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  // Check if user recently dismissed (within last 7 days)
  const lastDismissed = localStorage.getItem('pwa-install-dismissed');
  if (lastDismissed) {
    const dismissedTime = parseInt(lastDismissed, 10);
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    if (dismissedTime > weekAgo) {
      return null;
    }
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  return (
    <div
      className={`pwa-install-prompt ${
        isIOS ? 'pwa-install-prompt--ios' : ''
      } ${isAndroid ? 'pwa-install-prompt--android' : ''}`}
    >
      <button
        className="pwa-install-prompt__close"
        onClick={handleDismiss}
        aria-label="Close install prompt"
      >
        ✕
      </button>

      <div className="pwa-install-prompt__content">
        <div className="pwa-install-prompt__header">
          <div className="app-icon">GC</div>
          <div>
            <h3 className="pwa-install-prompt__title">Install Go Champs</h3>
            <p className="pwa-install-prompt__description">
              Get quick access and a better experience with our app!
            </p>
          </div>
        </div>

        {deferredPrompt ? (
          <div className="pwa-install-prompt__actions">
            <button
              className="pwa-install-prompt__button"
              onClick={handleDismiss}
            >
              Not now
            </button>
            <button
              className="pwa-install-prompt__button pwa-install-prompt__button--primary"
              onClick={handleInstallClick}
            >
              Install
            </button>
          </div>
        ) : isIOS ? (
          <div className="pwa-install-prompt__instructions">
            <p>To install this app on your device:</p>
            <span className="step">
              1. Tap the <strong>Share</strong> button at the bottom
            </span>
            <span className="step">
              2. Select <strong>"Add to Home Screen"</strong>
            </span>
            <span className="step">
              3. Tap <strong>"Add"</strong> to confirm
            </span>
          </div>
        ) : (
          <div className="pwa-install-prompt__instructions">
            <p>To install this app:</p>
            <span className="step">
              1. Tap the <strong>menu</strong> (⋮) in your browser
            </span>
            <span className="step">
              2. Select <strong>"Add to Home screen"</strong>
            </span>
            <span className="step">
              3. Tap <strong>"Add"</strong> to confirm
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
