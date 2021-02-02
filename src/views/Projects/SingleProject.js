import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";

import { fetchOneProject, selectProjectById, deleteProject } from "../../redux-store/projectSlice";

import Loading from "../../components/Loading";
import ProjectInfoDisplay from "../../components/Projects/ProjectInfoDisplay";
import EditProjectForm from "../../components/Projects/EditProjectForm";
import DeleteModal from "../../components/Projects/DeleteModal";

// Need DeleteProject, UserTable

const SingleProject = () => {
  const id = Number(useParams().id);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(state => selectProjectById(state, id));
  const status = useSelector(({ projects }) => projects.status);
  const error = useSelector(({ projects }) => projects.error);
  // const users = useSelector(selectUsersByProjectId(id));

  const [formOpen, setFormOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => {
        let fetchValues = { token, projectId: id };
        dispatch(fetchOneProject(fetchValues));
      })
  }, [getAccessTokenSilently, dispatch, id]);

  function handleDelete(id) {
    getAccessTokenSilently()
      .then(token => {
        const delectProjectInfo = {
          token,
          id
        };

        dispatch(deleteProject(delectProjectInfo));
      })
      .then(() => {
        history.push('/admin/projects')
      })
  }

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
            <DeleteModal open={delModalOpen} setOpen={setDelModalOpen} project={project} deleteProject={handleDelete} />
            <ProjectInfoDisplay project={project} />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            {
              id === 1
                ? <p>Delete has been disabled for this project in order to preserve demo data. A new project can be created and deleted to test the feature.</p>
                : <div></div>
            }
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              color="danger"
              onClick={() => setDelModalOpen(true)}
              size="sm"
              style={{ height: 40 }}
              disabled={id === 1 ? true : false}
            >
              Delete Project
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return <Loading />;
}

export default SingleProject;