import React, { createContext, useReducer } from "react";

const initialState = {
  first: [],
  second: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FIRST":
      return { ...state, first: action.first };
    case "SECOND":
      return { ...state, second: state.first[0] };
    default:
      return state;
  }
};

export const Store = createContext({
  globalState: initialState,
  setGlobalState: () => null,
});

const StoreProvider = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ globalState, setGlobalState }}>
      {children}
    </Store.Provider>
  );
};

export default StoreProvider;
