import * as React from "react";

const AppStateContext = React.createContext();

export const useAppState = () => React.useContext(AppStateContext);

export default ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = React.useState(false);
  const [sideMenuContent, setSideMenuContent] = React.useState(null);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const toggleSideMenu = (content: "spaces" | "user" | null) => {
    setSideMenuContent(content);
    setIsSideMenuOpen(
      sideMenuContent === content && isSideMenuOpen ? false : true
    );
  };

  return (
    <AppStateContext.Provider
      value={{
        closeSideMenu,
        sideMenuContent,
        isSideMenuOpen,
        toggleSideMenu
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
