import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {context => (
        <Route
          {...rest}
          render={props => {
            // Check if user is authorized for requested route
            // Redirect user to login page if not authorized
            if (context.user) {
              return <Component {...props} />;
            } else {
              return (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              );
            }
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default ProtectedRoute;
