// import React from 'react'

import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default Layout;
