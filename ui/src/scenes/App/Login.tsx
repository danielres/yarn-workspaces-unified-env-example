import * as React from "react";
import { useAuth } from "../../services";

const buttonBase = `py-2 px-4 rounded`;
const css = {
  outer: `container mx-auto m-8 p-8 bg-white shadow-lg`,
  title: `text-lg mb-4`,
  row: `mb-4`,
  inputs: { text: `form-input w-full` },
  buttons: {
    primary: `${buttonBase} text-white bg-blue-500 hover:bg-blue-700`,
    disabled: `${buttonBase} text-white bg-gray-500 cursor-not-allowed`
  }
};

export default () => {
  const { loginWithRedirect } = useAuth();
  const [workspace, setWorkspace] = React.useState("");

  return (
    <div className={css.outer}>
      <h1 className={css.title}>Please enter the name of the workspace</h1>

      <form onSubmit={() => loginWithRedirect()}>
        <div className={css.row}>
          <div>
            <label htmlFor="workspace">
              <input
                className={css.inputs.text}
                onChange={e => setWorkspace(e.target.value)}
                placeholder="name of the workspace to join"
                type="text"
                value={workspace}
              />
            </label>
          </div>
        </div>

        <div className={css.row}>
          <button
            className={workspace ? css.buttons.primary : css.buttons.disabled}
            type="submit"
            disabled={!workspace}
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
