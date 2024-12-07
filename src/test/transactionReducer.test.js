import transactionReducer from '../redux/reducers/transactionReducer';
import { TRANSACTIONS_LOADING, TRANSACTIONS_SUCCESS } from '../redux/actions/types';

describe('transactionReducer', () => {
  
  it('should return the initial state', () => {
    const initialState = {
      transactions: [],
      loading: false,
    };
    const result = transactionReducer(undefined, {});
    expect(result).toEqual(initialState);
  });

  it('should handle TRANSACTIONS_LOADING action', () => {
    const loadingState = {
      transactions: [],
      loading: true,
    };
    const action = {
      type: TRANSACTIONS_LOADING,
      payload: true,
    };
    const result = transactionReducer(undefined, action);
    expect(result).toEqual(loadingState);
  });

  it('should handle TRANSACTIONS_SUCCESS action', () => {
    const transactionsSuccessState = {
      transactions: [
        { transactionId: '1', amount: 100, fromAccount: '123', toAccount: '456' },
        { transactionId: '2', amount: 200, fromAccount: '789', toAccount: '101' },
      ],
      loading: false,
    };
    const action = {
      type: TRANSACTIONS_SUCCESS,
      payload: [
        { transactionId: '1', amount: 100, fromAccount: '123', toAccount: '456' },
        { transactionId: '2', amount: 200, fromAccount: '789', toAccount: '101' },
      ],
    };
    const result = transactionReducer(undefined, action);
    expect(result).toEqual(transactionsSuccessState);
  });

  it('should return the current state for an unknown action type', () => {
    const currentState = {
      transactions: [],
      loading: false,
    };
    const action = { type: 'UNKNOWN_ACTION' };
    const result = transactionReducer(currentState, action);
    expect(result).toEqual(currentState);
  });
});
