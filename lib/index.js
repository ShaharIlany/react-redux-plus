"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeStore = void 0;
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
function initializeStore(defaultStates, useDevTools) {
    if (useDevTools === void 0) { useDevTools = true; }
    var reducers = {};
    Object.keys(defaultStates).forEach(function (key) {
        reducers[key] = function (state, action) {
            return action.type === key ? action.value : state;
        };
    });
    return (0, redux_1.createStore)((0, redux_1.combineReducers)(reducers), useDevTools ? (0, redux_devtools_extension_1.composeWithDevTools)() : undefined);
}
exports.initializeStore = initializeStore;
//# sourceMappingURL=index.js.map