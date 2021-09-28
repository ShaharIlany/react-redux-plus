import { useDispatch, useSelector } from "react-redux";
import { createStore, Store, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

type StateAction<S> = { [K in keyof S]: { type: K, value: S[K] } }[keyof S]
type Modifier<S, A extends any[] = any[]> = (current: S, ...args: A) => S

type ModifierMap<S> = { [K in keyof S]?: { [key: string]: Modifier<S[K]> } }

type ModifierArgs<M> = M extends Modifier<any, infer A> ? A : never

type UseStateValue<S extends object, M extends ModifierMap<S>> =
    <K extends keyof S>(key: K) =>
        readonly [S[K],
            {
                [MK in keyof M[K]]: (...args: ModifierArgs<M[K][MK]>) => void
            }
        ];

const objectKeys = <T extends object>(object: T): (keyof T)[] => (Object.keys(object) as (keyof T)[])
const isKeyOf = <T extends object>(key: keyof any, obj: T): key is keyof T => (Object.keys(obj) as (keyof any)[]).includes(key)

export function initializeStore<StateType extends object, ModifiersType extends ModifierMap<StateType>>
    (defaultState: StateType, modifiers: ModifiersType, useDevTools: boolean = true): {
        store: Store<StateType, StateAction<StateType>>, useStateValue: UseStateValue<StateType, ModifiersType>
    } {
    const reducer: Reducer<StateType, StateAction<StateType>> =
        <K extends keyof StateType>(state: StateType = defaultState, action: { type: K, value: StateType[K] }): StateType => {
            return {
                ...state,
                [action.type]: action.value
            }
        }

    const store = createStore(reducer, useDevTools ? composeWithDevTools() : undefined)

    const useStateValue: UseStateValue<StateType, ModifiersType> = <Key extends keyof StateType>(key: Key) => {
        const state = useSelector<StateType, StateType[Key]>(store => store[key])
        const stateModifiers: ModifiersType[Key] = modifiers[key]
        const dispatch = useDispatch()

        let compiledModifiers = {

        } as { [ModifierKey in keyof ModifiersType[Key]]: (...args: ModifierArgs<ModifiersType[Key][ModifierKey]>) => void }

        if (stateModifiers !== undefined) {
            objectKeys(stateModifiers).forEach(
                <ModifierKey extends keyof ModifiersType[Key]>(mKey: ModifierKey) => {
                    const stateModifier = (isKeyOf(mKey, stateModifiers) ? stateModifiers[mKey] : (() => undefined)) as ModifiersType[Key][ModifierKey]
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
