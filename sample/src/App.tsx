import React from 'react';
import { useStateValue } from '.'

function App() {

  const [paramB, modifyParamB] = useStateValue("paramB")
  const [, modifyParamA] = useStateValue("paramA")

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <br />
          {paramB.toString()}
          <br />
          <button onClick={() => {
            modifyParamB.toggle()
            modifyParamA.set()
          }}>Toggle</button>
        </p>
      </header>
    </div>
  );
}

export default App;
