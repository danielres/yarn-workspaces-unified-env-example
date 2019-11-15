import * as React from "react";
import { useQuery } from "urql";
import Login from "../../components/Login";
import Navbar from "./Navbar";

const css = { Main: `container mx-auto bg-white p-4` };

const GET_HELLO = /* GraphQL */ `
  query getHello {
    hello
  }
`;

export default () => {
  const [res] = useQuery({ query: GET_HELLO });

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
    <React.Fragment>
      <Navbar />

      <div data-test-id="main" className={css.Main}>
        GraphQL response: {res.data.hello}
      </div>
    </React.Fragment>
  );
};
