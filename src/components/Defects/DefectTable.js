import React from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

const DefectTable = ({ data, projectTitle }) => (
  <MaterialTable
    title={`Project: ${projectTitle}`}
    data={data}
    columns={[
      {
        title: "Id",
        field: "id",
        maxWidth: 50,
        render: rowData => <Link to={`defects/${rowData.id}`}>{rowData.id}</Link>,
      },
      { title: "Status", field: "status", maxWidth: 70 },
      { title: "Summary", field: "summary" },
      { title: "Priority", field: "priority", maxWidth: 70 },
      { title: "Identifier", field: "identifierId" },
      { title: "Assigned Developer", field: "assignedDevId" },
      { title: "Identified Date", field: "dateIdentified", maxWidth: 100 },
      { title: "Target Resolution Date", field: "targetResDate", maxWidth: 100 }
    ]}
    options={{
      pageSize: 20
    }}
  />
);

export default DefectTable;