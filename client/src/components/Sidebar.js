import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SidebarWrapper from "./styles/SidebarWrapper";

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/open-issues" activeClassName="active">
              <Button
                variant="contained"
                size="medium"
                className="btn"
                type="submit"
              >
                Open
              </Button>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/closed-issues">
              <Button
                variant="contained"
                size="large"
                className="btn"
                type="submit"
              >
                Clossed
              </Button>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create-new-issue">
              <Button
                variant="contained"
                size="large"
                className="btn"
                type="submit"
              >
                New
              </Button>
              {/* <div className="btn nav-button">New Issue</div> */}
            </NavLink>
          </li>
        </ul>
      </nav>
    </SidebarWrapper>
  );
};

export default Sidebar;
