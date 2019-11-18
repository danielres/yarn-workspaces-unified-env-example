import * as React from "react";

const buttonBase = `px-2 py-1 mb-2 w-full text-left rounded font-semibold`;
const css = {
  item: `text-sm`,
  buttons: {
    normal: `${buttonBase} bg-blue-200 text-blue-700`,
    current: `${buttonBase} bg-blue-700 text-white`
  }
};

const spaces = ["one", "two", "three"];

export default () => {
  const currentSpace = localStorage.getItem("currentWorkspace");

  if (!spaces.length) return null;

  return (
    <ul>
      {spaces.map(space => (
        <li className={css.item} key={space}>
          <button
            className={
              space === currentSpace ? css.buttons.current : css.buttons.normal
            }
          >
            {space}
          </button>
        </li>
      ))}
    </ul>
  );
};
