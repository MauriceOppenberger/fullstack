import React from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "../Loading";
import AuthContext from "../../context/auth";
import NewPost from "./NewPost";
import Posts from "../Posts";

const Dashboard = () => {
  return (
    <AuthContext.Consumer>
      {context => (
        <Switch>
          <Route
            exact
            path="/dashboard/"
            render={() => <h1>Welcome back {context.user.firstName}</h1>}
          />
          <Route
            path="/dashboard/open-posts"
            render={props => <Posts {...props} user={context.user} />}
          />
          <Route path="/dashboard/closed-posts" component={Loading} />
          <Route
            path="/dashboard/add-new-post"
            render={props => <NewPost {...props} user={context.user} />}
          />
          <Route
            path="/dashboard/edit-post/:id"
            render={props => <NewPost {...props} user={context.user} />}
          />
        </Switch>
      )}
    </AuthContext.Consumer>
  );
};
export default Dashboard;
