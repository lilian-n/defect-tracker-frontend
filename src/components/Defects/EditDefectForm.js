import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import DatePicker from "../DatePicker";

import { updateDefect } from "../../redux-store/defectSlice";

const EditDefectForm = ({ open, setOpen, defect, users, projectTitle }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [summary, setSummary] = useState(defect.summary);
  const [description, setDescription] = useState(defect.description);
  const [status, setStatus] = useState(defect.status);
  const [priority, setPriority] = useState(defect.priority);
  const [dateIdentified, setDateIdentified] = useState(new Date(defect.dateIdentified));
  const [targetResDate, setTargetResDate] = useState(new Date(defect.targetResDate));
  const [actualEndDate, setActualEndDate] = useState(defect.actualEndDate);
  const [progress, setProgress] = useState(defect.progress);

  // Also need to add developer, identifier information
  let identifier = "Goober McGooberton";

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    getAccessTokenSilently()
      .then(token => {
        const updateValues = {
          token,
          summary,
          description,
          status,
          priority,
          dateIdentified,
          targetResDate,
          actualEndDate,
          progress
        };
        dispatch(updateDefect(updateValues));
      });
  }

  return (
    <Modal isOpen={open} toggle={handleClose} size="xl">
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={handleClose}>Edit Defect #{defect.id}</ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12" lg="4">
              <FormGroup>
                <b><Label for="defectSummary">Summary</Label></b>
                <Input
                  type="text"
                  name="defectSummary"
                  id="defectSummary"
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md="6" lg="4">
              <FormGroup>
                <b><Label for="identifier">Identifier</Label></b>
                <Input
                  type="text"
                  disabled
                  name="identifier"
                  id="identifier"
                  value={identifier}
                />
              </FormGroup>
            </Col>

            <Col md="6" lg="4">
              <FormGroup>
                <b><Label for="assignedDev">Assigned Developer</Label></b>
                <Input
                  type="text"
                  name="assignedDev"
                  id="assignedDev"
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md="6" lg="4">
              <FormGroup>
                <b><Label for="defectStatus">Status</Label></b>
                <Input
                  type="select"
                  name="defectStatus"
                  id="defectStatus"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md="6" lg="4">
              <FormGroup>
                <b><Label for="priority">Priority</Label></b>
                <Input
                  type="select"
                  name="priority"
                  id="priority"
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Immediate">Immediate</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md="12" lg="4">
              <FormGroup>
                <b><Label for="projectForDefect">Associated Project</Label></b>
                <Input
                  type="text"
                  disabled
                  name="projectForDefect"
                  id="projectForDefect"
                  value={projectTitle}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <b><Label for="dateIdentified">Date Identified</Label></b>
                <DatePicker id="dateIdentified" date={dateIdentified} setDate={setDateIdentified} />
              </FormGroup>
            </Col>

            <Col md="6" lg="4">
              <FormGroup>
                <b><Label for="defectTargetDate">Target Resolution Date</Label></b>
                <DatePicker id="defectTargetDate" date={targetResDate} setDate={setTargetResDate} />
              </FormGroup>
            </Col>

            <Col md="12" lg="4">
              <FormGroup>
                <b><Label for="defectEndDate">Actual End Date</Label></b>
                <DatePicker id="defectEndDate" date={actualEndDate} setDate={setActualEndDate} />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <FormGroup>
                <b><Label for="defectDescription">Detailed Description</Label></b>
                <Input
                  type="textarea"
                  name="defectDescription"
                  id="defectDescription"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <b><Label for="progress">Progress</Label></b>
                <Input
                  type="textarea"
                  name="progress"
                  id="progress"
                  value={progress}
                  onChange={e => setProgress(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </form>
    </Modal>
  )

};

export default EditDefectForm;