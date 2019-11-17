import * as React from "react";

const AppStateContext = React.createContext();

export const useAppState = () => React.useContext(AppStateContext);

export default ({ children }) => {
  return (
    <AppStateContext.Provider value={{}}>{children}</AppStateContext.Provider>
  );
};
