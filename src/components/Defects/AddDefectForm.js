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
  Input,
  Row,
  Col
} from "reactstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

import { addDefect } from "../../redux-store/defectSlice";

const AddDefectForm = ({ open, setOpen, project }) => {

  const defaultValues = {
    defectSummary: "",
    defectDescription: "",
    priority: "",
    dateIdentified: new Date(),
    defectTargetResDate: null
  }

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { register, errors, handleSubmit, control } = useForm({ defaultValues });

  const projectId = project.id;
  const projectTitle = project.title;

  function handleClose() {
    setOpen(false);
  }

  async function onSubmit(data) {
    const token = await getAccessTokenSilently();

    const newValues = {
      token,
      summary: data.defectSummary,
      description: data.defectDescription,
      priority: data.priority,
      dateIdentified: data.dateIdentified,
      targetResDate: data.defectTargetResDate,
      projectId: projectId
    }

    dispatch(addDefect(newValues));
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
                  innerRef={register({ required: true })}
                />
                <FormText color="muted"> Required </FormText>
                <p style={{ color: "red" }}>{errors.defectSummary && "Defect summary is required."}</p>
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <b><Label for="defectDescription">Detailed Description</Label></b>
                <Input
                  type="textarea"
                  name="defectDescription"
                  innerRef={register()}
                />
              </FormGroup>
            </Col>

            <Col xs="12">
              {/** This field is required as well */}
              <FormGroup>
                <b><Label for="dateIdentified">Date Identified</Label></b>
                <Controller
                  name="dateIdentified"
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
                <p style={{ color: "red" }}>{errors.dateIdentified && "Date identified is required."}</p>
              </FormGroup>
            </Col>

            <Col xs="12">
              <FormGroup>
                <b><Label for="priority">Priority</Label></b>
                <Input
                  type="select"
                  name="priority"
                  innerRef={register()}
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
                <b><Label for="defectTargetResDate">Target Resolution Date</Label></b>
                <Controller
                  name="defectTargetResDate"
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