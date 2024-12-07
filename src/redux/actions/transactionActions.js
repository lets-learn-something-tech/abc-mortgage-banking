export const fetchTransactions = (fromAccount, toAccount) => {
  return async (dispatch) => {
    dispatch({ type: 'TRANSACTIONS_LOADING' });

    try {
      const url = new URL('http://localhost:5000/transactions');
      const params = new URLSearchParams();

      params.append('fromAccount', fromAccount);
      params.append('toAccount', toAccount);
      params.append('_limit', 5);
      params.append('_sort', 'date');
      params.append('_order', 'desc');

      const response = await fetch(`${url}?${params.toString()}`);
      const data = await response.json();

      dispatch({
        type: 'TRANSACTIONS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_ERROR',
        error: 'Failed to load transactions',
      });
    }
  };
};
