import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  FormText,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import DatePicker from "../DatePicker";

import { addDefect } from "../../redux-store/defectSlice";

const AddDefectForm = ({ open, setOpen, project }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { register, errors, handleSubmit, control } = useForm();

  const projectId = project.id;
  const projectTitle = project.title;

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dateIdentified, setDateIdentified] = useState(new Date());
  const [targetResDate, setTargetResDate] = useState(null);

  function handleClose() {
    setSummary("");
    setDescription("");
    setPriority("");
    setDateIdentified(new Date());
    setTargetResDate(null);
    setOpen(false);
  }

  function onSubmit() {
    getAccessTokenSilently()
      .then(token => {
        const newValues = {
          token,
          summary,
          description,
          priority,
          dateIdentified,
          targetResDate,
          projectId
        }

        dispatch(addDefect(newValues));
      });

    setSummary("");
    setDescription("");
    setPriority("");
    setDateIdentified(new Date());
    setTargetResDate(null);
    setOpen(false);
  }

  return (
    <Modal isOpen={open} toggle={handleClose} backdrop="static">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={handleClose}>Add New Defect</ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
              <FormGroup>
                <b><Label for="associatedProject">Associated Project</Label></b>
                <Input
                  type="text"
                  name="associatedProject"
                  id="associatedProject"
                  value={projectTitle}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col md="12">
              <FormGroup>
                <b><Label for="defectSummary">Summary</Label></b>
                <Input
                  type="text"
                  name="defectSummary"
                  id="defectSummary"
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  innerRef={register({ required: true })}
                />
                <FormText color="muted">
                  Required
                </FormText>
                <p style={{ color: "red" }}>{errors.defectSummary && "Defect summary is required."}</p>
              </FormGroup>
            </Col>

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
              {/** This field is required as well */}
              <FormGroup>
                <b><Label for="dateIdentified">Date Identified</Label></b>
                <DatePicker id="dateIdentified" date={dateIdentified} setDate={setDateIdentified} />
                <FormText color="muted">
                  Required
                </FormText>
              </FormGroup>
            </Col>

            <Col xs="12">
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

            <Col xs="12">
              <FormGroup>
                <b><Label for="defectTargetDate">Target Resolution Date</Label></b>
                <DatePicker id="defectTargetDate" date={targetResDate} setDate={setTargetResDate} />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={handleClose}>Cancel</Button>
          <Button color="info" type="submit">Submit</Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default AddDefectForm;