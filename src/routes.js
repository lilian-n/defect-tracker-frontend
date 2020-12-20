/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard";
import Notifications from "views/Notifications";
import Icons from "views/Icons";
import Typography from "views/Typography";
import TableList from "views/Tables";
import UserPage from "views/User";
import ProjectList from "views/Projects/ProjectList";
import SingleProject from "views/Projects/SingleProject";
import AdminDefects from "views/Defects/AdminDefects";
import SingleDefect from "views/Defects/SingleDefect";
import UserList from "views/Users/UserList";

export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "nc-icon nc-umbrella-13",
    component: ProjectList,
    layout: "/admin"
  },
  {
    path: "/defects",
    name: "Defects",
    icon: "nc-icon nc-tile-56",
    component: AdminDefects,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-circle-10",
    component: UserList,
    layout: "/admin"
  }
];

export default dashboardRoutes;

export const individualRoutes = [
  {
    path: "/projects/:id",
    name: "Single Project",
    component: SingleProject,
    layout: "/admin"
  },
  {
    path: "/defects/:id",
    name: "Single Defect",
    component: SingleDefect,
    layout: "/admin"
  }
];

