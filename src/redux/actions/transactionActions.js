export const fetchTransactions = (fromAccount, toAccount) => {
  return async (dispatch) => {
    dispatch({ type: 'TRANSACTIONS_LOADING' });

    try {
      const response = await fetch('http://localhost:5000/transactions');
      const data = await response.json();

      const filteredData = data.filter(
        (transaction) => transaction.fromAccount === fromAccount && transaction.toAccount === toAccount
      );

      dispatch({
        type: 'TRANSACTIONS_SUCCESS',
        payload: filteredData,
      });
    } catch (error) {
      dispatch({
        type: 'TRANSACTIONS_ERROR',
        error: 'Failed to load transactions',
      });
    }
  };
};

