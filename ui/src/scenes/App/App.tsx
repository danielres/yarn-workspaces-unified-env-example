import * as React from "react";
import { useQuery } from "urql";
import { useAuth } from "../../services";
import css from "./App.css";
import Navbar from "./Navbar";

const GET_HELLO = /* GraphQL */ `
  query getHello {
    hello
  }
`;

export default () => {
  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
};

function Main() {
  const { isAuthenticated } = useAuth();
  const [res] = useQuery({ query: GET_HELLO });

  if (!isAuthenticated) return null;
  if (res.fetching) return null;
  if (res.error) return <div>An error has occured, please try again.</div>;

  return <div className={css.Main}>GraphQL response: {res.data.hello}</div>;
}
