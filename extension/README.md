# React Redux Plus Snippets

An extension for React Redux Plus package

## Usage

- is (Initialize Store): used to initialize the store at index.tsx

```typescript
    import { initializeStore } from 'react-redux-plus'
    
    export const { store, useStateValue } = initializeStore(
    {
        <State and init value goes here>
    },
    {
        <Setters and modifiers goes here>
    })
```
- usv (Use State Value): used to call reference a value from the store

```typescript
    import { initializeStore } from 'index.tsx'
    
    const [value, modifyValue] = useStateValue("value")

    // Usage:

    // Getter:
    value 

    // Modifier
    modifyValue.set("newValue")
```

**Enjoy!**