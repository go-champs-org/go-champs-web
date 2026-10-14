import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar, hasBrokenLoad } from './Avatar';

const settledImage = (complete: boolean, naturalWidth: number) =>
  ({ complete, naturalWidth }) as HTMLImageElement;

describe('hasBrokenLoad', () => {
  it('is false when there is no image', () => {
    expect(hasBrokenLoad(null)).toBe(false);
  });

  it('is false while the image is still loading', () => {
    expect(hasBrokenLoad(settledImage(false, 0))).toBe(false);
  });

  it('is false when the image loaded', () => {
    expect(hasBrokenLoad(settledImage(true, 40))).toBe(false);
  });

  it('is true when the image settled without any pixels', () => {
    expect(hasBrokenLoad(settledImage(true, 0))).toBe(true);
  });
});

describe('Avatar', () => {
  it('renders the logo when present', () => {
    render(
      <Avatar name="Clube Ginástico Gaúcho" logoUrl="https://cdn.example.com/logo.png" size={40} />
    );

    const img = screen.getByRole('img', { name: 'Clube Ginástico Gaúcho' });
    expect(img).toHaveAttribute('src', 'https://cdn.example.com/logo.png');
  });

  it('falls back to initials when there is no logo', () => {
    render(<Avatar name="Clube Ginástico Gaúcho" logoUrl="" size={40} />);

    expect(screen.getByText('CGG')).toBeInTheDocument();
  });

  it('falls back to initials when the logo fails to load', () => {
    render(
      <Avatar name="Clube Ginástico Gaúcho" logoUrl="https://cdn.example.com/gone.png" size={40} />
    );

    fireEvent.error(screen.getByRole('img', { name: 'Clube Ginástico Gaúcho' }));

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('CGG')).toBeInTheDocument();
  });

  it('falls back to initials when the logo already failed before mounting', () => {
    const complete = jest.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true);

    render(
      <Avatar name="Clube Ginástico Gaúcho" logoUrl="https://cdn.example.com/gone.png" size={40} />
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('CGG')).toBeInTheDocument();
    complete.mockRestore();
  });
});
