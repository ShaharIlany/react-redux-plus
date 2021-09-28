import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { initializeStore } from './react-redux-plus-debug'

export const { store, useStateValue } = initializeStore({
  paramA: { a: 1, b: 'asd', loggedIn: true },
  paramB: true,
  loggedIn: false,
  paramD: {
    a: 1,
    b: 'asd',
    login: true,
    d: {
      a: 1,
      b: 2
    }
  },
}, {
  paramA: {
    set: (current, input) => { return input.target.value },
    inputB: (current, input: { target: { value: string } }) => { return { ...current, b: input.target.value } },
    incrementA: (current) => {
      return { ...current, a: current.a + 1 }
    },
    reset: { a: 0, b: 'asd', loggedIn: true }
  },
  loggedIn: {
    login: true
  },
  paramB: {
    toggle: (current) => {
      return !current
    },
    set: (current, newValue) => {
      return newValue
    },
    falsify: false
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