import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AthleteProfileEntity } from '../../AthleteProfiles/state';
import {
  generateStoryImage,
  downloadImage
} from '../../AthleteProfiles/storyGenerator';
import { displayToast } from '../bulma/toast';

interface ShareButtonProps {
  athleteProfile: AthleteProfileEntity;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  athleteProfile,
  className = ''
}) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);

  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const hasWebShareAPI = 'share' in navigator;

  const handleShare = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    displayToast(t('generatingStory'), 'is-primary');

    try {
      // Generate the story image
      const imageBlob = await generateStoryImage(
        athleteProfile,
        {
          recentTournaments: t('recentTournaments'),
          noTournamentsYet: t('noTournamentsYet'),
          checkOutMoreAthletes: t('checkOutMoreAthletes')
        },
        {
          width: 1080,
          height: 1920,
          format: 'png',
          quality: 0.9
        }
      );

      const fileName = `${athleteProfile.name.replace(
        /[^a-zA-Z0-9]/g,
        '_'
      )}_profile_story.png`;

      // Try Web Share API first (mobile priority)
      if (hasWebShareAPI && isMobile) {
        try {
          const file = new File([imageBlob], fileName, { type: 'image/png' });
          await navigator.share({
            title: `${athleteProfile.name}'s Athlete Profile`,
            text: `Check out ${athleteProfile.name}'s athlete profile on Go Champs!`,
            files: [file]
          });

          displayToast(t('storyShared'), 'is-success');

          // Track analytics
          if (window.gtag) {
            window.gtag('event', 'share_story', {
              method: 'web_share_api',
              content_type: 'athlete_profile',
              item_id: athleteProfile.username
            });
          }

          return;
        } catch (shareError) {
          console.warn('Web Share API failed:', shareError);
          // Fall through to download fallback
        }
      }

      // Fallback: Download the image
      downloadImage(imageBlob, fileName);
      displayToast(t('storyDownloaded'), 'is-success');

      // Track analytics
      if (window.gtag) {
        window.gtag('event', 'share_story', {
          method: 'download',
          content_type: 'athlete_profile',
          item_id: athleteProfile.username
        });
      }
    } catch (error) {
      console.error('Failed to generate story:', error);
      displayToast(t('shareError'), 'is-danger');

      // Track analytics
      if (window.gtag) {
        window.gtag('event', 'share_story_error', {
          content_type: 'athlete_profile',
          item_id: athleteProfile.username,
          error_message:
            error instanceof Error ? error.message : 'Unknown error'
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Don't render on desktop
  if (!isMobile) {
    return null;
  }

  return (
    <button
      onClick={handleShare}
      disabled={isGenerating}
      className="button is-small is-info is-rounded share-button"
      aria-label={t('shareStory')}
      title={t('shareStory')}
    >
      <span className="icon is-small">
        <i
          className={`fas ${
            isGenerating ? 'fa-spinner fa-spin' : 'fa-share-alt'
          }`}
        />
      </span>

      <span>{t('shareStory')}</span>
    </button>
  );
};

export default ShareButton;
