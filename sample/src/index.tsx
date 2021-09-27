import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeStore } from 'react-redux-plus'
import { Provider } from 'react-redux'

const initialStore = {
  paramA: "Test",
  paramB: true
}
const store = initializeStore(initialStore)
export type storeType = typeof initialStore

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);