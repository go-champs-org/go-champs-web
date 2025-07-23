import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo-green.png';
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
  const { t } = useTranslation();

  useEffect(() => {
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)')
        .matches;
      const isWebview = (window.navigator as any).standalone === true;

      return isStandalone || isWebview;
    };

    setIsInstalled(checkIfInstalled());

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    const timer = setTimeout(() => {
      if (!isInstalled && !deferredPrompt) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isInStandaloneMode = (window.navigator as any).standalone;

        if (isIOS && !isInStandaloneMode) {
          setShowInstallPrompt(true);
        }
      }
    }, 3000);

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
      deferredPrompt.prompt();

      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null);
    }

    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (isInstalled || !showInstallPrompt) {
    return null;
  }

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
      className={`pwa-install-prompt ${isIOS ? 'ios' : ''} ${
        isAndroid ? 'android' : ''
      }`}
    >
      <button
        className="close"
        onClick={handleDismiss}
        aria-label="Close install prompt"
      >
        ✕
      </button>

      <div className="content">
        <div className="header">
          <div className="app-icon">
            <img src={logo} alt="Go Champs" className="logo" />
          </div>
          <div>
            <h3 className="title">
              {t('pwa.install.title', { keySeparator: '.' })}
            </h3>
            <p className="description">
              {t('pwa.install.description', { keySeparator: '.' })}
            </p>
          </div>
        </div>

        {deferredPrompt ? (
          <div className="actions">
            <button className="button" onClick={handleDismiss}>
              {t('pwa.install.dismiss', { keySeparator: '.' })}
            </button>
            <button className="button primary" onClick={handleInstallClick}>
              {t('pwa.install.button', { keySeparator: '.' })}
            </button>
          </div>
        ) : isIOS ? (
          <div className="instructions">
            <p>
              {t('pwa.install.instructions.ios.title', { keySeparator: '.' })}
            </p>
            <span className="step">
              1.{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: t('pwa.install.instructions.ios.step1', {
                    keySeparator: '.'
                  })
                }}
              />
            </span>
            <span className="step">
              2.{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: t('pwa.install.instructions.ios.step2', {
                    keySeparator: '.'
                  })
                }}
              />
            </span>
            <span className="step">
              3.{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: t('pwa.install.instructions.ios.step3', {
                    keySeparator: '.'
                  })
                }}
              />
            </span>
          </div>
        ) : (
          <div className="instructions">
            <p>
              {t('pwa.install.instructions.android.title', {
                keySeparator: '.'
              })}
            </p>
            <span className="step">
              1.{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: t('pwa.install.instructions.android.step1', {
                    keySeparator: '.'
                  })
                }}
              />
            </span>
            <span className="step">
              2.{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: t('pwa.install.instructions.android.step2', {
                    keySeparator: '.'
                  })
                }}
              />
            </span>
            <span className="step">
              3.{' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: t('pwa.install.instructions.android.step3', {
                    keySeparator: '.'
                  })
                }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
