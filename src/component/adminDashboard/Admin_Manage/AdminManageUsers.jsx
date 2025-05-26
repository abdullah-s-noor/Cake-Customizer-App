import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { api } from '../../../api/api'
import Loader from "../../Loaders/Loader";
import { toast } from "react-toastify";

function formatDateToLong(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}


export default function Admin_Manage() {
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
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
      field: "birthdate",
      headerName: "Birth Date",
      width: 130,
      editable: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return formatDateToLong(params.value);
      }
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
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchData = async () => {

      try {

        const responseData = (await api.get('/user?page=1&limit=5')).data
        setRows(responseData.users)

      } catch {

        toast.error("An error occured during fetching users")

      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row._id !== id));
  }

  return (
    <>
      {loading ? <Loader /> :
        <Box
          sx={{
            height: 500,
            width: "auto",
            mt: 7,
            justifyContent: "center",
            mx: "auto",
          }}
        >
          <DataGrid
            rows={rows}
            // @ts-ignore
            columns={columns}
            getRowId={(row) => row._id}
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
        </Box>
      }
    </>
  );
}
