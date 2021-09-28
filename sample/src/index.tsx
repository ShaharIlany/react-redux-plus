import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeStore } from './store'
import { Provider } from 'react-redux'

export const { store, useStateValue } = initializeStore({
  paramA: "Test",
  paramB: true
}, {
  paramB: {
    toggle: (current) => {
      return !current
    }
  },
  paramA: {
    set: (current) => { return "none" }
  }
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);