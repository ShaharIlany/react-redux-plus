import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeStore } from 'react-redux-plus'
import { Provider } from 'react-redux';

const store = initializeStore({
  paramA: "Test",
  paramB: true
})

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);