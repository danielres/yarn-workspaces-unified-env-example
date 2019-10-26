import "core-js/stable";
import "regenerator-runtime/runtime";
import "env";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createClient, Provider } from "urql";
import App from "./scenes/App";

const config = {
  endpoint: process.env.API_GRAPHQL_ENDPOINT
};

const client = createClient({
  url: config.endpoint
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,

  document.getElementById("root")
);
