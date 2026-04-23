import React from "react";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      mobileSidebar
      <aside className="w-full max-w-67.5 hidden lg:block">Sidebar</aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
