import * as React from "react";
import { useQuery } from "urql";

const AppStateContext = React.createContext();

export const useAppState = () => React.useContext(AppStateContext);

const GET_USER = /* GraphQL */ `
  query getUser {
    user {
      id
      name
      email
      spaces {
        id
        name
      }
    }
  }
`;

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

  const [user] = useQuery({ query: GET_USER });

  if (user.fetching) return <div>Loading user data...</div>;

  return (
    <AppStateContext.Provider
      value={{
        closeSideMenu,
        sideMenuContent,
        isSideMenuOpen,
        toggleSideMenu,
        user
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
