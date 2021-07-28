import * as React from "react";
import { StateProvider } from "./stateContext";
import { IGlobalState, TStateAction } from "../interfaces";

export const initialState: IGlobalState = {};

export const reducer = (
  currentState: IGlobalState,
  action: TStateAction
): IGlobalState => {
  switch (action.type) {
    case "setAuth":
      return { ...currentState, auth: action.payload };
    case "setConfig":
      return { ...currentState, config: action.payload };
    default:
      return currentState;
  }
};

export class GlobalState extends React.Component<{
  initialState?: IGlobalState;
  reducer?: any;
}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <StateProvider
        initialState={this.props.initialState || initialState}
        reducer={this.props.reducer || reducer}
      >
        {this.props.children}
      </StateProvider>
    );
  }
}
