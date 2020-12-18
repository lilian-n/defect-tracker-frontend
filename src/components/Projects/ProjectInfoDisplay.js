import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const ProjectInfoDisplay = ({ project }) => (
  <Row>
    <Col md="12">
      <Card >
        <CardHeader>
          <h5 className="title">Project Title: {`${project.title}`}</h5>
        </CardHeader>

        <CardBody>
          <div className="typography-line">
            <h6>Project Description</h6>
            <p>{`${project.description}`}</p>
          </div>

          <div className="typography-line">
            <h6>Start Date</h6>
            <p>{`${project.startDate}`}</p>
          </div>

          <div className="typography-line">
            <h6>Target End Date</h6>
            <p>{`${project.targetEndDate}`}</p>
          </div>

          <div className="typography-line">
            <h6>Actual End Date</h6>
            <p>{`${project.actualEndDate}`}</p>
          </div>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default ProjectInfoDisplay;