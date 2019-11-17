import * as React from "react";
import Spaces from "./Spaces";

const css = {
  title: `text-sm text-gray-700 mb-2`
};

export default () => {
  return (
    <section>
      <h2 className={css.title}>Spaces</h2>
      <Spaces />
    </section>
  );
};
