import { combineReducers, createStore, Dispatch, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

var store: Store

type action = { type: string, value: any }

export function initializeStore(defaultStates: { [key: string]: any }, useDevTools: boolean = true) {
    let reducers: { [key: string]: (state: any, action: action) => void } = {}
    Object.keys(defaultStates).forEach(key => {
        reducers[key] = (state = defaultStates[key], action) => {
            return action.type === key ? action.value : state
        }
    })
    store = createStore(combineReducers(reducers), useDevTools ? composeWithDevTools() : undefined)
    return store
}

export function useGet<T, K extends keyof T = keyof T>(variable: K): T[K] {
    return useSelector<T, T[K]>(store => store[variable])
}
        store.dispatch({
            type: variable,
            value: newValue
        })
    }
}