import { render, screen } from '@testing-library/react';
import { ProfileBanner } from './ProfileBanner';

describe('ProfileBanner', () => {
  it('renders its children over the accessory overlay', () => {
    render(
      <ProfileBanner testId="team-banner" className="p-5">
        <p>Identity</p>
      </ProfileBanner>
    );

    expect(screen.getByTestId('team-banner')).toBeInTheDocument();
    expect(screen.getByText('Identity')).toBeInTheDocument();
  });

  it('renders as a decorative strip with no content', () => {
    render(<ProfileBanner as="div" className="h-16" ariaHidden />);

    const strip = document.querySelector('[aria-hidden="true"]');
    expect(strip).toBeInTheDocument();
  });
});
