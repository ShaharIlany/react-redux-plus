import React from 'react';
import { useValue } from '.'

function App() {

  const [paramB, modifyParamB] = useValue('paramB')

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <br />
          {paramB ? 'True' : 'False'}
          <br />
          <button onClick={() => {

          }}>Toggle</button>
        </p>
      </header>
    </div>
  );
}

export default App;
