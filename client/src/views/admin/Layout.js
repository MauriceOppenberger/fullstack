import React from "react";
import LayoutWrapper from "./styles/LayoutWrapper";
import Sidebar from "../../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
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
