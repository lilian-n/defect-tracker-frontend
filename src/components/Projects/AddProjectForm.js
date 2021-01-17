import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker"

import { addProject } from "../../redux-store/projectSlice";

const AddProjectForm = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { register, errors, handleSubmit, control } = useForm();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [targetEndDate, setTargetEndDate] = useState(null);


  function handleClose() {
    setTitle("");
    setDescription("");
    setStartDate(new Date());
    setTargetEndDate(null);
    setOpen(false);
  }

  function onSubmit() {
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
    setTargetEndDate(null);
    setOpen(false);
  }


  return (
    <Modal isOpen={open} toggle={handleClose} backdrop="static">
      <Form onSubmit={handleSubmit(onSubmit)}>
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
              innerRef={register({ required: true })}
            />
            <FormText color="muted">
              Required
            </FormText>
            <p style={{ color: "red" }}>{errors.projectTitle && "Project title is required."}</p>
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
            <Controller
              name="startDatePicker"
              id="startDatePicker"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ onChange }) =>
                <DateTimePicker
                  value={startDate}
                  onChange={value => onChange(setStartDate(value))}
                  format="MM/DD/YYYY"
                  time={false}
                />
              }
            />
            <FormText color="muted">
              Required
            </FormText>
            <p style={{ color: "red" }}>{errors.startDatePicker && "Project start date is required."}</p>
          </FormGroup>

          <FormGroup>
            <Label for="targetEndDatePicker">Project End Date</Label>
            <DateTimePicker
              value={targetEndDate}
              onChange={value => setTargetEndDate(value)}
              format="MM/DD/YYYY"
              time={false}
            />
            <FormText color="muted">
              Required
            </FormText>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={handleClose}>Cancel</Button>
          <Button color="info" type="submit">Submit</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default AddProjectForm;