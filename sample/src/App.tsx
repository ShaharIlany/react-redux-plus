import React from 'react';
import './style.css'
import logo from './logo.png';
import { useStateValue } from '.'

function App() {

  const [paramA, modifyParamA] = useStateValue("paramA")
  const [paramB, modifyParamB] = useStateValue("paramB")

  return (
    <div className="App" style={{
      textAlign: 'center',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      margin: 0,
    }}>


      <div style={{ padding: 5, marginBottom: 40 }}>
        <img src={logo} style={{ width: 250 }} alt="logo" />
        <br />
        <h2>
          This is an example usage of <a href="https://www.npmjs.com/package/react-redux-plus"><b>React Redux Plus</b></a> plugin
        </h2>
        <p>
          The value of paramB is
          <br /><code style={{
            color: 'lightblue',
          }}>{paramB ? "True" : "False"}</code>
        </p>
        <button className="toggle-button"
          onClick={() => {
            modifyParamB.toggle()
          }}>Click here to toggle</button>
        <br />
        <input className="change-input" value={paramA} onChange={modifyParamA.set}></input>
        <br />
        <h3>
          <a href="https://marketplace.visualstudio.com/items?itemName=ShaharIlany.react-redux-plus-snippets">Download snippets extension for vsCode</a>
          <br />
          <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en">And Redux DevTools for Chrome to see the store state</a>
        </h3>
      </div>

    </div>
  );
}

export default App;
