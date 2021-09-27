import { Store } from "redux";
export declare function initializeStore(defaultStates: {
    [key: string]: any;
}, useDevTools?: boolean): Store<any, import("redux").AnyAction>;
export declare function setValue<T>(variable: keyof T): (newValue: any) => void;
//# sourceMappingURL=index.d.ts.map