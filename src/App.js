import React from 'react';
import Transactions from './components/Transactions';
import './styles/App.scss';

const App = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h3>ABC Mortgage Banking</h3>
      </header>
      
      <main>
        <Transactions />
      </main>

      <footer className="app-footer">
        <h5>© 2024 ABC Mortgage Banking</h5>
      </footer>
    </div>
  );
};

export default App;
