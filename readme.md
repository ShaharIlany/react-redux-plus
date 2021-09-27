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

## Usage

To initialize the store please add the following to your **index.tsx**

```typescript
// Initial store used to set the initial values of the variables used in the store
const initialStore = {
  paramA: "Test",
  paramB: true
}

/* Call initializeStore function to init the redux store.
To disable chrome devtools change true to false. */
initializeStore(initialStore, true)

/* OPTIONAL but super RECOMMENDED!
Export the type of the initial store variable to use later in the components */
export type storeType = typeof initialStore
```

After the initialization of the store you can start use the states with the following syntax

```typescript
import { storeType } from '../index'

// The first value is the getter and the second is the setter. just like useState of React
const [paramA, setParamA] = useValue<storeType>("paramA")
```

## Functional Programming

We highly recommend to learn about functional programming principles. because all the process totally skips the reducers construction, to make sure Redux operates the best please use some library like Immutable.js or Immer

## Help us grow!

If you have any suggestion or an idea feel free to open an issue or create pull request

Enjoy! ♥

## License

[MIT](LICENSE)