import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

export function initializeStore(defaultStates: { [key: string]: any }, useDevTools: boolean = true) {
    let reducers: { [key: string]: (state: any, action: { type: string, value: any }) => void } = {}
    Object.keys(defaultStates).forEach(key => {
        reducers[key] = (state, action) => {
            return action.type === key ? action.value : state
        }
    })
    return createStore(combineReducers(reducers), useDevTools ? composeWithDevTools() : undefined)
}