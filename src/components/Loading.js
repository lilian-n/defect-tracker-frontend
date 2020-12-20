import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => (
  <div className="spinner loading">
    <Spinner style={{ width: '5rem', height: '5rem' }} />
  </div>
);

export default Loading;