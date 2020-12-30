import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

const DeleteModal = ({ open, setOpen, project, deleteProject }) => {
  const { register, errors, handleSubmit } = useForm();
  const [deleteInput, setDeleteInput] = useState("");

  function handleClose() {
    setDeleteInput("");
    setOpen(false);
  }

  function onSubmit() {
    setDeleteInput("");
    setOpen(false);
    deleteProject(project.id);
  }

  function isSameAsProjectTitle(input) {
    return input === project.title;
  }

  return (
    <Modal isOpen={open} toggle={handleClose} backdrop="static">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={handleClose}>WARNING!</ModalHeader>

        <ModalBody>
          Deleting project will delete all associated defects. Any users associated with the project
          will be labeled unassigned.
          <p>If you still wish to continue, type in the following project title:</p>
          <p><b>{project.title}</b></p>

          <FormGroup>
            <Input
              type="text"
              name="deleteProjectInput"
              id="deleteProjectInput"
              value={deleteInput}
              onChange={e => setDeleteInput(e.target.value)}
              innerRef={register({
                required: true,
                validate: value => isSameAsProjectTitle(value)
              })}
            />
            <p style={{ color: "red" }}>{errors.deleteProjectInput && "Input does not match project title."}</p>
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

export default DeleteModal;