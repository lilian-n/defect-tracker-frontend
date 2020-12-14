import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </div>
  )
}

export default App