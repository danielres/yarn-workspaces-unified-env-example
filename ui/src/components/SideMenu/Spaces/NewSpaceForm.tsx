import * as React from "react";

const css = {
  input: `text-sm px-2 py-1 mb-2 w-full text-gray-700 bg-gray-200 rounded-l`,
  buttons: {
    submit: `text-sm px-2 py-1 bg-green-500 text-white font-semibold rounded-r`
  },
  columns: { outer: `flex`, left: ``, right: `` }
};

export default () => {
  const [newSpaceName, setNewSpaceName] = React.useState("");

  return (
    <form>
      <div className={css.columns.outer}>
        <div className={css.columns.left}>
          <label>
            <input
              className={css.input}
              type="text"
              placeholder="+ New space"
              value={newSpaceName}
              onChange={e => setNewSpaceName(e.target.value)}
            />
          </label>
        </div>

        {newSpaceName && (
          <div className={css.columns.right}>
            <button className={css.buttons.submit}>+</button>
          </div>
        )}
      </div>
    </form>
  );
};
