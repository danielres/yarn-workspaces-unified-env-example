import * as React from "react";
import { useQuery } from "urql";

const getHello = /* GraphQL */ `
  query getHello {
    hello
  }
`;

export default () => {
  const [res] = useQuery({ query: getHello });

  if (res.fetching) return <div>"Loading..."</div>;
  if (res.error) return <div>"Oh no!"</div>;

  return <ul>GraphQL response: {res.data.hello}</ul>;
};
