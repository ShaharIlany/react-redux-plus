"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeStore = void 0;
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const redux_devtools_extension_1 = require("redux-devtools-extension");
const objectKeys = (object) => Object.keys(object);
const isKeyOf = (key, obj) => Object.keys(obj).includes(key);
function initializeStore(defaultState, modifiers, useDevTools = true) {
    const reducer = (state = defaultState, action) => {
        return Object.assign(Object.assign({}, state), { [action.type]: action.value });
    };
    const store = (0, redux_1.createStore)(reducer, useDevTools ? (0, redux_devtools_extension_1.composeWithDevTools)() : undefined);
    const useStateValue = (key) => {
        const state = (0, react_redux_1.useSelector)(store => store[key]);
        const stateModifiers = modifiers[key];
        const dispatch = (0, react_redux_1.useDispatch)();
        let compiledModifiers = {};
        if (stateModifiers !== undefined) {
            objectKeys(stateModifiers).forEach((mKey) => {
                const stateModifier = (isKeyOf(mKey, stateModifiers) ? stateModifiers[mKey] : (() => undefined));
                compiledModifiers[mKey] = (...args) => dispatch({ type: key, value: stateModifier(state, ...args) });
            });
        }
        return [state, compiledModifiers];
    };
    return {
        store,
        useStateValue
    };
}
exports.initializeStore = initializeStore;
//# sourceMappingURL=index.js.map