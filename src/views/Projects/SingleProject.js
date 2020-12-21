import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";

import { fetchOneProject, selectProjectById } from "../../redux-store/projectSlice";

import Loading from "../../components/Loading";
import ProjectInfoDisplay from "../../components/Projects/ProjectInfoDisplay";
import EditProjectForm from "../../components/Projects/EditProjectForm";

// Need DeleteProject, UserTable

const SingleProject = () => {
  const id = Number(useParams().id);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const project = useSelector(state => selectProjectById(state, id));
  const status = useSelector(({ projects }) => projects.status);
  const error = useSelector(({ projects }) => projects.error);
  // const users = useSelector(selectUsersByProjectId(id));

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => {
        let fetchValues = { token, projectId: id };
        dispatch(fetchOneProject(fetchValues));
      })
  }, [getAccessTokenSilently, dispatch, id]);


  if (status === "failed") {
    return (
      <div className="content container">
        <p>{error}</p>
      </div>
    );
  }

  if (!!project) {
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
              Edit Project
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <EditProjectForm open={formOpen} setOpen={setFormOpen} project={project} />
            <ProjectInfoDisplay project={project} />
          </Col>
        </Row>
      </div>
    );
  }

  return <Loading />;
}

export default SingleProject;