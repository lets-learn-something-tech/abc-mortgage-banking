import { calculateBalance } from '../utils/balanceCalculator';

describe('calculateBalance', () => {
  
  it('should return the initial balance when no transactions are provided', () => {
    const initialBalance = 1000;
    const transactions = [];

    const result = calculateBalance(transactions, initialBalance);
    expect(result).toBe(initialBalance);
  });

  it('should calculate balance correctly for a list of positive transactions', () => {
    const initialBalance = 500;
    const transactions = [
      { transactionId: '1', amount: 100 },
      { transactionId: '2', amount: 200 },
    ];

    const result = calculateBalance(transactions, initialBalance);
    expect(result).toBe(800);
  });

  it('should calculate balance correctly for a list of negative transactions', () => {
    const initialBalance = 1000;
    const transactions = [
      { transactionId: '1', amount: -100 },
      { transactionId: '2', amount: -200 },
    ];

    const result = calculateBalance(transactions, initialBalance);
    expect(result).toBe(700);
  });

  it('should calculate balance correctly when transactions have both positive and negative amounts', () => {
    const initialBalance = 500;
    const transactions = [
      { transactionId: '1', amount: 100 },
      { transactionId: '2', amount: -50 },
      { transactionId: '3', amount: 200 },
    ];

    const result = calculateBalance(transactions, initialBalance);
    expect(result).toBe(750);
  });

  it('should calculate balance correctly with no initial balance (default value)', () => {
    const transactions = [
      { transactionId: '1', amount: 100 },
      { transactionId: '2', amount: -50 },
    ];

    const result = calculateBalance(transactions);
    expect(result).toBe(50);
  });

  it('should calculate balance correctly for a single transaction', () => {
    const initialBalance = 100;
    const transactions = [
      { transactionId: '1', amount: 50 },
    ];

    const result = calculateBalance(transactions, initialBalance);
    expect(result).toBe(150);
  });

  it('should handle transactions with zero amount correctly', () => {
    const initialBalance = 500;
    const transactions = [
      { transactionId: '1', amount: 0 },
      { transactionId: '2', amount: 0 },
    ];

    const result = calculateBalance(transactions, initialBalance);
    expect(result).toBe(500);
  });

});
