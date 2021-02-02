import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const NotFound = () => (
  <div className="content">
    <h1>404 - Not Found!</h1>
    <Link to="/admin/dashboard">
      <Button color="primary">Go to Dashboard</Button>
    </Link>
  </div>
);

export default NotFound;