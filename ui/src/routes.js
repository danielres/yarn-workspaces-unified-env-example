import { lazy, mount, route } from "navi";
import * as React from "react";
import Profile from "./scenes/Profile";

const routes = mount({
  "/": route({ view: <div>HOME</div> }),
  "/profile": route({ view: <Profile /> })
});

export default routes;
