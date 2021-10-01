# React Redux Plus

Our vision is to Make [React Redux](https://github.com/reduxjs/react-redux) easier to use!


## Installation

Before you start the installation process, note that the package is written and tested with **typescript**. You can use the package with javascript but we can't promise that all of the features will work.

To use React Redux Plus with your React app, install it as a dependency:

```bash
# If you use Yarn:
yarn add react-redux-plus@latest

# or if you use npm:
npm install react-redux-plus@latest
```

Note: the installation of react-redux-plus will automatically install the following packages:

- Redux
- React Redux
- Redux DevTools Extension

## We 💖 Visual Studio Code

We made an extension for vscode to help you with the deceleration of new stores and usage of values from them.

Link:
https://marketplace.visualstudio.com/items?itemName=ShaharIlany.react-redux-plus-snippets

## TL;DR

Look at the sample project files. You can clone this project and give it a try.

## Usage

To initialize the store please add the following to your code:

```typescript
// Store => used to set the provider down below
// useStateValue => exported to use the state values of the current store.
export const { store, useStateValue } =
initializeStore({
  // Values here are the initial values of each state in the store
  paramA: "This is another example, change me!",
  paramB: true
}, {
  // Here goes the modifiers for each state in the store, the functions inside each object must receive a current parameter and return the new value after the change.
  // Each modifier may receive as many extra parameters as you would like. Typing those parameters will result in better coding experience when you use those modifiers.
  // The 'set' modifier is automatically created for each state and can be overridden.
  paramA: {
    set: (current, input) => { return input.target.value },
    reset: "This is another test, change me!" // If a modifier does not depend on any external parameter, you may pass just the resulting value instead of a function.
  },
  paramB: {
    toggle: (current) => {
      return !current
    },
  },
  loggedIn: {
    login: true,
    logout: false
  }
}, 
// Change true to false if you don't want to enable Chrome DevTools'
true)

ReactDOM.render(
  <React.StrictMode>

    <!-- Add the provider to use the store. You can have a few stores and set up a few providers just like regular react redux -->
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

```

After the initialization of the store you can start use the states with the following syntax:

```typescript
import { useStateValue } from '../index' // Import from the file in which you defined and exported the store.

function MyComponent() {
  // useStateValue acts similar to useState,
  // except the second value contains all of the modifiers that were defined for that state.
  const [paramA, modifyParamA] = useStateValue("paramA")

  paramA // The current value of the state in the store.

  // Use of modifier:
  modifyParamA.reset() // Sets paramA to "This is another example, change me!" and returns nothing.
}
```

For more modifiers usage examples, check out the sample project files.


## Functional Programming

We highly recommend to learn about functional programming principles. because all the process totally skips the reducers construction, to make sure Redux operates the best please use some library like Immutable.js or Immer

## Help us grow!

If you have any suggestion or an idea feel free to open an issue or create pull request

Enjoy! ♥

## License

[MIT](LICENSE)
