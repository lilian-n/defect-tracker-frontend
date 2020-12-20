import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { addProject } from "../../redux-store/projectSlice";
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

const AddProjectForm = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [targetEndDate, setTargetEndDate] = useState(null);

  function handleClose() {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setTargetEndDate(new Date());
    setOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    getAccessTokenSilently()
      .then(token => {
        const newValues = {
          token,
          title,
          description,
          startDate,
          targetEndDate
        };
        dispatch(addProject(newValues))
      });

    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setTargetEndDate(new Date());
    setOpen(false);
  }


  return (
    <Modal isOpen={open} toggle={handleClose}>
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={handleClose}>Add a new project</ModalHeader>

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
            <Label for="targetEndDatePicker">Project End Date</Label>
            <DatePicker id="targetEndDatePicker" date={targetEndDate} setDate={setTargetEndDate} />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={handleClose}>Cancel</Button>
          <Button color="info" onClick={handleSubmit}>Submit</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default AddProjectForm;