import * as React from "react";
import Login from "../../components/Login";
import { useAuth0 } from "../react-auth0-spa";
import AppStateProvider from "./AppStateProvider";
import Auth0Provider from "./Auth0Provider";
import GraphqlProviderWithAuth from "./GraphqlProviderWithAuth";

export default ({ children }) => (
  <Auth0Provider>
    <AuthGate>
      <GraphqlProviderWithAuth>
        <AppStateProvider>{children}</AppStateProvider>
      </GraphqlProviderWithAuth>
    </AuthGate>
  </Auth0Provider>
);

function AuthGate({ children }) {
  const { isAuthenticated, loading } = useAuth0();

  if (loading) return "Authenticating...";
  if (isAuthenticated) return children;

  return <Login />;
}
