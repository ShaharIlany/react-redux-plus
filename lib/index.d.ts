import { Store } from "redux";
declare type StateAction<S> = {
    [K in keyof S]: {
        type: K;
        value: S[K];
    };
}[keyof S];
declare type Modifier<S, A extends any[] = any[]> = (current: S, ...args: A) => S;
declare type ModifierMap<S> = {
    [K in keyof S]?: {
        [key: string]: Modifier<S[K]>;
    };
};
declare type ModifierArgs<M> = M extends Modifier<any, infer A> ? A : never;
declare type UseStateValue<S extends object, M extends ModifierMap<S>> = <K extends keyof S>(key: K) => readonly [
    S[K],
    {
        [MK in keyof M[K]]: (...args: ModifierArgs<M[K][MK]>) => void;
    }
];
export declare function initializeStore<StateType extends object, ModifiersType extends ModifierMap<StateType>>(defaultState: StateType, modifiers: ModifiersType, useDevTools?: boolean): {
    store: Store<StateType, StateAction<StateType>>;
    useStateValue: UseStateValue<StateType, ModifiersType>;
};
export {};
//# sourceMappingURL=index.d.ts.map