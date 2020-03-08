import React from "react";

import { Route, Switch } from "react-router-dom";

import Signup from "../../components/authentication/Signup";
import Login from "../../components/authentication/Login";

const Public = ({ handleLogin }) => {
  return (
    <Switch>
      <Route exact path="/" render={props => <h1>Hello "World"</h1>} />
      <Route path="/signup" component={Signup} />
      <Route
        path="/login"
        render={props => <Login {...props} auth={handleLogin} />}
      />
    </Switch>
  );
};
export default Public;
