import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Toc } from "./components/Toc";

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/toc/:currentPage" exact component={Toc} />
        <Redirect to="/toc/1" />
      </Switch>
    </BrowserRouter>
  );
}
