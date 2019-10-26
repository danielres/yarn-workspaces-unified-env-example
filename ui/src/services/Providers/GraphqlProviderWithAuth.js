import * as React from "react";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  Provider as GraphqlProvider
} from "urql";
import { useAuth } from "../";

const config = {
  endpoint: process.env.API_GRAPHQL_ENDPOINT
};

export default ({ children }) => (
  <GraphqlProviderWithAuth>{children}</GraphqlProviderWithAuth>
);

function GraphqlProviderWithAuth({ children }) {
  const [accessToken, setAccessToken] = React.useState("");
  const { getTokenSilently, loading } = useAuth();

  React.useEffect(() => {
    if (!loading) getTokenSilently().then(setAccessToken);
  }, [loading]);

  if (loading) return null;

  const client = getClient({ accessToken });

  return <GraphqlProvider value={client}>{children}</GraphqlProvider>;
}

function getClient({ accessToken }) {
  return createClient({
    url: config.endpoint,
    fetchOptions: { headers: { authorization: accessToken } },
    exchanges: [cacheExchange, dedupExchange, fetchExchange]
  });
}
