import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SidebarWrapper from "./styles/SidebarWrapper";
import AuthContext from "../context/auth";

const Sidebar = () => {
  const adminSidebar = () => {
    return (
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/dashboard/open-posts" activeClassName="active">
              <Button variant="contained" className="btn" type="submit">
                Open
              </Button>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/closed-posts">
              <Button variant="contained" className="btn" type="submit">
                Clossed
              </Button>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/add-new-post">
              <Button variant="contained" className="btn" type="submit">
                New
              </Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  };

  // Public sidebar currently not used!!!
  const publicSidebar = () => {
    return (
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" activeClassName="active">
              <Button variant="contained" className="btn" type="submit">
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
      {context => {
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
