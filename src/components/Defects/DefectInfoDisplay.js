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
            <Col>
              <h6>Summary</h6>
              <p>{defect.summary}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h6>Status</h6>
              <p>{defect.status}</p>
            </Col>
            <Col>
              <h6>Priority</h6>
              <p>{defect.priority}</p>
            </Col>
            <Col>
              <h6>Associated Project</h6>
              <p>{projectTitle}</p>
            </Col>
          </Row>

          <Row>

          </Row>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default DefectInfoDisplay;