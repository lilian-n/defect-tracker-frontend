import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

import { fetchAuthUser } from "./redux-store/authUserSlice";
import { fetchAllProjects } from "./redux-store/projectSlice";

import Can from "./components/Can";
import ProtectedRoute from "./auth/ProtectedRoute";
import Loading from "./components/Loading"
import Home from "views/Home";
import AdminLayout from "layouts/Admin";
import SignupForm from "./components/Users/UserSignupForm";

import "./app.css";


const App = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser.data);
  console.log("🚀 ~ file: App.js ~ line 23 ~ App ~ authUser", authUser)

  // Set localizer for date pickers
  Moment.locale("en");
  momentLocalizer();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently()
        .then(token => {
          dispatch(fetchAuthUser(token));
          dispatch(fetchAllProjects(token));
        });
    }
  }, [isAuthenticated, getAccessTokenSilently, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />;
        <Route path="/signup" role={authUser.role} component={SignupForm} />
        <ProtectedRoute path="/admin" role={authUser.role} component={AdminLayout} />
      </Switch>
    </div>
  );
}

export default App;