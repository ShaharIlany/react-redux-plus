"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValue = exports.useGet = exports.initializeStore = void 0;
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var store;
function initializeStore(defaultStates, useDevTools) {
    if (useDevTools === void 0) { useDevTools = true; }
    var reducers = {};
    Object.keys(defaultStates).forEach(function (key) {
        reducers[key] = function (state, action) {
            if (state === void 0) { state = defaultStates[key]; }
            return action.type === key ? action.value : state;
        };
    });
    store = (0, redux_1.createStore)((0, redux_1.combineReducers)(reducers), useDevTools ? (0, redux_devtools_extension_1.composeWithDevTools)() : undefined);
    return store;
}
exports.initializeStore = initializeStore;
function useGet(variable) {
    return (0, react_redux_1.useSelector)(function (store) { return store[variable]; });
}
exports.useGet = useGet;
function setValue(variable) {
    return function (newValue) {
        store.dispatch({
            type: variable,
            value: newValue
        });
    };
}
exports.setValue = setValue;
//# sourceMappingURL=index.js.map