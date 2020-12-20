import React from "react";
import MaterialTable from "material-table";

const UserTable = ({ data, title }) => (
  <MaterialTable
    title={title}
    data={data}
    columns={[
      { title: "ID", field: "id", maxWidth: 50 },
      { title: "Name", field: "name" },
      { title: "Email", field: "email" },
      { title: "Role", field: "role" },
      { title: "Assigned Project", field: "projectId" }
    ]}
  />
);

export default UserTable;