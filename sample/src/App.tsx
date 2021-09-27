import React from 'react';
import { useSelector } from 'react-redux';
import { setValue } from 'react-redux-plus'
import { storeType } from '.';

function App() {

  const paramB = useSelector<storeType>(state => state.paramB)
  const setParamB = setValue<storeType>('paramB')

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <br />
          {paramB ? 'True' : 'False'}
          <br />
          <button onClick={() => {
            setParamB(!paramB)
          }}>Toggle</button>
        </p>
      </header>
    </div>
  );
}

export default App;
