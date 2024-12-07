import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('./components/Transactions', () => {
  return () => <div>Transactions Component</div>;
});

describe('App Component', () => {
  it('should render the app header correctly', () => {
    render(<App />);
    const header = screen.getByRole('heading', { name: /abc mortgage banking/i });
    expect(header).toBeInTheDocument();
  });

  it('should render the Transactions component', () => {
    render(<App />);
    const transactionsComponent = screen.getByText('Transactions Component');
    expect(transactionsComponent).toBeInTheDocument();
  });

  it('should render the footer with correct text', () => {
    render(<App />);
    const footer = screen.getByRole('heading', { name: /© 2024 abc mortgage banking/i });
    expect(footer).toBeInTheDocument();
  });

  it('should render main content correctly', () => {
    render(<App />);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should have a valid app structure with header, footer, and main', () => {
    render(<App />);

    const header = screen.getByRole('heading', { name: /abc mortgage banking/i });
    const footer = screen.getByRole('heading', { name: /© 2024 abc mortgage banking/i });
    const main = screen.getByRole('main');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
