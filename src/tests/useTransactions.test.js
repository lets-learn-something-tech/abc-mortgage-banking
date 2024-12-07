import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../redux/reducers';
import useTransactions from '../hooks/useTransactions';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('useTransactions hook', () => {
  it('should return initial state before transactions are fetched', () => {
    const { result } = renderHook(() => useTransactions({ fromAccount: '1234567890', toAccount: '9876543210' }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.transactions).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should return filtered transactions based on fromAccount and toAccount', async () => {
    const mockData = [
      { transactionId: 1, fromAccount: '1234567890', toAccount: '9876543210', amount: 1000, dateTime: '2024-11-01T12:34:56Z' },
      { transactionId: 2, fromAccount: '1234567890', toAccount: '9876543210', amount: 500, dateTime: '2024-11-05T10:20:30Z' },
      { transactionId: 3, fromAccount: '1234567890', toAccount: '1122334455', amount: 2000, dateTime: '2024-10-15T09:15:00Z' },
      { transactionId: 4, fromAccount: '1234567890', toAccount: '9876543210', amount: 3000, dateTime: '2024-11-03T08:50:40Z' },
      { transactionId: 5, fromAccount: '1234567890', toAccount: '9876543210', amount: 1500, dateTime: '2024-11-07T14:00:30Z' },
      { transactionId: 6, fromAccount: '1234567890', toAccount: '9876543210', amount: 1200, dateTime: '2024-11-02T11:25:10Z' },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { result, waitForNextUpdate } = renderHook(() => useTransactions({ fromAccount: '1234567890', toAccount: '9876543210' }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitForNextUpdate();

    expect(result.current.transactions).toEqual([
      { transactionId: 5, fromAccount: '1234567890', toAccount: '9876543210', amount: 1500, dateTime: '2024-11-07T14:00:30Z' },
      { transactionId: 2, fromAccount: '1234567890', toAccount: '9876543210', amount: 500, dateTime: '2024-11-05T10:20:30Z' },
      { transactionId: 4, fromAccount: '1234567890', toAccount: '9876543210', amount: 3000, dateTime: '2024-11-03T08:50:40Z' },
      { transactionId: 1, fromAccount: '1234567890', toAccount: '9876543210', amount: 1000, dateTime: '2024-11-01T12:34:56Z' },
      { transactionId: 6, fromAccount: '1234567890', toAccount: '9876543210', amount: 1200, dateTime: '2024-11-02T11:25:10Z' },
    ]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors when fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Failed to load transactions'));

    const { result, waitForNextUpdate } = renderHook(() => useTransactions({ fromAccount: '1234567890', toAccount: '9876543210' }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitForNextUpdate();

    expect(result.current.transactions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to load transactions');
  });
});
