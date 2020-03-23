import React from "react";
import LayoutWrapper from "./styles/LayoutWrapper";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ user, children }) => {
  // use layout styles based on authentication of user
  // avoid sperate layout components for public and admin view

  return (
    <LayoutWrapper>
      <Header />

      <div className={user ? "page-body" : "fullwidth-page-body"}>
        {user && (
          <div className="sidebar">
            <Sidebar />
          </div>
        )}

        <div className="main">{children}</div>
      </div>
    </LayoutWrapper>
  );
};
export default Layout;
