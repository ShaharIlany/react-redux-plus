import { useDispatch, useSelector } from "react-redux";
import { createStore, Store, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

type Immutable<T> = {
    readonly [K in keyof T]: T[K];
}

type Modifier<S, A extends any[] = any[]> = (current: S, ...args: A) => S

type ModifierMap<S> = { [K in keyof S]?: { [key: string]: Modifier<S[K]> } }

type FullModifierMap<S, M> = { [K in keyof S]: K extends keyof M ? M[K] : undefined }

type ModifierArgs<M> = M extends Modifier<any, infer A> ? A : never

type CompiledModifier<M> = M extends Modifier<infer S, infer A> ? (...args: A) => S : never

type CompiledModifiers<M> = { [K in keyof M]: CompiledModifier<M[K]> }

const objectKeys = <T extends object>(object: T): (keyof T)[] => (Object.keys(object) as (keyof T)[])

export function initializeStore<S extends object, M extends ModifierMap<S>>
    (defaultState: S, modifiers: M, useDevTools: boolean = true): {
        store: Store<S, { type: keyof S, value: S[keyof S] }>,
        useValue: <K extends keyof S>(key: K) => [S[K], CompiledModifiers<M[K]>]
    } {
    const reducer: Reducer<S, { type: keyof S, value: S[keyof S] }> =
        <K extends keyof S>(state: S = defaultState, action: { type: K, value: S[K] }): S => {
            return {
                ...state,
                [action.type]: action.value
            }
        }

    const store = createStore(reducer, useDevTools ? composeWithDevTools() : undefined)

    const allModifiers: FullModifierMap<S, M> = objectKeys(defaultState).reduce(
        <K extends keyof S>(obj: FullModifierMap<S, M>, key: K): FullModifierMap<S, M> => {
            return {
                ...obj,
                [key]: modifiers[key] ?? {}
            }
        }, {} as FullModifierMap<S, M>)

    const useValue = <K extends keyof S>(key: K): [S[K], CompiledModifiers<M[K]>] => {
        const state = useSelector<S, S[K]>(store => store[key])
        const stateModifiers = allModifiers[key]
        const dispatch = useDispatch()
        let compiledModifiers = {} as CompiledModifiers<M[K]>


        if (stateModifiers !== undefined) {
            compiledModifiers = objectKeys(stateModifiers).reduce(
                <MK extends keyof M[K]>(obj: CompiledModifiers<M[K]>, mKey: MK): CompiledModifiers<M[K]> => {
                    //Fucking need to fix this any thank you bye.
                    const stateModifier = stateModifiers[mKey] as any
                    return {
                        ...obj,
                        [mKey]: (...args: ModifierArgs<M[K][MK]>) => dispatch({ type: key, value: stateModifier(state, ...args) })
                    }
                }, {} as CompiledModifiers<M[K]>)
        }


        return [state, compiledModifiers]
    }

    return {
        store,
        useValue
    }
}