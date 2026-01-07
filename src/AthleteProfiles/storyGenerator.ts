// @ts-ignore: html2canvas types not properly resolved
import html2canvas from 'html2canvas';
import { AthleteProfileEntity } from './state';

const convertImageToDataURL = async (imageUrl: string): Promise<string> => {
  // If it's already a data URL, return it as-is
  if (imageUrl.startsWith('data:')) {
    return imageUrl;
  }

  try {
    console.log('Fetching image:', imageUrl);

    // Use fetch to download the image
    const response = await fetch(imageUrl, { mode: 'no-cors' });

    if (!response.ok) {
      console.warn(`Failed to fetch image (${response.status}):`, imageUrl);
      return imageUrl; // Fallback to original URL
    }

    const blob = await response.blob();
    console.log('Image blob received:', blob.type, blob.size, 'bytes');

    // Convert blob to data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        console.log('Converted to data URL:', dataUrl.substring(0, 50) + '...');
        resolve(dataUrl);
      };
      reader.onerror = () => {
        console.warn('FileReader error, using original URL');
        resolve(imageUrl); // Fallback to original URL
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('Fetch failed, using original URL:', error);
    return imageUrl; // Fallback to original URL
  }
};

export interface StoryGenerationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'png' | 'jpeg';
}

const DEFAULT_OPTIONS: StoryGenerationOptions = {
  width: 1080,
  height: 1920,
  quality: 0.9,
  format: 'png'
};

export const generateStoryImage = async (
  athleteProfile: AthleteProfileEntity,
  translations: {
    recentTournaments: string;
    noTournamentsYet: string;
    checkOutMoreAthletes: string;
  },
  options: StoryGenerationOptions = {}
): Promise<Blob> => {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };

  // Create a temporary container for the story template
  const storyContainer = document.createElement('div');
  storyContainer.id = 'story-template-container';
  storyContainer.style.position = 'absolute';
  storyContainer.style.left = '-9999px';
  storyContainer.style.top = '-9999px';
  storyContainer.style.width = `${finalOptions.width}px`;
  storyContainer.style.height = `${finalOptions.height}px`;
  storyContainer.style.backgroundColor = '#a6cd63'; // Use solid turquoise color
  storyContainer.style.padding = '40px';
  storyContainer.style.boxSizing = 'border-box';
  storyContainer.style.fontFamily = 'Arial, sans-serif';
  storyContainer.style.color = '#363636';
  storyContainer.style.overflow = 'hidden';

  document.body.appendChild(storyContainer);

  try {
    // Pre-convert images to data URLs for better compatibility
    const photoUrl =
      athleteProfile.photoUrl || '/src/Players/PlayerPhotoPlaceholder.png';
    const logoUrl = '/logo-with-name-black.png';

    console.log('Converting images to data URLs...', { photoUrl, logoUrl });

    const [photoDataUrl, logoDataUrl] = await Promise.all([
      convertImageToDataURL(photoUrl),
      convertImageToDataURL(logoUrl)
    ]);

    console.log('Image conversion complete', {
      photoConverted: photoDataUrl !== photoUrl,
      logoConverted: logoDataUrl !== logoUrl
    });

    // Generate the story content with processed URLs
    const storyHTML = generateStoryHTML(
      athleteProfile,
      translations,
      finalOptions,
      { photoDataUrl, logoDataUrl }
    );

    console.log('Generated HTML content length:', storyHTML.length);
    console.log('HTML preview:', storyHTML.substring(0, 200) + '...');

    storyContainer.innerHTML = storyHTML;

    // Wait for images to load
    await waitForImagesToLoad(storyContainer);

    // Generate the canvas image
    console.log('Starting html2canvas rendering...');
    const canvas = await html2canvas(storyContainer, {
      width: finalOptions.width,
      height: finalOptions.height,
      scale: 1,
      useCORS: true, // Since we're using data URLs, we don't need CORS
      allowTaint: false, // Data URLs shouldn't cause tainting
      backgroundColor: '#a6cd63', // Set background color explicitly
      logging: false, // Disable html2canvas logging
      removeContainer: false // We'll handle cleanup ourselves
    });

    console.log(
      'html2canvas completed, canvas size:',
      canvas.width,
      'x',
      canvas.height
    );

    // Convert canvas to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob: Blob | null) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to generate story image blob'));
          }
        },
        `image/${finalOptions.format}`,
        finalOptions.quality
      );
    });
  } finally {
    // Clean up the temporary container
    document.body.removeChild(storyContainer);
  }
};

const generateStoryHTML = (
  athleteProfile: AthleteProfileEntity,
  translations: {
    recentTournaments: string;
    noTournamentsYet: string;
    checkOutMoreAthletes: string;
  },
  options: StoryGenerationOptions,
  imageUrls: {
    photoDataUrl: string;
    logoDataUrl: string;
  }
): string => {
  const tournaments = athleteProfile.tournaments || [];

  let tournamentsHTML = '';
  if (tournaments.length > 0) {
    const tournamentItems = tournaments
      .slice(0, 5)
      .map(tournament => {
        const orgName = tournament.organization
          ? tournament.organization.name
          : '';
        const orgDiv = orgName
          ? `<div style="font-size: 16px; color: #4a4a4a; margin-top: 5px;">${orgName}</div>`
          : '';
        return `<div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; text-align: left;">
        <div style="font-size: 20px; font-weight: bold; color: #363636;">${tournament.name}</div>
        ${orgDiv}
      </div>`;
      })
      .join('');

    tournamentsHTML = `
      <div style="margin-top: 40px;">
        <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #363636;">${translations.recentTournaments}</h3>
        <div style="display: flex; flex-direction: column; gap: 15px; max-height: 400px; overflow: hidden;">
          ${tournamentItems}
        </div>
      </div>
    `;
  } else {
    tournamentsHTML = `
      <div style="margin-top: 40px;">
        <p style="font-size: 18px; color: #4a4a4a; font-style: italic;">${translations.noTournamentsYet}</p>
      </div>
    `;
  }

  return `
    <div style="display: flex; flex-direction: column; height: 100%; justify-content: space-between;">
      <!-- Header with branding -->
      <div style="text-align: center; margin-bottom: 40px;">
        <img 
          src="${imageUrls.logoDataUrl}" 
          alt="Go Champs"
          style="height: 175px; width: auto;"
        />
      </div>
      
      <!-- Athlete profile section -->
      <div style="text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center;">
        <div style="margin-bottom: 30px;">
          <img
            src="${imageUrls.photoDataUrl}"
            crossorigin="anonymous"
            alt="${athleteProfile.name} profile"
            style="width: 300px; height: 300px; border-radius: 50%; object-fit: cover; border: 5px solid #363636; margin-bottom: 20px;"
          />
          <h2 style="font-size: 36px; font-weight: bold; margin: 0; color: #363636;">${athleteProfile.name}</h2>
        </div>
        
        <!-- Tournaments section -->
        ${tournamentsHTML}
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; margin-top: 40px;">
        <p style="font-size: 16px; color: #4a4a4a; margin: 0;">${translations.checkOutMoreAthletes}</p>
      </div>
    </div>
  `;
};

const waitForImagesToLoad = (container: HTMLElement): Promise<void> => {
  const images = container.querySelectorAll('img');
  const promises = Array.from(images).map(img => {
    return new Promise<void>(resolve => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve even on error to not block the process
      }
    });
  });

  return Promise.all(promises).then(() => {});
};

export const downloadImage = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
