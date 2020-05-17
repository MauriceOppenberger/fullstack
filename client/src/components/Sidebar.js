import React from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SidebarWrapper from "./styles/SidebarWrapper";
import AuthContext from "../context/auth";
import PersonIcon from "@material-ui/icons/Person";
import {
  RiUser6Line,
  RiLogoutBoxLine,
  RiAddLine,
  RiFileList2Line,
} from "react-icons/ri";

const Sidebar = () => {
  const adminSidebar = () => {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <div className="sidebar">
            <div className="logo-container">
              <NavLink to="/" className="logo-link">
                <h1>mentor.io</h1>
              </NavLink>
            </div>
            <nav className="sidebar-nav">
              <div>
                <ul className="nav-list">
                  <NavLink to="/dashboard/open-posts" activeClassName="active">
                    <li className="nav-item">
                      <span className="icon">
                        <RiFileList2Line size={26} />
                      </span>
                      <span className="text">
                        <Button size="medium" className="nav-btn" type="button">
                          Open
                        </Button>
                      </span>
                    </li>
                  </NavLink>
                  <NavLink to="/dashboard/add-new-post">
                    <li className="nav-item">
                      <span className="icon">
                        <RiAddLine size={26} />
                      </span>
                      <span className="text">
                        <Button size="medium" className="nav-btn" type="button">
                          New
                        </Button>
                      </span>
                    </li>
                  </NavLink>
                </ul>
              </div>
              <div>
                <ul className="nav-list">
                  <NavLink to="/dashboard/profile">
                    <li className="nav-item">
                      <span className="icon">
                        <RiUser6Line size={26} />
                      </span>
                      <span className="text">
                        <Button size="medium" className="nav-btn" type="button">
                          Profile
                        </Button>
                      </span>
                    </li>
                  </NavLink>

                  <Link to="/">
                    <li
                      onClick={() => context.handleLogout()}
                      className="nav-item"
                    >
                      <span className="icon">
                        <RiLogoutBoxLine size={26} />
                      </span>
                      <span className="text">
                        <Button size="medium" className="nav-btn" type="button">
                          Logout
                        </Button>
                      </span>
                    </li>
                  </Link>
                </ul>
              </div>
            </nav>
          </div>
        )}
      </AuthContext.Consumer>
    );
  };
  const publicSidebar = () => {
    return (
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" activeClassName="active">
              <Button variant="contained" className="nav-btn" type="submit">
                Open
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  };
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <SidebarWrapper>
            {context.user ? adminSidebar() : publicSidebar()}
          </SidebarWrapper>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Sidebar;
