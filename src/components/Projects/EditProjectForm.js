import React from "react";
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
import DateTimePicker from "react-widgets/lib/DateTimePicker";

import { updateProject } from "../../redux-store/projectSlice";


const EditProjectForm = ({ open, setOpen, project }) => {
  // set default values for react hook form
  const defaultValues = {
    editProjectTitle: project.title,
    editProjectDescription: project.description,
    projectStartDate: new Date(project.startDate),
    projectTargetEndDate: new Date(project.targetEndDate),
    projectActualEndDate: project.actualEndDate ? new Date(project.actualEndDate) : null
  }

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { register, errors, handleSubmit, control } = useForm({ defaultValues });

  function handleClose() {
    setOpen(false);
  }

  async function onSubmit(data) {
    const token = await getAccessTokenSilently();

    const updateValues = {
      token,
      id: project.id,
      title: data.editProjectTitle,
      description: data.editProjectDescription,
      startDate: data.projectStartDate,
      targetEndDate: data.projectTargetEndDate,
      actualEndDate: data.projectActualEndDate
    }

    dispatch(updateProject(updateValues));
    setOpen(false);
  }

  return (
    <Modal isOpen={open} toggle={handleClose} backdrop="static">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={handleClose}>Edit project</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="editProjectTitle">Project Title</Label>
            <Input
              type="text"
              name="editProjectTitle"
              innerRef={register({ required: true })}
            />
            <FormText color="muted"> Required </FormText>
            <p style={{ color: "red" }}>{errors.editProjectTitle && "Project title is required."}</p>
          </FormGroup>

          <FormGroup>
            <Label for="editProjectDescription">Project Description</Label>
            <Input
              type="text"
              name="editProjectDescription"
              innerRef={register({ required: true })}
            />
            <FormText color="muted"> Required </FormText>
            <p style={{ color: "red" }}>{errors.editProjectDescription && "Project description is required."}</p>
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
                  value={props.value}
                  onChange={(e) => props.onChange(e)}
                  format="MM/DD/YYYY"
                  time={false}
                />
              }
            />
            <FormText color="muted"> Required </FormText>
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
                  value={props.value}
                  onChange={(e) => props.onChange(e)}
                  format="MM/DD/YYYY"
                  time={false}
                />
              }
            />
            <FormText color="muted"> Required </FormText>
            <p style={{ color: "red" }}>{errors.projectTargetEndDate && "Project target end date is required."}</p>
          </FormGroup>

          <FormGroup>
            <Label for="projectActualEndDate">Actual End Date</Label>
            <Controller
              name="projectActualEndDate"
              control={control}
              register={register()}
              render={props =>
                <DateTimePicker
                  value={props.value}
                  onChange={(e) => props.onChange(e)}
                  format="MM/DD/YYYY"
                  time={false}
                />
              }
            />
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