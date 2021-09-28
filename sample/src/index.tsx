import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { initializeStore } from 'react-redux-plus'

export const { store, useStateValue } = initializeStore({
  paramA: "This is another test, change me!",
  paramB: true,
  loggedIn: false,
}, {
  paramA: {
    set: (current, input) => { return input.target.value },
    reset: "This is another test, change me!"
  },
  paramB: {
    toggle: (current) => {
      return !current
    },
  },
  loggedIn: {
    login: true,
    logout: false
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