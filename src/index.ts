import { useDispatch, useSelector } from "react-redux";
import { createStore, Store, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

type StateAction<S> = { [K in keyof S]: { type: K, value: S[K] } }[keyof S]
type Modifier<S, A extends any[] = any[]> = (current: S, ...args: A) => S

type ModifierMap<S> = { [K in keyof S]?: { [key: string]: Modifier<S[K]> } }

type ModifierArgs<M> = M extends Modifier<any, infer A> ? A : never

type UseValue<S extends object, M extends ModifierMap<S>> = <K extends keyof S>(key: K) => readonly [S[K], {
    [MK in keyof M[K]]: (...args: ModifierArgs<M[K][MK]>) => void;
}];

const objectKeys = <T extends object>(object: T): (keyof T)[] => (Object.keys(object) as (keyof T)[])
const isKeyOf = <T extends object>(key: keyof any, obj: T): key is keyof T => (Object.keys(obj) as (keyof any)[]).includes(key)

export function initializeStore<S extends object, M extends ModifierMap<S>>
    (defaultState: S, modifiers: M, useDevTools: boolean = true): {
        store: Store<S, StateAction<S>>, useValue: UseValue<S, M>
    } {
    const reducer: Reducer<S, StateAction<S>> =
        <K extends keyof S>(state: S = defaultState, action: { type: K, value: S[K] }): S => {
            return {
                ...state,
                [action.type]: action.value
            }
        }

    const store = createStore(reducer, useDevTools ? composeWithDevTools() : undefined)

    const useValue: UseValue<S, M> = <K extends keyof S>(key: K) => {
        const state = useSelector<S, S[K]>(store => store[key])
        const stateModifiers: M[K] = modifiers[key]
        const dispatch = useDispatch()

        let compiledModifiers = {} as { [MK in keyof M[K]]: (...args: ModifierArgs<M[K][MK]>) => void }

        if (stateModifiers !== undefined) {
            objectKeys(stateModifiers).forEach(
                <MK extends keyof M[K]>(mKey: MK) => {
                    const stateModifier = (isKeyOf(mKey, stateModifiers) ? stateModifiers[mKey] : (() => undefined)) as M[K][MK]
                    compiledModifiers[mKey] = (...args) => dispatch({ type: key, value: stateModifier(state, ...args) })
                })
        }

        return [state, compiledModifiers] as const
    }

    return {
        store,
        useValue
    }
}