import React from 'react';
import { useGet, setValue } from 'react-redux-plus'
import { storeType } from '.';

function App() {

  const paramB = useGet<storeType>('paramB')
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
