export type code = {
    code: string,
    language: string
}


export const install: code = {
    code:
        `//If you are using yarn:
yarn add react-redux-plus@latest

//and if you are using npm
npm install --save react-redux-plus@latest
`,
    language: "bash"
}

export const basicInit: code = {
    code:
        `// Store => used to set the provider down below
/* useStateValue => exported to use the state values
of the current store. */
export const { store, useStateValue } =
initializeStore({
  /* Values here are the initial values
  of each state in the store */
  paramA: "This is another example, change me!",
  paramB: true
}, {
  /* Here goes the modifiers for each state in the store,
  the functions inside each object must have current
  parameter and return the new value after the change */
  paramB: {
    toggle: (current) => {
      return !current
    }
  },
  paramA: {
    set: (current, input) => { return input.target.value }
  }
}, 
/* You change true to false
if you don't want to enable Chrome DevTools' */
true)

ReactDOM.render(
  <React.StrictMode>

    <!-- Add the provider to use the store.
    you can have a few stores
    and set a few providers
    just like regular react redux -->
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);`,
    language: "javascript"
}