import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import { selectAllUsers } from "../../redux-store/userSlice";

const AssignDevInput = ({ value, onChange, devId }) => {
  const users = useSelector(state => selectAllUsers(state));
  const mappedUsers = users.map(u => {
    return { value: u.id, label: u.name }
  })

  return (
    <Select defaultValue={devId} value={value} options={mappedUsers} onChange={onChange} />
  )
}

export default AssignDevInput;