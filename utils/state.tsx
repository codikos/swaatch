import React, { useReducer } from 'react';

export const initialState = {
  primary: '',
  contrast: '',
};

export const SET_PRIMARY_COLOR = 'SET_PRIMARY_COLOR';
export const SET_CONTRAST_COLORT = 'SET_CONTRAST_COLORT';

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case SET_PRIMARY_COLOR:
      return { ...state, primary: action.primary };
    case SET_CONTRAST_COLORT:
      return { ...state, contrast: action.contrast };
  }
};

export const DispatchContext = React.createContext(null);
export const StateContext = React.createContext(initialState);

export const ContextWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
