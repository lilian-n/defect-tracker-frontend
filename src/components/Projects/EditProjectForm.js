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
  Input
} from "reactstrap";
import DatePicker from "../DatePicker";

import { updateProject } from "../../redux-store/projectSlice";

const EditProjectForm = ({ open, setOpen, project }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { register, errors, handleSubmit, control } = useForm();

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [startDate, setStartDate] = useState(new Date(project.startDate));
  const [targetEndDate, setTargetEndDate] = useState(new Date(project.targetEndDate));
  const [actualEndDate, setActualEndDate] = useState(project.actualEndDate);

  function handleClose() {
    setTitle(project.title);
    setDescription(project.description);
    setStartDate(new Date(project.startDate));
    setTargetEndDate(new Date(project.targetEndDate))
    setOpen(false);
  }

  function onSubmit() {
    getAccessTokenSilently()
      .then(token => {
        const updateValues = {
          token,
          id: project.id,
          title,
          description,
          startDate,
          targetEndDate,
          actualEndDate
        };
        dispatch(updateProject(updateValues));
      });
    setOpen(false);
  }

  return (
    <Modal isOpen={open} toggle={handleClose} backdrop="static">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={handleClose}>Edit project</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="projectTitle">Project Title</Label>
            <Input
              type="text"
              name="editProjectTitle"
              id="projectTitle"
              value={title}
              onChange={e => setTitle(e.target.value)}
              innerRef={register({ required: true })}
            />
            <FormText color="muted">
              Required
            </FormText>
            <p style={{ color: "red" }}>{errors.editProjectTitle && "Project title is required."}</p>
          </FormGroup>

          <FormGroup>
            <Label for="projectDescription">Project Description</Label>
            <Input
              type="text"
              name="description"
              id="projectDescription"
              value={description}
              onChange={e => setDescription(e.target.value)}
              innerRef={register({ required: true })}
            />
            <FormText color="muted">
              Required
            </FormText>
            <p style={{ color: "red" }}>{errors.description && "Project description is required."}</p>
          </FormGroup>

          <FormGroup>
            <Label for="startDatePicker">Project Start Date</Label>
            <DatePicker id="startDatePicker" date={startDate} setDate={setStartDate} />
            <FormText color="muted">
              Required
            </FormText>
          </FormGroup>

          <FormGroup>
            <Label for="targetEndDatePicker">Project Target End Date</Label>
            <DatePicker id="targetEndDatePicker" date={targetEndDate} setDate={setTargetEndDate} />
            <FormText color="muted">
              Required
            </FormText>
          </FormGroup>

          <FormGroup>
            <Label for="actualEndDatePicker">Actual End Date</Label>
            <DatePicker id="actualEndDatePicker" date={actualEndDate} setDate={setActualEndDate} />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={handleClose}>Cancel</Button>
          <Button color="info" type="submit">Submit</Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default EditProjectForm;