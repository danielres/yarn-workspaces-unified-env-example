import * as React from "react";
import { Auth0Provider, useAuth0 } from "../react-auth0-spa";

const config = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.UI_AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_AUDIENCE
};

export default ({ children }) => (
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    audience={config.audience}
    redirect_uri={window.location.origin}
  >
    {children}
  </Auth0Provider>
);
