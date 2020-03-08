import React from "react";
import Layout from "./Layout";
import { Route, Switch } from "react-router-dom";
import IssueList from "../../components/IssueList";
import Loading from "../../components/Loading";
import NewIssueForm from "../../components/NewIssueForm";
import AuthContext from "../../context/auth";
import NewPost from "../../components/NewPost";

const Dashboard = props => {
  return (
    <AuthContext.Consumer>
      {context => (
        <Layout>
          <Switch>
            <Route
              exact
              path="/dashboard/"
              render={() => <h1>Welcome back {context.user.firstName}</h1>}
            />
            <Route path="/dashboard/open-issues" component={IssueList} />
            <Route path="/dashboard/closed-issues" component={Loading} />
            <Route
              path="/dashboard/create-new-issue"
              render={props => <NewPost {...props} user={context.user} />}
            />
          </Switch>
        </Layout>
      )}
    </AuthContext.Consumer>
  );
};
export default Dashboard;
