import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeStore } from './store'
import { Provider } from 'react-redux'

export const { store, useValue } = initializeStore({
  paramA: "Test",
  paramB: true
}, {
  paramA: {
    set: (current, value: string) => {
      return value
    }
  },
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);