# React Redux Plus

Our vision is to Make [React Redux](https://github.com/reduxjs/react-redux) easier to use!


## Installation

Before you start the installation process, note that the package is written and tested with **typescript**, you can use the package with javascript but we can't promise that all the features will work.

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

We made an extension for vscode to help you with the deceleration of new stores and usage of values from states.

Link:
https://marketplace.visualstudio.com/items?itemName=ShaharIlany.react-redux-plus-snippets

## TL;DR

Look at the sample project files. you can clone this project and give it a try.

## Usage

To initialize the store please add the following to your code

```typescript
// Store => used to set the provider down below
// useStateValue => exported to use the state values of the current store.
export const { store, useStateValue } =
initializeStore({
  // Values here are the initial values of each state in the store
  paramA: "This is another example, change me!",
  paramB: true
}, {
  // Here goes the modifiers for each state in the store, the functions inside each object must have current parameter and return the new value after the change
  paramB: {
    toggle: (current) => {
      return !current
    }
  },
  paramA: {
    set: (current, input) => { return input.target.value }
  }
}, 
// You change true to false if you don't want to enable Chrome DevTools'
true)

ReactDOM.render(
  <React.StrictMode>

    <!-- Add the provider to use the store. you can have a few stores and set a few providers just like regular react redux -->
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

```

After the initialization of the store you can start use the states with the following syntax

```typescript
import { useStateValue } from '../index' // Or from where it exported from

// The first value is the getter and the second is the modifier.
const [paramA, modifyParamA] = useValue<storeType>("paramA")

// Use of getter is just like useState from react and
paramA // Will return the current value of the state in the store.

// Use of modifier:
modifyParamA.set("New Value") // Will return nothing
// For each modifier you declared earlier you can have different parameters
```

## Functional Programming

We highly recommend to learn about functional programming principles. because all the process totally skips the reducers construction, to make sure Redux operates the best please use some library like Immutable.js or Immer

## Help us grow!

If you have any suggestion or an idea feel free to open an issue or create pull request

Enjoy! ♥

## License

[MIT](LICENSE)
