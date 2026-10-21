import { fireEvent, render, screen } from '@testing-library/react';
import { StatLeadersCarousel } from './StatLeadersCarousel';

// jsdom lays nothing out: the row's sizes and the scroll are stubbed per test.
const stubLayout = (row: HTMLElement, layout: { scrollLeft: number; clientWidth: number; scrollWidth: number }) => {
  Object.entries(layout).forEach(([property, value]) => {
    Object.defineProperty(row, property, { configurable: true, value });
  });
};

const renderCarousel = () => {
  render(
    <StatLeadersCarousel previousLabel="Destaques anteriores" nextLabel="Mais destaques">
      <section>Pontos</section>
      <section>Rebotes</section>
    </StatLeadersCarousel>
  );

  return screen.getByText('Pontos').parentElement as HTMLElement;
};

describe('StatLeadersCarousel', () => {
  it('offers no arrows when every card fits', () => {
    renderCarousel();

    expect(screen.queryByRole('button', { name: 'Mais destaques' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Destaques anteriores' })).not.toBeInTheDocument();
  });

  it('offers the next arrow while cards are left to the right, and slides a whole fold', () => {
    const row = renderCarousel();
    row.scrollBy = jest.fn();

    stubLayout(row, { scrollLeft: 0, clientWidth: 600, scrollWidth: 1200 });
    fireEvent.scroll(row);

    expect(screen.queryByRole('button', { name: 'Destaques anteriores' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mais destaques' }));

    expect(row.scrollBy).toHaveBeenCalledWith({ left: 600, behavior: 'smooth' });
  });

  it('offers the previous arrow once scrolled, and none forward at the end', () => {
    const row = renderCarousel();
    row.scrollBy = jest.fn();

    stubLayout(row, { scrollLeft: 600, clientWidth: 600, scrollWidth: 1200 });
    fireEvent.scroll(row);

    expect(screen.queryByRole('button', { name: 'Mais destaques' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Destaques anteriores' }));

    expect(row.scrollBy).toHaveBeenCalledWith({ left: -600, behavior: 'smooth' });
  });
});
