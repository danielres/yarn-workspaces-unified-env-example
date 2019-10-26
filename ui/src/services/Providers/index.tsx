import * as React from "react";
import Auth0Provider from "./Auth0Provider";
import GraphqlProviderWithAuth from "./GraphqlProviderWithAuth";

export default ({ children }) => (
  <Auth0Provider>
    <GraphqlProviderWithAuth>{children}</GraphqlProviderWithAuth>
  </Auth0Provider>
);
