import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, createClient } from "urql";
import env from "env";
import App from "./scenes/App";

const client = createClient({
  url: env.API_GRAPHQL_ENDPOINT
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,

  document.getElementById("root")
);
