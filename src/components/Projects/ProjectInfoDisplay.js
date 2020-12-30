import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const ProjectInfoDisplay = ({ project }) => {

  let actualEndDate = project.actualEndDate ? project.actualEndDate : "Not assigned";

  return (
    <Row>
      <Col md="12">
        <Card >
          <CardHeader>
            <h5 className="title">Project Title: {`${project.title}`}</h5>
          </CardHeader>

          <CardBody>
            <Row>
              <Col xs="12" sm="6" >
                <h6>Project Description</h6>
                <p>{project.description}</p>
              </Col>

              <Col xs="12" sm="6">
                <h6>Start Date</h6>
                <p>{project.startDate}</p>
              </Col>
            </Row>

            <Row>
              <Col xs="12" sm="6">
                <h6>Target End Date</h6>
                <p>{project.targetEndDate}</p>
              </Col>

              <Col xs="12" sm="6">
                <h6>Actual End Date</h6>
                <p>{actualEndDate}</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default ProjectInfoDisplay;