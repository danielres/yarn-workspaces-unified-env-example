import * as React from "react";
import { useAuth } from "../../services";

export default function() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth();

  const logoutWithRedirect = () => logout({ returnTo: window.location.origin });

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && (
        <React.Fragment>
          <button onClick={() => logoutWithRedirect()}>Logout</button>
          <img alt="User picture" height={40} src={user.picture} width={40} />
        </React.Fragment>
      )}
    </div>
  );
}
