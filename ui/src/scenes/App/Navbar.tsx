import * as React from "react";
import { useAuth } from "../../services";

const css = {
  outer: `mb-4 py-2 bg-blue-700 text-white`,
  inner: `container mx-auto flex justify-between items-center px-4 sm:px-0`,
  left: `text-blue-300`,
  right: { outer: `flex`, item: `ml-4` },
  Avatar: { img: `rounded-full border-4 border-blue-600` }
};

export default () => {
  const { user, logout } = useAuth();

  const logoutWithRedirect = () => logout({ returnTo: window.location.origin });

  return (
    <div className={css.outer}>
      <div className={css.inner}>
        <div className={css.left}>Hola</div>

        <div className={css.right.outer}>
          <React.Fragment>
            <button
              className={css.right.item}
              data-test-id="button-logout"
              onClick={logoutWithRedirect}
            >
              Logout
            </button>

            <Avatar className={css.right.item} user={user} />
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

function Avatar({ className, user }) {
  if (!user) return null;
  return (
    <div className={className}>
      <img
        alt="User picture"
        className={css.Avatar.img}
        height={40}
        src={user.picture}
        width={40}
      />
    </div>
  );
}
