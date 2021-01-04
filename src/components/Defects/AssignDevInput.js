import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import { selectAllUsers } from "../../redux-store/userSlice";

const AssignDevInput = ({ selection, setSelection }) => {
  const users = useSelector(state => selectAllUsers(state));
  const mappedUsers = users.map(u => {
    return { value: u.id, label: u.name }
  })

  return (
    <Select value={selection} options={mappedUsers} onChange={setSelection} />
  )
}

export default AssignDevInput;