import * as React from "react";
import { useQuery } from "urql";
import { useAuth } from "../../services";
import Login from "./Login";
import Navbar from "./Navbar";

const css = { Main: `container mx-auto bg-white p-4` };

const GET_HELLO = /* GraphQL */ `
  query getHello {
    hello
  }
`;

export default () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Login />;
  return <Main />;
};

function Main() {
  const [res] = useQuery({ query: GET_HELLO });

  if (res.fetching) return null;
  if (res.error) return <div>An error has occured, please try again.</div>;

  return (
    <React.Fragment>
      <Navbar />

      <div data-test-id="main" className={css.Main}>
        GraphQL response: {res.data.hello}
      </div>
    </React.Fragment>
  );
}
