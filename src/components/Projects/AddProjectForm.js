import React from "react";
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
  // set default values for react hook form
  const defaultValues = {
    projectTitle: "",
    projectDescription: "",
    projectStartDate: new Date(),
    projectTargetEndDate: null
  }

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { register, errors, handleSubmit, control } = useForm({ defaultValues });

  function handleClose() {
    setOpen(false);
  }

  async function onSubmit(data) {
    const token = await getAccessTokenSilently();

    const newValues = {
      token,
      title: data.projectTitle,
      description: data.projectDescription,
      startDate: data.projectStartDate,
      targetEndDate: data.projectTargetEndDate
    }

    dispatch(addProject(newValues))
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
              name="projectDescription"
              id="projectDescription"
              innerRef={register({ required: true })}
            />
            <FormText color="muted">
              Required
            </FormText>
            <p style={{ color: "red" }}>{errors.projectDescription && "Project description is required."}</p>
          </FormGroup>

          <FormGroup>
            <Label for="projectStartDate">Project Start Date</Label>
            <Controller
              name="projectStartDate"
              control={control}
              register={register({ required: true })}
              rules={{ required: true }}
              render={props =>
                <DateTimePicker
                  onChange={(e) => props.onChange(e)}
                  value={props.value}
                  format="MM/DD/YYYY"
                  time={false}
                />
              }
            />
            <FormText color="muted">
              Required
            </FormText>
            <p style={{ color: "red" }}>{errors.projectStartDate && "Project start date is required."}</p>
          </FormGroup>

          <FormGroup>
            <Label for="projectTargetEndDate">Project Target End Date</Label>
            <Controller
              name="projectTargetEndDate"
              control={control}
              register={register({ required: true })}
              rules={{ required: true }}
              render={props =>
                <DateTimePicker
                  onChange={(e) => props.onChange(e)}
                  value={props.value}
                  format="MM/DD/YYYY"
                  time={false}
                />
              }
            />
            <FormText color="muted">
              Required
            </FormText>
            <p style={{ color: "red" }}>{errors.projectTargetEndDate && "Project target end date is required."}</p>
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