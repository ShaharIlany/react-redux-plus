import { Store } from "redux";
export declare function initializeStore(defaultStates: {
    [key: string]: any;
}, useDevTools?: boolean): Store<any, import("redux").AnyAction>;
export declare function useValue<T, K extends keyof T = keyof T>(variable: K): [T[K], (newValue: T[K]) => void];
//# sourceMappingURL=index.d.ts.map