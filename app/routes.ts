import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route("signin", "routes/root/Sign-in.tsx"),
  route("/", "routes/admin/Home.tsx"),
  layout("routes/admin/AdminLayout.tsx", [
    route("dashboard", "routes/admin/Dashboard.tsx"),
    route("allusers", "routes/admin/AllUsers.tsx"),
  ]),
] satisfies RouteConfig;
