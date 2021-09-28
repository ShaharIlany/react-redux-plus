import React, { useEffect } from 'react';
import logo from './logo.png';
import CodeBlock from './components/codeBlock';
import { code, install, basicInit } from './code'
import Text from './components/text'

function App() {

  return (
    <div className="App">
      <div>
        <h1 style={{ color: 'white', textAlign: 'center' }}> <img src={logo} style={{ height: 100, verticalAlign: 'middle' }} /> React Redux Plus</h1>
        <Text title="Install">
          Hey, welcome! we are glad that you are here 💘
          first of all please install the package with the following command:
        </Text>
        <CodeBlock code={install.code} language={install.language} ></CodeBlock>
        <Text title="initialization">
          Next, we need to init a new store. you can do it with the following lines
        </Text>
        <CodeBlock code={basicInit.code} language={basicInit.language}></CodeBlock>
      </div>
    </div>
  );
}

export default App;