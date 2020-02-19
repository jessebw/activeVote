import * as React from "react";
import { StateProvider } from "./stateContext";
import { IGlobalState, TStateAction } from "../interfaces";

export const initialState: IGlobalState = {};

export const reducer = (
  prevState: IGlobalState,
  action: TStateAction
): IGlobalState => {
  console.log(action);
  switch (action.type) {
    case "setAuth":
      return { ...prevState, auth: action.payload };
    case "setConfig":
      return { ...prevState, config: action.payload };
    default:
      return prevState;
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
