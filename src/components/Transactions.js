// src/components/Transactions.js
import React, { useState } from 'react';
import useTransactions from '../hooks/useTransactions';
import { calculateBalance } from '../utils/balanceCalculator';
import { formatDateToLocale } from '../utils/dateTimeFormatter';
import Table from './Table';
import '../styles/Transactions.scss';

const Transactions = () => {
  const [fromAccount, setFromAccount] = useState('1234567890');
  const [toAccount, setToAccount] = useState('9876543210');
  const { transactions, loading, error } = useTransactions({ fromAccount, toAccount });

  const balance = calculateBalance(transactions);

  const columns = [
    {
      Header: 'Transaction ID',
      accessor: 'transactionId',
      disableFilters: false,
    },
    {
      Header: 'From Account',
      accessor: 'fromAccount',
      disableFilters: false,
    },
    {
      Header: 'To Account',
      accessor: 'toAccount',
      disableFilters: false,
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      disableFilters: false,
    },
    {
      Header: 'Date & Time',
      accessor: 'dateTime',
      disableFilters: false,
      formatter: formatDateToLocale,
      Cell: ({ value, column }) => {
        if (column.formatter) {
          return column.formatter(value);
        }
        return value;
      },
    },
  ];

  return (
    <div className="transactions">
      <div className="section">
        <h4 className="sectionHeader">From account:</h4>
        <input
          type="text"
          placeholder="From Account"
          value={fromAccount}
          onChange={(e) => setFromAccount(e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="section">
        <h4 className="sectionHeader">To account:</h4>
        <input
          type="text"
          placeholder="To Account"
          value={toAccount}
          onChange={(e) => setToAccount(e.target.value)}
          className="filter-input"
        />
      </div>

      {loading && <p>Loading transactions...</p>}
      {error && <p>{error}</p>}

      {transactions && transactions.length > 0 ? (
        <div>
          <h4 className="sectionHeader">Transaction Summary</h4>
          <Table columns={columns} data={transactions} />
      
          <div className="balance">
            <h4 className="sectionHeader">Closing Balance in {fromAccount}:</h4> <p>${balance.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <h4 className="no-records">No records found</h4>
      )}
    </div>
  );
};

export default Transactions;
