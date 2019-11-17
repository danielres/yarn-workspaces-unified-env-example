import * as React from "react";
import { Router, View } from "react-navi";
import { useQuery } from "urql";
import Login from "../../components/Login";
import SideMenu from "../../components/SideMenu";
import routes from "../../routes";
import { useAppState } from "../../services/Providers/AppStateProvider";
import Navbar from "./Navbar";

const css = {
  columns: `flex`,
  left: `bg-white p-4 mr-4 flex-none w-40`,
  right: `bg-white p-4 flex-grow`
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
      <Navbar />

      <div className={css.columns}>
        {isSideMenuOpen && (
          <div className={css.left}>
            <SideMenu />
          </div>
        )}

        <div data-test-id="main" className={css.right}>
          <View />
          GraphQL response: {res.data.hello}
        </div>
      </div>
    </Router>
  );
};
