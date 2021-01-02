import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const DefectInfoDisplay = ({ defect, projectTitle }) => (
  <Row>
    <Col md="12">
      <Card>
        <CardHeader>
          <h5 className="title">Defect #{`${defect.id}`}</h5>
        </CardHeader>

        <CardBody>
          <Row>
            <Col xs="12" lg="4">
              <h6>Summary</h6>
              <p>{defect.summary}</p>
            </Col>
            <Col xs="6" lg="4">
              <h6>Identifier</h6>
              <p>{defect.identifierId}</p>
            </Col>
            <Col xs="6" md="4">
              <h6>Assigned Developer</h6>
              <p>{defect.assignedDevId}</p>
            </Col>
          </Row>

          <Row>
            <Col xs="6" lg="4">
              <h6>Status</h6>
              <p>{defect.status}</p>
            </Col>
            <Col xs="6" lg="4">
              <h6>Priority</h6>
              <p>{defect.priority}</p>
            </Col>
            <Col xs="12" lg="4">
              <h6>Associated Project</h6>
              <p>{projectTitle}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h6 xs="6" lg="4">Date Identified</h6>
              <p>{defect.dateIdentified}</p>
            </Col>
            <Col xs="6" lg="4">
              <h6>Target Resolution Date</h6>
              <p>{defect.targetResDate}</p>
            </Col>
            <Col xs="12" lg="4">
              <h6>Actual Resolution Date</h6>
              <p>{defect.actualResDate}</p>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col xs="12" lg="6">
              <h6>Detailed Description</h6>
              <p>{defect.description}</p>
            </Col>
            <Col xs="12" lg="6">
              <h6>Progress</h6>
              <p>{defect.progress}</p>
            </Col>
          </Row>

        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default DefectInfoDisplay;