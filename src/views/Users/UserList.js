import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { Row, Col } from "reactstrap";

import { fetchAllUsers, selectAllUsers } from "../../redux-store/userSlice";

import UserTable from "../../components/Users/UserTable";

const UserList = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const users = useSelector(selectAllUsers);
  const mutableUsers = _.cloneDeep(users);

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => {
        dispatch(fetchAllUsers(token));
      })
  }, [getAccessTokenSilently, dispatch])

  return (
    <div className="content">
      <Row>

      </Row>
      <Row>
        <Col>
          <UserTable data={mutableUsers} title="" />
        </Col>
      </Row>
    </div>
  )
}

export default UserList;