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
function App() {
  const [isAuth, updateIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("effect");
    const id = setTimeout(() => {
      setLoading(false);
    }, 1500);
    // fetch("/auth", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
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
        updateIsAuth(true);
        setUser(result.user);
      })
      .catch(err => console.log(err));
    return () => clearTimeout(id);
  }, []);

  const handleLogin = user => {
    updateIsAuth(true);
    setUser(user);
  };
  const handleLogout = () => {
    // fetch("/auth/logout", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
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
        updateIsAuth(false);
        setUser(null);
      })
      .catch(err => console.log(err));
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
      <AuthContext.Provider value={{ isAuth, handleLogout, user }}>
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
