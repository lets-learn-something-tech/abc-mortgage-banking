import { render, screen, fireEvent } from '@testing-library/react';
import Transactions from '../components/Transactions';
import * as useTransactions from '../hooks/useTransactions';
import * as balanceCalculator from '../utils/balanceCalculator';
import * as dateTimeFormatter from '../utils/dateTimeFormatter';

jest.mock('../hooks/useTransactions');
jest.mock('../utils/balanceCalculator');
jest.mock('../utils/dateTimeFormatter');

const mockTransactions = [
  {
    transactionId: 'T1',
    fromAccount: '1234567890',
    toAccount: '9876543210',
    amount: 1000,
    dateTime: '2024-12-07T12:00:00Z',
  },
  {
    transactionId: 'T2',
    fromAccount: '1234567890',
    toAccount: '9876543210',
    amount: 500,
    dateTime: '2024-12-06T12:00:00Z',
  },
];

balanceCalculator.calculateBalance = jest.fn(() => 1500.00);

dateTimeFormatter.formatDateToLocale = jest.fn((date) => `Formatted: ${date}`);

describe('Transactions Component', () => {

  beforeEach(() => {
    useTransactions.mockReturnValue({
      transactions: mockTransactions,
      loading: false,
      error: null,
    });
  });

  it('should render transaction details when data is available', () => {
    render(<Transactions />);

    expect(screen.getByText(/from account/i)).toBeInTheDocument();
    expect(screen.getByText(/to account/i)).toBeInTheDocument();

    expect(screen.getByText('Transaction Summary')).toBeInTheDocument();

    expect(screen.getByText('T1')).toBeInTheDocument();
    expect(screen.getByText('T2')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2024-12-07T12:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2024-12-06T12:00:00Z')).toBeInTheDocument();

    expect(screen.getByText('Closing Balance in 1234567890:')).toBeInTheDocument();
    expect(screen.getByText('$1500.00')).toBeInTheDocument();
  });

  it('should display loading message when loading is true', () => {
    useTransactions.mockReturnValue({
      transactions: [],
      loading: true,
      error: null,
    });

    render(<Transactions />);

    expect(screen.getByText(/loading transactions.../i)).toBeInTheDocument();
  });

  it('should display error message when error is present', () => {
    useTransactions.mockReturnValue({
      transactions: [],
      loading: false,
      error: 'Failed to fetch transactions',
    });

    render(<Transactions />);

    expect(screen.getByText('Failed to fetch transactions')).toBeInTheDocument();
  });

  it('should show "No records found" when no transactions are available', () => {
    useTransactions.mockReturnValue({
      transactions: [],
      loading: false,
      error: null,
    });

    render(<Transactions />);

    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('should update fromAccount state when input changes', () => {
    render(<Transactions />);

    const fromAccountInput = screen.getByPlaceholderText('From Account');
    fireEvent.change(fromAccountInput, { target: { value: '1111111111' } });

    expect(fromAccountInput.value).toBe('1111111111');
  });

  it('should update toAccount state when input changes', () => {
    render(<Transactions />);

    const toAccountInput = screen.getByPlaceholderText('To Account');
    fireEvent.change(toAccountInput, { target: { value: '2222222222' } });

    expect(toAccountInput.value).toBe('2222222222');
  });

  it('should render the correct date format in the table', () => {
    render(<Transactions />);

    expect(screen.getByText('Formatted: 2024-12-07T12:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2024-12-06T12:00:00Z')).toBeInTheDocument();
  });

});
