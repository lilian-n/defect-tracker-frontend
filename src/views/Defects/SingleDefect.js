import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

import { fetchOneDefect, selectDefectById } from "../../redux-store/defectSlice";

import Loading from "../../components/Loading";
import DefectInfoDisplay from "../../components/Defects/DefectInfoDisplay";
import { selectProjectById } from "redux-store/projectSlice";

const SingleDefect = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const id = useParams().id;

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => {
        const fetchValues = { token, defectId: id };
        dispatch(fetchOneDefect(fetchValues))
      })
      .then()
  }, [getAccessTokenSilently, dispatch])

  const defect = useSelector(state => selectDefectById(state, id));
  const status = useSelector(({ defects }) => defects.status);
  const error = useSelector(({ defects }) => defects.error);

  let projectIdForDefect = defect ? defect.projectId : "";
  const project = useSelector(state => selectProjectById(state, projectIdForDefect));

  let projectTitle = project ? project.title : "";

  if (status == "failed") {
    return (
      <div className="content">{error}</div>
    )
  }

  if (defect) {
    return (
      <div className="content">
        <DefectInfoDisplay defect={defect} projectTitle={projectTitle} />
      </div>
    )
  }

  return <Loading />;
}

export default SingleDefect;