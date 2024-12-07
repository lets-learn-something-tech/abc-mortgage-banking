import { fetchTransactions } from '../redux/actions/transactionActions';
import { TRANSACTIONS_LOADING, TRANSACTIONS_SUCCESS, TRANSACTIONS_ERROR } from '../redux/actions/types';

global.fetch = jest.fn();

describe('fetchTransactions action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch TRANSACTIONS_LOADING before fetching', async () => {
    const dispatch = jest.fn();
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([]),
    });

    const fromAccount = '123456';
    const toAccount = '654321';

    await fetchTransactions(fromAccount, toAccount)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: TRANSACTIONS_LOADING });
  });

  it('should dispatch TRANSACTIONS_SUCCESS with filtered data on success', async () => {
    const dispatch = jest.fn();
    const mockData = [
      { transactionId: '1', fromAccount: '123456', toAccount: '654321', amount: 100 },
      { transactionId: '2', fromAccount: '123456', toAccount: '999999', amount: 200 },
    ];

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const fromAccount = '123456';
    const toAccount = '654321';

    await fetchTransactions(fromAccount, toAccount)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: TRANSACTIONS_SUCCESS,
      payload: [{ transactionId: '1', fromAccount: '123456', toAccount: '654321', amount: 100 }],
    });
  });

  it('should dispatch TRANSACTIONS_ERROR on failure', async () => {
    const dispatch = jest.fn();

    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch data'));

    const fromAccount = '123456';
    const toAccount = '654321';

    await fetchTransactions(fromAccount, toAccount)(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: TRANSACTIONS_ERROR,
      error: 'Failed to load transactions',
    });
  });
});
