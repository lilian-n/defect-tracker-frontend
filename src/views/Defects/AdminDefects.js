import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { Col, Row, Button } from "reactstrap";

import { fetchDefectsByProject } from "../../redux-store/defectSlice";
import { selectProjectById, selectDefectsByProjectId } from "../../redux-store/projectSlice";

import FilterDefectsByProject from "../../components/Defects/FilterDefectsByProject";
import DefectTable from "../../components/Defects/DefectTable";
import AddDefectForm from "../../components/Defects/AddDefectForm";

const AdminDefects = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const filter = useSelector(({ defectFilter }) => defectFilter);
  const project = useSelector(state => selectProjectById(state, filter));
  const defects = useSelector(selectDefectsByProjectId(filter));
  const mutableDefects = _.cloneDeep(defects);

  const [formOpen, setFormOpen] = useState(false);
  const projectTitle = project ? project.title : "";

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
      <Row>
        <Col>
          <FilterDefectsByProject />
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            color="info"
            onClick={() => setFormOpen(true)}
            size="sm"
            style={{ height: 40 }}
          >
            Add New Defect
            </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <AddDefectForm
            open={formOpen}
            setOpen={setFormOpen}
            project={project}
          />
          <DefectTable
            data={mutableDefects}
            projectTitle={projectTitle}
          />
        </Col>
      </Row>
    </div>
  )
}

export default AdminDefects;