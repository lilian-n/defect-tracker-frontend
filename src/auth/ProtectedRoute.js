import React from "react";
import { Redirect, Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import Loading from "../components/Loading"

const ProtectedRoute = ({ component: Component, role, ...args }) => (
  <Route
    render={(props) => {
      if (role === "UNASSIGNED") {
        return <Redirect to={{ pathname: "/signup", state: { from: props.location } }} />
      }

      return <Component {...props} />
    }}
    {...args}
  />
);

export default withAuthenticationRequired(ProtectedRoute, {
  onRedirecting: () => <Loading />
})