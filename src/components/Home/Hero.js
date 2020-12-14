import React from "react";
import logo from "../../assets/img/bug-icon.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Jumbotron } from "reactstrap";

import LoginButton from "../../auth/LoginButton";

const Hero = () => {
  const { isAuthenticated } = useAuth0()

  let content = isAuthenticated
    ? <div></div>
    : <LoginButton />

  return (
    <Jumbotron>
      <h1 className="display-3">Defect Tracker</h1>
      <p className="lead">Log into the application here.</p>
      <p className="lead">
        <LoginButton />
      </p>
    </Jumbotron>
  );
};

export default Hero;