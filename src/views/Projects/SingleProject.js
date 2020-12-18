import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useHistory } from "react-router-dom";

import { fetchOneProject, selectProjectById } from "../../redux-store/projectSlice";

import Loading from "../../components/Loading";
import ProjectInfoDisplay from "../../components/Projects/ProjectInfoDisplay";

// Need DeleteProject, UserTable

const SingleProject = () => {
  const id = useParams().id;
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => {
        let fetchValues = { token, projectId: id };
        dispatch(fetchOneProject(fetchValues));
      })
  }, [getAccessTokenSilently, dispatch]);

  const project = useSelector(state => selectProjectById(state, id));
  const status = useSelector(({ projects }) => projects.status);
  const error = useSelector(({ projects }) => projects.error);
  // const users = useSelector(selectUsersByProjectId(id));

  if (status == "failed") {
    return (
      <div className="content container">
        <p>{error}</p>
      </div>
    );
  }

  if (project) {
    return (
      <div className="content container">
        <ProjectInfoDisplay project={project} />
      </div>
    );
  }

  return <Loading />;
}

export default SingleProject;