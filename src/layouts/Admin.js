import React, { useState, useEffect, useRef } from "react";

import PerfectScrollbar from "perfect-scrollbar";
import { Switch, useHistory } from "react-router-dom";

import ProtectedRoute from "auth/ProtectedRoute";
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import { dashboardRoutes, individualRoutes } from "../routes";

let ps;

const allRoutes = [...individualRoutes, ...dashboardRoutes];

const Dashboard = (props) => {
  const mainPanel = useRef();
  const history = useHistory();

  const [backgroundColor, setBackgroundColor] = useState("black");
  const [activeColor, setActiveColor] = useState("info");

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    if (history.action === "PUSH") {
      mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }, [history])

  function handleActiveClick(color) {
    setActiveColor(color);
  }

  function handleBgClick(color) {
    setBackgroundColor(color);
  }

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={dashboardRoutes}
        bgColor={backgroundColor}
        activeColor={activeColor}
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
        </Switch>
        <Footer fluid />
      </div>
    </div>
  )
}

export default Dashboard;