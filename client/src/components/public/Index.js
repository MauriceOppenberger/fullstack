import React from "react";
import AuthContext from "../../context/auth";

import { Route, Switch, Redirect } from "react-router-dom";

import Signup from "../authentication/Signup";
import Login from "../authentication/Login";
import Post from "../Post";
import Posts from "../Posts";

const Index = ({ handleLogin }) => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <Switch>
          <Route exact path="/" render={(props) => <Posts {...props} />} />
          <Route
            exact
            path="/post/:id"
            render={(props) => <Post {...props} />}
          />
          <Route
            path="/signup"
            render={(props) => {
              return context.user ? (
                <Redirect to="/dashboard/profile" />
              ) : (
                <Signup {...props} />
              );
            }}
          />
          <Route
            path="/login"
            render={(props) => {
              return context.user ? (
                <Redirect to="/dashboard/profile" />
              ) : (
                <Login {...props} auth={handleLogin} />
              );
            }}
          />
        </Switch>
      )}
    </AuthContext.Consumer>
  );
};
export default Index;
