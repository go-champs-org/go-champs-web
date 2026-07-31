import { render, screen } from '@testing-library/react';
import RootPage from './page';

describe('RootPage', () => {
  it('renders', () => {
    render(<RootPage />);
    expect(screen.getByTestId('root-page')).toBeInTheDocument();
  });
});
