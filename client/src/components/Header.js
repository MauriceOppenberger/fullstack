import React from "react";
import { Link } from "react-router-dom";
import HeaderWrapper from "./styles/HeaderWrapper";
import AuthContext from "../context/auth";
import Button from "@material-ui/core/Button";

const Header = () => {
  console.log("header");
  return (
    <AuthContext.Consumer>
      {context => (
        <HeaderWrapper>
          <div className="header-container">
            <div className="logo-container">
              <Link to="/" className="logo-link">
                <h1>Issue Tracker 2.0</h1>
              </Link>
            </div>
            <div className="primary-nav">
              {context.user ? (
                <ul className="primary-nav-list">
                  <li className="primary-nav-item">
                    <Link to="/dashboard">
                      {" "}
                      <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        className=""
                        type="submit"
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </li>
                  <li
                    onClick={() => context.handleLogout()}
                    className="primary-nav-item"
                  >
                    <Link to="/">
                      {" "}
                      <Button size="medium" className="" type="submit">
                        Logout
                      </Button>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="primary-nav-list">
                  <li className="primary-nav-item">
                    <Link to="/login">
                      {" "}
                      <Button size="medium" className="" type="submit">
                        Log In
                      </Button>
                    </Link>
                  </li>
                  <li className="primary-nav-item">
                    <Link to="/signup">
                      {" "}
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        className=""
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </HeaderWrapper>
      )}
    </AuthContext.Consumer>
  );
};

export default Header;
