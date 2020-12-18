import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { Button } from "reactstrap";

import { fetchDefectsByProject } from "../../redux-store/defectSlice";
import { selectProjectById, selectDefectsByProjectId } from "../../redux-store/projectSlice";

import FilterDefectsByProject from "../../components/Defects/FilterDefectsByProject";
import DefectTable from "../../components/Defects/DefectTable";

const AdminDefects = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const filter = useSelector(({ defectFilter }) => defectFilter);
  const project = useSelector(state => selectProjectById(state, filter));
  const defects = useSelector(selectDefectsByProjectId(filter));
  const mutableDefects = _.cloneDeep(defects);

  useEffect(() => {
    if (filter !== "NONE") {
      getAccessTokenSilently()
        .then(token => {
          const fetchValues = {
            token,
            projectId: filter
          }
          dispatch(fetchDefectsByProject(fetchValues));
        })
    }
  }, [filter, getAccessTokenSilently, dispatch]);

  if (filter === "NONE") {
    return (
      <div className="content">
        <FilterDefectsByProject />
      </div>
    )
  }

  return (
    <div className="content">
      <FilterDefectsByProject />
      <DefectTable
        data={mutableDefects}
        projectTitle={project.title}
      />
    </div>
  )
}

export default AdminDefects;