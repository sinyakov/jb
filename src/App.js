import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { Toc } from "./components/Toc";
import { PREFIX } from "./constants";

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PREFIX} exact component={Toc} />
        <Route path={`${PREFIX}/:currentPage`} exact component={Toc} />

        <Redirect to={PREFIX} />
      </Switch>
    </BrowserRouter>
  );
}
