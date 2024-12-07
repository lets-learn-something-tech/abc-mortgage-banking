import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import { Provider } from 'react-redux';
import store from './redux/store'; // Your Redux store
import App from './App'; // Your main App component

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
