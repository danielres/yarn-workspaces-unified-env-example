import "core-js/stable";
import "env";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "regenerator-runtime/runtime";
import App from "./scenes/App";
import { Providers } from "./services";

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);
