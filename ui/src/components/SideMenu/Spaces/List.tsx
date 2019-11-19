import * as React from "react";
import { useAppState } from "../../../services";

const buttonBase = `px-2 py-1 mb-2 w-full text-left rounded font-semibold`;
const css = {
  item: `text-sm`,
  buttons: {
    normal: `${buttonBase} bg-blue-200 text-blue-700`,
    current: `${buttonBase} bg-blue-700 text-white`
  }
};

export default () => {
  const currentSpace = localStorage.getItem("currentWorkspace");
  const { user } = useAppState();

  if (user.fetching) return null;

  return (
    <ul>
      {user.data.user.spaces.map(({ name, id }) => (
        <li className={css.item} key={id}>
          <button
            className={
              name === currentSpace ? css.buttons.current : css.buttons.normal
            }
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
};
