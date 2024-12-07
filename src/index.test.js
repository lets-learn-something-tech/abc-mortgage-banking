import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store'; // Mock the Redux store
import App from './App'; // The main App component

// You can directly test the rendering using the store provided by the Redux provider

describe('Index Entry Point', () => {
  it('renders the App component within Redux Provider', () => {
    // Create a root element in the test environment to render
    const div = document.createElement('div');
    const root = ReactDOM.createRoot(div);

    // Render the App wrapped in the Redux Provider
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check if content rendered by App is present
    expect(screen.getByText('ABC Mortgage Banking')).toBeInTheDocument(); // Example text to verify if App is rendered correctly
  });
});
