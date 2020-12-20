import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import { fetchAllProjects } from "./redux-store/projectSlice";

import ProtectedRoute from "./auth/ProtectedRoute";
import Loading from "./components/Loading"
import Home from "views/Home";
import AdminLayout from "layouts/Admin";

import "./app.css";

const App = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then(token => {
          dispatch(fetchAllProjects(token))
        });
    }
  }, [isAuthenticated, getAccessTokenSilently, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Switch>
        <ProtectedRoute path="/admin" component={AdminLayout} />
        <Route exact path="/" component={Home} />;
      </Switch>
    </div>
  );
}

export default App;