import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const initialRows = [
  {
    id: 1,
    fullName: "Jon Snow",
    birthDate: "2009-02-15",
    email: "jon.snow@example.com",
    phone: "123-456-7890",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    fullName: "Cersei Lannister",
    birthDate: "1992-06-01",
    email: "cersei@example.com",
    phone: "234-567-8901",
    role: "Manager",
    status: "Inactive",
  },
  {
    id: 3,
    fullName: "Jaime Lannister",
    birthDate: "1992-06-01",
    email: "jaime@example.com",
    phone: "345-678-9012",
    role: "Editor",
    status: "Active",
  },
  {
    id: 4,
    fullName: "Arya Stark",
    birthDate: "2012-07-04",
    email: "arya@example.com",
    phone: "456-789-0123",
    role: "User",
    status: "Active",
  },
  {
    id: 5,
    fullName: "Daenerys Targaryen",
    birthDate: "1998-03-21",
    email: "dany@example.com",
    phone: "567-890-1234",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 6,
    fullName: "Daenerys Targaryen",
    birthDate: "1998-03-21",
    email: "dany@example.com",
    phone: "567-890-1234",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 7,
    fullName: "Daenerys Targaryen",
    birthDate: "1998-03-21",
    email: "dany@example.com",
    phone: "567-890-1234",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 8,
    fullName: "Daenerys Targaryen",
    birthDate: "1998-03-21",
    email: "dany@example.com",
    phone: "567-890-1234",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 9,
    fullName: "Daenerys Targaryen",
    birthDate: "1998-03-21",
    email: "dany@example.com",
    phone: "567-890-1234",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 10,
    fullName: "Daenerys Targaryen",
    birthDate: "1998-03-21",
    email: "dany@example.com",
    phone: "567-890-1234",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 11,
    fullName: "Daenerys Targaryen",
    birthDate: "1998-03-21",
    email: "dany@example.com",
    phone: "567-890-1234",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 12,
    fullName: "Daenerys Targaryen",
    birthDate: "1998-03-21",
    email: "dany@example.com",
    phone: "567-890-1234",
    role: "Admin",
    status: "Inactive",
  },
];

export default function Admin_Manage() {
  const [rows, setRows] = React.useState(initialRows);

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };
  const handleDeleteAll = () => {
    setRows([]);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 160,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "birthDate",
      headerName: "Birth Date",
      width: 130,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, mt: 1, justifyContent: "center" }}>
          <Button
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px",
              border: "none",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];
  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        mt: 7,
        justifyContent: "center",
        mx: "auto",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableSelectionOnClick
        autoHeight
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            borderRadius: "5px",
            padding: "5px 5px",
            border: "none",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
          onClick={handleDeleteAll}
        >
          Delete All
        </Button>
      </Box>
    </Box>
  );
}
