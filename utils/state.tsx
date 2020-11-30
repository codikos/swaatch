import React, { useReducer } from 'react';

export const initialState = {
  primary: '',
  contrast: '',
  brand: '',
};

export const SET_PRIMARY_COLOR = 'SET_PRIMARY_COLOR';
export const SET_CONTRAST_COLOR = 'SET_CONTRAST_COLORT';
export const SET_BRAND_COLOR = 'SET_BRAND_COLOR';

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case SET_PRIMARY_COLOR:
      return { ...state, primary: action.primary };
    case SET_CONTRAST_COLOR:
      return { ...state, contrast: action.contrast };
    case SET_BRAND_COLOR:
      return { ...state, brand: action.brand };
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
