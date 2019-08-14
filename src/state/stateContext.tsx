import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { IGlobalState, IReducer, TStateAction } from "../interfaces";
import { initialState } from "./globalState";
export const StateContext = createContext<
  [IGlobalState, Dispatch<TStateAction>]
>([initialState, () => {}]);

export const StateProvider: React.FunctionComponent<{
  reducer: IReducer;
  initialState: IGlobalState;
}> = props => {
  return (
    <StateContext.Provider
      value={useReducer(props.reducer, props.initialState)}
    >
      {props.children}
    </StateContext.Provider>
  );
};
export const useStateValue = () =>
  useContext<[IGlobalState, Dispatch<TStateAction>]>(StateContext);
