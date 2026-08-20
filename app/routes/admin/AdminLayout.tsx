// @ts-nocheck
import React from "react";
import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { MobileSidebar, Navitems } from "../../../Components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect("/signin");
    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === "user") return redirect("/");
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error in client loader:", error);
    return redirect("/signin");
  }
}
const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-67.5 hidden lg:block">
        <SidebarComponent className="width-[270px] hidden lg:block">
          <Navitems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
