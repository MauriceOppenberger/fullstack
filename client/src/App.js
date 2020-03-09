import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthContext from "./context/auth";
import Loading from "./components/Loading";
import Header from "./components/Header";
import "./App.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./views/admin/Dashboard";
import Public from "./views/public/Public";
import { auth, logout } from "./utils/api";
import CssBaseline from "@material-ui/core/CssBaseline";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("effect");
    const id = setTimeout(() => {
      setLoading(false);
    }, 1500);
    auth()
      .then(res => {
        if (res.status !== 200) {
          const error = new Error("Not Authorized");
          throw error;
        }
        return res.json();
      })
      .then(result => {
        console.log(result);

        setUser(result.user);
      })
      .catch(err => console.log(err));
    return () => clearTimeout(id);
  }, []);

  const handleLogin = user => {
    setUser(user);
  };
  const handleLogout = () => {
    logout()
      .then(res => {
        if (res.status !== 200) {
          const error = new Error("Logout failed ");
          throw error;
        }
        return res.json();
      })
      .then(result => {
        console.log(result);
        setUser(null);
      })
      .catch(err => console.log(err));
  };
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
      <CssBaseline />
      <AuthContext.Provider value={{ handleLogout, user }}>
        <Router>
          <Header />
          <Public handleLogin={handleLogin} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
