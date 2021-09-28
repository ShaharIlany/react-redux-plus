import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { initializeStore } from 'react-redux-plus'

export const { store, useStateValue } = initializeStore({
  paramA: "This is another example, change me!",
  paramB: true
}, {
  paramB: {
    toggle: (current) => {
      return !current
    },
    set: (current, newValue) => {
      return true
    }
  },
  paramA: {
    set: (current, input) => { return input.target.value }
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