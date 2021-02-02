import React, { useEffect, useRef } from "react";

import PerfectScrollbar from "perfect-scrollbar";
import { Switch, useHistory, Route } from "react-router-dom";

import ProtectedRoute from "auth/ProtectedRoute";
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import NotFound from "views/NotFound";

import { dashboardRoutes, individualRoutes } from "../routes";

const allRoutes = [...individualRoutes, ...dashboardRoutes];

const Dashboard = (props) => {
  const mainPanel = useRef();
  const history = useHistory();

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    if (history.action === "PUSH") {
      mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }, [history])

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={dashboardRoutes}
        bgColor={"black"}
        activeColor={"info"}
      />
      <div className="main-panel" ref={mainPanel}>
        <Navbar {...props} />
        <Switch>
          {allRoutes.map((prop, key) => {
            return (
              <ProtectedRoute
                exact
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          <Route component={NotFound} />
        </Switch>
        <Footer fluid />
      </div>
    </div>
  )
}

export default Dashboard;