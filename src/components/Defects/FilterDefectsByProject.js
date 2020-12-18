import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Label, Input } from "reactstrap";

import { selectAllProjects } from "../../redux-store/projectSlice";
import { changeFilter } from "../../redux-store/defectFilterReducer";

const FilterDefectsByProject = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects)

  const [value, setValue] = useState("NONE");

  function handleChange(event) {
    dispatch(changeFilter(event.target.value));
    setValue(event.target.value);
  }

  return (
    <FormGroup>
      <Label for="defectFilter">Choose defects by project:</Label>
      <Input
        type="select"
        name="defectSelect"
        id="defectFilter"
        value={value}
        onChange={handleChange}
      >
        <option value={"NONE"}>None</option>
        {
          projects.map(p =>
            <option key={p.id} value={p.id}>{p.title}</option>
          )
        }
      </Input>
    </FormGroup>
  );
}

export default FilterDefectsByProject;