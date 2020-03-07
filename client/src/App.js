import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContext from "./context/auth";
import IssueList from "./components/IssueList";
import Loading from "./components/Loading";
import NewIssueForm from "./components/NewIssueForm";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";

import "./App.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [isAuth, updateIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    fetch("http://localhost:3000/auth", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200) {
          const error = new Error("Not Authorized");
          throw error;
        }
        return res.json();
      })
      .then(result => {
        updateIsAuth(true);
        setUser(result);
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogin = () => {
    updateIsAuth(true);
  };
  const handleLogout = () => {
    updateIsAuth();
  };
  console.log(isAuth);
  console.log(user);
  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loading />
      </div>
    );
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuth, updateIsAuth }}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" render={props => <h1>Hello "World"</h1>} />
              <Route path="/signup" component={Signup} />
              <Route
                path="/login"
                render={props => <Login {...props} auth={handleLogin} />}
              />
              <ProtectedRoute path="/closed-issues" component={Loading} />
              <Route path="/open-issues" component={IssueList} />
              <Route path="/create-new-issue" component={NewIssueForm} />
            </Switch>
          </Layout>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
