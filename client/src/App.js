import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./context/auth";
import Loading from "./components/Loading";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./components/admin/Dashboard";
import Index from "./components/public/Index";
import { auth, logout } from "./utils/api";
import CssBaseline from "@material-ui/core/CssBaseline";
import Layout from "./components/Layout";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated on inital application load
  useEffect(() => {
    // Set timeout for User experience
    const id = setTimeout(() => {
      setLoading(false);
    }, 1000);
    auth()
      .then(res => {
        if (res.status !== 200) {
          const error = new Error("Not Authorized");
          throw error;
        }
        return res.json();
      })
      .then(result => {
        setUser(result.user);
      })
      .catch(err => console.log(err));
    return () => clearTimeout(id);
  }, []);

  // Log user in and Get user information from Login component
  const handleLogin = user => {
    //   update application state with user information
    setUser(user);
  };

  // Log user out from Logout component
  const handleLogout = () => {
    logout()
      .then(res => {
        if (res.status !== 200) {
          const error = new Error("Logout failed ");
          throw error;
        }
        return res.json();
      })
      .then(() => {
        // update application state
        setUser(null);
      })
      .catch(err => console.log(err));
  };
  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loading />
      </div>
    );
  }
  return (
    <div className="App">
      <CssBaseline />
      <AuthContext.Provider value={{ handleLogout, user }}>
        <Router>
          <Layout user={user}>
            <Index handleLogin={handleLogin} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
          </Layout>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
