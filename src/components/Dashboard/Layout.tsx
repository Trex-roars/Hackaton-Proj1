import React from "react";

const Layout = ({ children }) => (
  <div className="relative mt-5 max-h-screen text-white overflow-hidden">
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black" />
    <div className="relative z-20">{children}</div>
  </div>
);

export default Layout;
