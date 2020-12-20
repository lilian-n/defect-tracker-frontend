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
  Input
} from "reactstrap";
import DatePicker from "../DatePicker";

import { updateProject } from "../../redux-store/projectSlice";

const EditProjectForm = ({ open, setOpen, project }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [startDate, setStartDate] = useState(new Date(project.startDate));
  const [targetEndDate, setTargetEndDate] = useState(new Date(project.targetEndDate));
  const [actualEndDate, setActualEndDate] = useState(project.actualEndDate);

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    getAccessTokenSilently()
      .then(token => {
        const updateValues = {
          token,
          title,
          description,
          startDate,
          targetEndDate,
          actualEndDate
        };
        dispatch(updateProject(updateValues));
      });
  }

  return (
    <Modal isOpen={open} toggle={handleClose}>
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={handleClose}>Edit project</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="projectTitle">Project Title</Label>
            <Input
              type="text"
              name="projectTitle"
              id="projectTitle"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="projectDescription">Project Description</Label>
            <Input
              type="text"
              name="description"
              id="projectDescription"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="startDatePicker">Project Start Date</Label>
            <DatePicker id="startDatePicker" date={startDate} setDate={setStartDate} />
          </FormGroup>

          <FormGroup>
            <Label for="targetEndDatePicker">Project Target End Date</Label>
            <DatePicker id="targetEndDatePicker" date={targetEndDate} setDate={setTargetEndDate} />
          </FormGroup>

          <FormGroup>
            <Label for="targetEndDatePicker">Actual End Date</Label>
            <DatePicker id="targetEndDatePicker" date={actualEndDate} setDate={setActualEndDate} />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default EditProjectForm;