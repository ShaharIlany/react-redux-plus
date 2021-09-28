import { useDispatch, useSelector } from "react-redux";
import { createStore, Store, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

type StateAction<S> = { [K in keyof S]: { type: K, value: S[K] } }[keyof S]
type Modifier<S, A extends any[] = any[]> = (current: S, ...args: A) => S
type ModifierArgs<M> = M extends Modifier<any, infer A> ? A : never

type ModifierMap<S> = { [K in keyof S]?: { [key: string]: Modifier<S[K]> } }

type UseStateValue<S extends object, M extends ModifierMap<S>> =
    <K extends keyof S>(key: K) =>
        readonly [S[K], { [MK in keyof M[K]]: (...args: ModifierArgs<M[K][MK]>) => void }]

const objectKeys = <T extends object>(object: T): (keyof T)[] => (Object.keys(object) as (keyof T)[])
const isKeyOf = <T extends object>(key: keyof any, obj: T): key is keyof T => objectKeys<any>(obj).includes(key)

export function initializeStore<State extends object, Modifiers extends ModifierMap<State>>
    (defaultState: State, modifiers: Modifiers, useDevTools: boolean = true): {
        store: Store<State, StateAction<State>>, useStateValue: UseStateValue<State, Modifiers>
    } {
    const reducer: Reducer<State, StateAction<State>> =
        <K extends keyof State>(state: State = defaultState, action: { type: K, value: State[K] }): State => ({
            ...state,
            [action.type]: action.value
        })

    const store = createStore(reducer, useDevTools ? composeWithDevTools() : undefined)

    const useStateValue: UseStateValue<State, Modifiers> = <Key extends keyof State>(key: Key) => {
        type StateModifiers = Modifiers[Key]

        const state = useSelector<State, State[Key]>(store => store[key])
        const stateModifiers: StateModifiers = modifiers[key]
        const dispatch = useDispatch()

        let compiledModifiers = {} as { [MK in keyof StateModifiers]: (...args: ModifierArgs<StateModifiers[MK]>) => void }

        if (stateModifiers !== undefined) {
            objectKeys(stateModifiers).forEach(
                <ModifierKey extends keyof StateModifiers>(mKey: ModifierKey) => {
                    const stateModifier = (
                        isKeyOf(mKey, stateModifiers) ? stateModifiers[mKey] : (() => undefined)
                    ) as StateModifiers[ModifierKey]
                    compiledModifiers[mKey] = (...args) => dispatch({ type: key, value: stateModifier(state, ...args) })
                })
        }

        return [state, compiledModifiers] as const
    }

    return {
        store,
        useStateValue
    }
}
