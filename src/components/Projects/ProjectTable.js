import React from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";

const ProjectTable = ({ data }) => (
  <MaterialTable
    title="Project List"
    data={data}
    columns={[
      {
        title: 'Id',
        field: 'id',
        render: rowData => <Link to={`admin/projects/${rowData.id}`}>{rowData.id}</Link>,
        maxWidth: 50
      },
      { title: 'Title', field: 'title', maxWidth: 100 },
      { title: 'Description', field: 'description' },
      { title: 'Start Date', field: 'startDate', maxWidth: 100 },
      { title: 'Target End Date', field: 'targetEndDate', maxWidth: 100 },
      { title: 'Actual End Date', field: 'actualEndDate', maxWidth: 100 },
    ]}
  />
);

export default ProjectTable;