import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";

import { fetchOneDefect, selectDefect, deleteDefect } from "../../redux-store/defectSlice";
import { selectProjectById } from "redux-store/projectSlice";

import Loading from "../../components/Loading";
import DefectInfoDisplay from "../../components/Defects/DefectInfoDisplay";
import EditDefectForm from "../../components/Defects/EditDefectForm";

const SingleDefect = () => {
  const id = Number(useParams().id);
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  const defect = useSelector(selectDefect(id));
  const status = useSelector(({ defects }) => defects.status);
  const error = useSelector(({ defects }) => defects.error);

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => {
        const fetchValues = { token, defectId: id };
        dispatch(fetchOneDefect(fetchValues))
      })
      .then()
  }, [getAccessTokenSilently, dispatch, id])

  function handleDelete() {
    getAccessTokenSilently()
      .then(token => {
        const defectDeleteInfo = {
          token,
          id,
          projectId: defect.projectId
        };

        dispatch(deleteDefect(defectDeleteInfo))
      })
      .then(() => {
        history.push('/admin/defects')
      })
  }

  let projectIdForDefect = defect ? defect.projectId : "";
  const project = useSelector(state => selectProjectById(state, projectIdForDefect));

  let projectTitle = project ? project.title : "";

  if (status === "failed") {
    return (
      <div className="content container">{error}</div>
    )
  }

  if (!!defect) {
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
              Edit Defect
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <EditDefectForm
              open={formOpen}
              setOpen={setFormOpen}
              defect={defect}
              projectTitle={projectTitle}
            />
            <DefectInfoDisplay defect={defect} projectTitle={projectTitle} />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              color="danger"
              onClick={handleDelete}
              size="sm"
              style={{ height: 40 }}
            >
              Delete Defect
            </Button>
          </Col>
        </Row>
      </div>
    )
  }

  return <Loading />;
}

export default SingleDefect;