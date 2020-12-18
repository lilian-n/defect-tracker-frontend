import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { fetchAllProjects, selectAllProjects } from "../../redux-store/projectSlice";
import { Row, Col, Button } from "reactstrap";

import ProjectTable from "../../components/Projects/ProjectTable";
import AddProjectForm from "components/Projects/AddProjectForm";

const Projects = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const projects = useSelector(selectAllProjects);
  const mutableProjects = _.cloneDeep(projects);

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => {
        dispatch(fetchAllProjects(token))
      })
  }, [getAccessTokenSilently, dispatch])

  return (
    <div className="content container">
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            color="info"
            onClick={() => setFormOpen(true)}
            size="sm"
            style={{ height: 40 }}
          >
            Add Project
            </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <AddProjectForm open={formOpen} setOpen={setFormOpen} />
          <ProjectTable data={mutableProjects} />
        </Col>
      </Row>

    </div>
  );
}

export default Projects;