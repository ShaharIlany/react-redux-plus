import { Store } from "redux";
export declare function initializeStore(defaultStates: {
    [key: string]: any;
}, useDevTools?: boolean): Store<any, import("redux").AnyAction>;
export declare function useGet<T, K extends keyof T = keyof T>(variable: K): T[K];
export declare function setValue<T, K extends keyof T = keyof T>(variable: K): (newValue: T[K]) => void;
//# sourceMappingURL=index.d.ts.map