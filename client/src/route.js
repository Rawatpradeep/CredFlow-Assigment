import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "../src/Components/SignIn";
import UserDetail from "../src/Components/UserDetail";
import ChangePassword from "../src/Components/ChangePassword";

export default class Global extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={"/sign-in"} component={SignIn} />
          <Route exact path={"/users"} component={UserDetail} />
          <Route exact path={"/change-password"} component={ChangePassword} />
          <Route path={"/"} component={SignIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}
