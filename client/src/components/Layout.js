import React from "react";
import LayoutWrapper from "./styles/LayoutWrapper";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <div className="page-body">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">{children}</div>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;
