import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
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

import { addNewUser } from "../../redux-store/userSlice";
import { fetchAuthUser } from "../../redux-store/authUserSlice";

import LogoutButton from "../../auth/LogoutButton";
import Loading from "components/Loading";


const SignupForm = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");

  async function addUser() {
    const token = await getAccessTokenSilently();

    const newValues = {
      token,
      name,
      role: "ADMIN",
      email: user.email,
      occupation
    };

    await dispatch(addNewUser(newValues));
    await dispatch(fetchAuthUser(token));
    await history.push("/admin/dashboard");
  }

  return (
    <Modal isOpen={true} backdrop="static">
      <Form onSubmit={handleSubmit(addUser)}>
        <ModalHeader>Initial User Information</ModalHeader>

        <ModalBody>
          <p>You will automatically be assigned an Admin role upon signup.</p>
          <FormGroup>
            <Label for="userName">Name</Label>
            <Input
              type="text"
              name="userName"
              id="userName"
              value={name}
              onChange={e => setName(e.target.value)}
              innerRef={register({ required: true })}
            />
            <FormText>Required</FormText>
            <p style={{ color: "red" }}>{errors.userName && "Name is required."}</p>
          </FormGroup>

          <FormGroup>
            <Label for="occupation">Occupation</Label>
            <Input
              type="select"
              name="occupation"
              id="occupation"
              value={occupation}
              onChange={e => setOccupation(e.target.value)}
            >
              <option value="">None</option>
              <option value="Manager">Manager</option>
              <option value="QA Tester">QA Tester</option>
              <option value="Developer">Developer</option>
            </Input>
          </FormGroup>

        </ModalBody>

        <ModalFooter>
          <LogoutButton />
          <Button color="info" type="submit">Submit</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default withAuthenticationRequired(SignupForm, {
  onRedirecting: () => <Loading />
})