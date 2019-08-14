// import React, { createContext, useReducer, useContext, Dispatch } from "react";

// export const StateContext = createContext<any>([{}, () => {}]);

// export const StateProvider: React.FunctionComponent<{
//   reducer: any;
//   initialState: any;
// }> = props => {
//   return (
//     <StateContext.Provider value={useReducer(props.initialState)}>
//       {props.children}
//     </StateContext.Provider>
//   );
// };
// export const useStateValue = () =>
//   useContext<[IGlobalState, Dispatch<TStateAction>]>(StateContext);
