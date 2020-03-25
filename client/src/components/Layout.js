import React from "react";
import "./Layout.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ user, children }) => {
  // use layout styles based on authentication of user
  // avoid sperate layout components for public and admin view

  return (
    <main>
      <Header />

      <div className={user ? "page-body" : "fullwidth-page-body"}>
        {user && (
          <div className="sidebar">
            <Sidebar />
          </div>
        )}

        <div className="main">{children}</div>
      </div>
      <Footer />
    </main>
  );
};
export default Layout;
