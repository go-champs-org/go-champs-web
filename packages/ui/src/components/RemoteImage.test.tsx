import { render, screen } from '@testing-library/react';
import { RemoteImage } from './RemoteImage';

describe('RemoteImage', () => {
  it('renders a lazy-loaded, async-decoded image with the given attributes', () => {
    render(
      <RemoteImage
        src="https://cdn.example.com/logo.png"
        alt="Team logo"
        width={28}
        height={28}
        className="rounded-full object-cover"
      />
    );

    const img = screen.getByRole('img', { name: 'Team logo' });
    expect(img).toHaveAttribute('src', 'https://cdn.example.com/logo.png');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
    expect(img.className).toContain('rounded-full');
  });
});
