import * as React from "react";

const AppStateContext = React.createContext();

export const useAppState = () => React.useContext(AppStateContext);

export default ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = React.useState(true);
  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);

  return (
    <AppStateContext.Provider
      value={{
        closeSideMenu,
        isSideMenuOpen,
        openSideMenu,
        toggleSideMenu
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
