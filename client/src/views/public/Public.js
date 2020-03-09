import React from "react";
import AuthContext from "../../context/auth";

import { Route, Switch, Redirect } from "react-router-dom";

import Signup from "../../components/authentication/Signup";
import Login from "../../components/authentication/Login";

import FormikForm from "../../components/FormikForm";

const Public = ({ handleLogin }) => {
  return (
    <AuthContext.Consumer>
      {context => (
        <Switch>
          <Route exact path="/" render={props => <FormikForm {...props} />} />
          <Route
            path="/signup"
            render={props => {
              if (context.user) {
                return <Redirect to="/dashboard" />;
              }
              return <Signup {...props} />;
            }}
          />
          <Route
            path="/login"
            render={props => {
              if (context.user) {
                return <Redirect to="/dashboard" />;
              }
              return <Login {...props} auth={handleLogin} />;
            }}
          />
        </Switch>
      )}
    </AuthContext.Consumer>
  );
};
export default Public;
