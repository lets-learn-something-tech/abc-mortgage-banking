import { render, screen } from '@testing-library/react';
import Table from '../components/Table';

const columns = [
  { label: 'Transaction ID', key: 'transactionId' },
  { label: 'From Account', key: 'fromAccount' },
  { label: 'To Account', key: 'toAccount' },
  { label: 'Amount', key: 'amount' },
  { label: 'Date & Time', key: 'dateTime' },
];

const data = [
  {
    transactionId: 1,
    fromAccount: '1234567890',
    toAccount: '9876543210',
    amount: 1000,
    dateTime: '2024-11-01T12:34:56Z',
  },
  {
    transactionId: 2,
    fromAccount: '1234567890',
    toAccount: '1122334455',
    amount: 500,
    dateTime: '2024-11-05T10:20:30Z',
  },
];

describe('Table Component with updated transaction structure', () => {
  it('should render table with updated transaction data', () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('From Account')).toBeInTheDocument();
    expect(screen.getByText('To Account')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Date & Time')).toBeInTheDocument();

    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('9876543210')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('2024-11-01T12:34:56Z')).toBeInTheDocument();
  });

  it('should render message when data is empty', () => {
    render(<Table columns={columns} data={[]} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
