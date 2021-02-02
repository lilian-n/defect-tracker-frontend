/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { ResponsiveContainer, BarChart, Bar, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import { fetchDefectsByProject } from "../redux-store/defectSlice";
import { selectProjectById, selectDefectsByProjectId } from "../redux-store/projectSlice";

import FilterDefectsByProject from "../components/Defects/FilterDefectsByProject";
import { defectStatusCount, defectCountInPastSixMonths } from "variables/charts"

const Dashboard = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const filter = useSelector(({ defectFilter }) => defectFilter);
  const project = useSelector(state => selectProjectById(state, filter));
  const defects = useSelector(selectDefectsByProjectId(filter));
  const statusCount = defectStatusCount(defects);
  console.log("🚀 ~ file: Dashboard.js ~ line 50 ~ Dashboard ~ defects", defects)

  let projectTitle = project ? project.title : "";

  let openDefects = statusCount.openDefects;
  let closedDefects = statusCount.closedDefects;
  let immediateDefects = statusCount.immediateDefects;

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

  let now = moment();
  const startDate = moment().date(1).month(now.month()).year(now.year());
  const defectCountData = defectCountInPastSixMonths(defects, startDate);

  return (
    <>
      <div className="content">
        <Row>
          <Col sm="12">
            <h3>Data for {projectTitle}</h3>
          </Col>
          <Col sm="12">
            <FilterDefectsByProject />
          </Col>
        </Row>
        <Row>
          <Col lg="4" md="4" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-key-25 text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of Open Defects</p>
                      <CardTitle tag="p">{openDefects}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-check-2 text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Number of Closed Defects</p>
                      <CardTitle tag="p">{closedDefects}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="4" sm="12">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-simple-remove text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Immediate Unresolved Defects</p>
                      <CardTitle tag="p">{immediateDefects}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Defects Added Per Month</CardTitle>
                <p className="card-category">Displays past 6 months</p>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="95%" height={400}>
                  <BarChart data={defectCountData}>
                    <XAxis dataKey="monthYear" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
