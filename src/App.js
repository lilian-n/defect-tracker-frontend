import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ProtectedRoute from "./auth/ProtectedRoute";
import Loading from "./components/Loading"
import Home from "views/Home";
import AdminLayout from "layouts/Admin";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isAuthenticated) {
    return <Route path="/" component={Home} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Switch>
        <ProtectedRoute path="/admin" component={AdminLayout} />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </div>
  );
}

export default App;