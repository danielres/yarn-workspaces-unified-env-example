import * as React from "react";
import { useAuth } from "../../services";
import css from "./Navbar.css";

export default function({ className }) {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth();

  const logoutWithRedirect = () => logout({ returnTo: window.location.origin });

  return (
    <div className={css.Navbar}>
      <div className={css.inner}>
        <div className={css.left}>Hola</div>

        <div className={css.right}>
          {!isAuthenticated && (
            <button onClick={() => loginWithRedirect({})}>Log in</button>
          )}

          {isAuthenticated && (
            <React.Fragment>
              <button onClick={logoutWithRedirect}>Logout</button>
              <Avatar user={user} />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function Avatar({ user }) {
  return (
    <div className={css.Avatar}>
      <img alt="User picture" height={40} src={user.picture} width={40} />
    </div>
  );
}
