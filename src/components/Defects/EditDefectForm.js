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

import { updateDefect } from "../../redux-store/defectSlice";

import AssignDevInput from "./AssignDevInput";

const EditDefectForm = ({ open, setOpen, defect, projectTitle }) => {
  // set default values for react hook form 
  console.log(defect)
  const defaultValues = {
    defectSummary: defect.summary,
    defectDescription: defect.description,
    assignedDev: defect.assignedDevId,
    defectStatus: defect.status,
    defectPriority: defect.priority,
    progress: defect.progress,
    dateIdentified: new Date(defect.dateIdentified),
    defectTargetResDate: defect.targetResDate ? new Date(defect.targetResDate) : null,
    defectActualResDate: defect.actualResDate ? new Date(defect.actualResDate) : null
  }

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const { register, errors, handleSubmit, control } = useForm({ defaultValues });

  function handleClose() {
    setOpen(false);
  }

  async function onSubmit(data) {
    const token = await getAccessTokenSilently();

    // extract dev id from dev object
    const devInput = data.assignedDev ? data.assignedDev.value : null;
    const updateValues = {
      token,
      id: defect.id,
      summary: data.defectSummary,
      description: data.defectDescription,
      assignedDevId: devInput,
      status: data.defectStatus,
      priority: data.defectPriority,
      dateIdentified: data.dateIdentified,
      targetResDate: data.defectTargetResDate,
      actualResDate: data.defectActualResDate,
      progress: data.progress
    }

    console.log('update', updateValues)
    dispatch(updateDefect(updateValues));
    setOpen(false);
  }

  return (
    <Modal isOpen={open} toggle={handleClose} backdrop="static" size="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={handleClose}>Edit Defect #{defect.id}</ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12" lg="4">
              <FormGroup>
                <b><Label for="defectSummary">Summary</Label></b>
                <Input
                  type="text"
                  name="defectSummary"
                  innerRef={register({ required: true })}
                />
                <FormText color="muted"> Required </FormText>
                <p style={{ color: "red" }}>{errors.defectSummary && "Summary is required."}</p>
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
                  value={defect.identifierId}
                />
              </FormGroup>
            </Col>

            <Col md="6" lg="4">
              <FormGroup>
                <b><Label for="assignedDev">Assigned Developer</Label></b>
                <Controller
                  name="assignedDev"
                  control={control}
                  register={register({ required: true })}
                  render={props =>
                    <AssignDevInput
                      value={props.value}
                      onChange={props.onChange}
                      devId={defect.assignedDevId}
                    />
                  }
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
                  innerRef={register({ required: true })}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="CLOSED">CLOSED</option>
                </Input>
                <p style={{ color: "red" }}>{errors.defectStatus && "Status is required."}</p>
              </FormGroup>
            </Col>

            <Col md="6" lg="4">
              <FormGroup>
                <b><Label for="defectPriority">Priority</Label></b>
                <Input
                  type="select"
                  name="defectPriority"
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

            <Col md="6" lg="4">
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

            <Col md="12" lg="4">
              <FormGroup>
                <b><Label for="defectActualResDate">Actual Resolution Date</Label></b>
                <Controller
                  name="defectActualResDate"
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

          <Row>
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
              <FormGroup>
                <b><Label for="progress">Progress</Label></b>
                <Input
                  type="textarea"
                  name="progress"
                  innerRef={register()}
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

};

export default EditDefectForm;