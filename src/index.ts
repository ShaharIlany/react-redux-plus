import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStore, Store, Reducer } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

type DefaultModifiers<S> = { set: (newValue: S) => S };

type StateAction<S> = { [K in keyof S]: { type: K; value: S[K] } }[keyof S];
type Modifier<S, A extends any[] = any[]> = (current: S, ...args: A) => S;
type ModifierArgs<M> = M extends Modifier<any, infer A> ? A : [];

type ModifierMap<S> = {
  [K in keyof S]?: { [key: string]: S[K] | Modifier<S[K]> };
};
type CompiledModifiers<S, SM extends ModifierMap<any>[any]> = {
  [MK in keyof SM]: (...args: ModifierArgs<SM[MK]>) => S;
};

type UseStateValue<S extends object, M extends ModifierMap<S>> = <
  K extends keyof S
>(
  key: K
) => readonly [S[K], DefaultModifiers<S[K]> & CompiledModifiers<S[K], M[K]>];

const isFunction = (fn: unknown): fn is Function => typeof fn === "function";

export function initializeStore<
  State extends object,
  Modifiers extends ModifierMap<State>
>(
  defaultState: State,
  modifiers: Modifiers,
  useDevTools: boolean = true
): {
  store: Store<State, StateAction<State>>;
  useStateValue: UseStateValue<State, Modifiers>;
} {
  const reducer: Reducer<State, StateAction<State>> = <K extends keyof State>(
    state: State = defaultState,
    action: { type: K; value: State[K] }
  ): State => ({
    ...state,
    [action.type]: action.value,
  });

  const store = createStore(
    reducer,
    useDevTools ? composeWithDevTools() : undefined
  );

  const useStateValue: UseStateValue<State, Modifiers> = <
    Key extends keyof State
  >(
    key: Key
  ) => {
    type StateModifiers = Modifiers[Key] & {};

    const state = useSelector<State, State[Key]>((store) => store[key]);
    const _dispatch = useDispatch();
    const dispatch = <T extends any>(action: { type: keyof any; value: T }) => {
      _dispatch(action);
      return action.value;
    };

    const allModifiers: DefaultModifiers<State[Key]> &
      CompiledModifiers<State[Key], StateModifiers> = useMemo(() => {
      let defaultModifiers: DefaultModifiers<State[Key]> = {
        set: (newValue: State[Key]) => dispatch({ type: key, value: newValue }),
      };

      let compiledModifiers = {} as CompiledModifiers<
        State[Key],
        StateModifiers
      >;

      const stateModifiers = modifiers[key];
      if (stateModifiers !== undefined) {
        for (const mKey in stateModifiers) {
          const stateModifier = stateModifiers[mKey] as
            | State[Key]
            | Modifier<State[Key], ModifierArgs<StateModifiers[typeof mKey]>>;
          compiledModifiers[mKey] = isFunction(stateModifier)
            ? (...args) =>
                dispatch({ type: key, value: stateModifier(state, ...args) })
            : () => dispatch({ type: key, value: stateModifier });
        }
      }

      return {
        ...defaultModifiers,
        ...compiledModifiers,
      };
    }, [modifiers, state, dispatch]);

    return [state, allModifiers] as const;
  };

  return {
    store,
    useStateValue,
  };
}
