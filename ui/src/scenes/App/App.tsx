import * as React from "react";
import { useQuery } from "urql";
import Navbar from "./Navbar";
import { useAuth } from "../../services";

const GET_HELLO = /* GraphQL */ `
  query getHello {
    hello
  }
`;

export default () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Navbar />
      {isAuthenticated && <Main />}
    </div>
  );
};

function Main() {
  const [res] = useQuery({ query: GET_HELLO });

  if (res.fetching) return <div>Loading...</div>;
  if (res.error) return <div>"Oh no!"</div>;

  return <div>GraphQL response: {res.data.hello}</div>;
}
