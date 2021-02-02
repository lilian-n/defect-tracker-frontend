import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Container, Button } from 'reactstrap';

import LoginButton from "../../auth/LoginButton";
import SignupButton from "auth/SignupButton";

const Hero = (props) => {
  const { isAuthenticated } = useAuth0();

  let content = isAuthenticated
    ? <div>
      <Link to="/admin/dashboard">
        <Button color="primary">Go to Dashboard</Button>
      </Link>
    </div>
    : <div>
      <SignupButton />
      <LoginButton />
    </div>

  return (
    <div className="p-5 mt-5">
      <Container fluid>
        <img
          alt="illustration-defect-tracker"
          className=" img-responsive center"
          src={require("assets/img/life-management.png")}
        />
        <h1 className="display-3 text-center">Demo Defect Tracker</h1>
        <h2 className="lead text-center"><b>Track, manage, and maintain defects for all your software applications.</b></h2>
        <div className="lead text-center">
          {content}
        </div>
      </Container>
    </div>
  );
};

export default Hero;
