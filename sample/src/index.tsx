import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeStore } from 'react-redux-plus'

const initialStore = {
  paramA: "Test",
  paramB: true
}
const store = initializeStore(initialStore)
export type storeType = typeof initialStore

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);