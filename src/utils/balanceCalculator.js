export const calculateBalance = (transactions, initialBalance = 0) => {
  return transactions.reduce((balance, transaction) => {
    const amount = transaction.amount;
    return balance + (amount < 0 ? amount : amount);
  }, initialBalance);
};
  