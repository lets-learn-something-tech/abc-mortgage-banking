import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/actions/transactionActions';

const useTransactions = ({ fromAccount, toAccount }) => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.transaction);

  useEffect(() => {
    if (fromAccount && toAccount) {
      dispatch(fetchTransactions(fromAccount, toAccount));
    }
  }, [dispatch, fromAccount, toAccount]);

  const filteredTransactions = transactions
    .filter((transaction) => transaction.fromAccount === fromAccount && transaction.toAccount === toAccount)
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    .slice(0, 5);

  return { transactions: filteredTransactions, loading, error };
};

export default useTransactions;
