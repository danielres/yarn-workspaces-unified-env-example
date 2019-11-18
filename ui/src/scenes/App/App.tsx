import * as React from "react";
import { Router, useCurrentRoute, View } from "react-navi";
import { useQuery } from "urql";
import Login from "../../components/Login";
import SideMenu from "../../components/SideMenu";
import routes from "../../routes";
import { useAppState } from "../../services/Providers/AppStateProvider";
import Navbar from "./Navbar";

const css = {
  main: `bg-white p-4 grow mt-4`,
  side: `bg-white p-4 absolute right-0 w-48 shadow-md Xh-full rounded-bl`
};

const GET_HELLO = /* GraphQL */ `
  query getHello {
    hello
  }
`;

export default () => {
  const [res] = useQuery({ query: GET_HELLO });
  const { isSideMenuOpen } = useAppState();

  if (res.fetching) return null;

  if (res.error) {
    if (res.error.message.includes("[GraphQL] The tenant could not be found"))
      return (
        <div>
          <Login
            message={`The workspace "${localStorage.getItem(
              "currentWorkspace"
            )}" could not be found.`}
          />
        </div>
      );

    return <div>An error has occured, please try again.</div>;
  }

  return (
    <Router routes={routes}>
      <RouterEffects />

      <Navbar />
      {isSideMenuOpen && (
        <div className={css.side}>
          <SideMenu />
        </div>
      )}
      <div data-test-id="main" className={css.main}>
        <View />
        GraphQL response: {res.data.hello}
      </div>
    </Router>
  );
};

function RouterEffects() {
  const { closeSideMenu } = useAppState();
  const { pathname } = useCurrentRoute().url;

  React.useEffect(() => {
    closeSideMenu();
  }, [pathname]);

  return null;
}
