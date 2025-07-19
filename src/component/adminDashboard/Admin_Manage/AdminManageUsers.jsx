import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { api } from '../../../api/api'
import Loader from "../../Loaders/Loader";
import { toast } from "react-toastify";
import Theme from "../../../../src/theme.js";

function formatDateToLong(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}


export default function Admin_Manage() {
  const columns = [

    {
      field: "username",
      headerName: "Full Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "birthdate",
      headerName: "Birth Date",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return formatDateToLong(params.value);
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, mt: 1, justifyContent: "center" }}>
          <Button
            sx={{
              backgroundColor: Theme.palette.primary.main,
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px",
              border: "none",
              // disabled: true,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: Theme.palette.secondary.main,
              },
            }}
            onClick={() => handleStatus(params.row._id)}
          >
            change status
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
        let page = 1;
        let allUsers = [];
        let hasMore = true;

        while (hasMore) {
          const response = await api.get(`/user?page=${page}&limit=5`);
          const users = response.data.users;

          if (users && users.length > 0) {
            allUsers = [...allUsers, ...users];
            page++;
          } else {
            hasMore = false;
          }
        }

        setRows(allUsers);
      } catch {
        toast.error("An error occurred during fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchData()
  }, [])

  const handleStatus = async (id) => {
    try {
      // Find the user to check their status
      const user = rows.find((row) => row._id === id);
      if (user.status === "active") {
        // Update user status to "inactive"
        await api.patch(`/user/${id}`);
        setRows((prev) =>
          prev.map((row) =>
            row._id === id ? { ...row, status: "inactive" } : row
          )
        );
        toast.success("User inactivated successfully");
      } else {
        await api.patch(`/user/${id}`);
        setRows((prev) =>
          prev.map((row) =>
            row._id === id ? { ...row, status: "active" } : row
          )
        );
        toast.success("User activated successfully");
      }
    } catch {
      toast.error("Failed to update user status");
    }

  };

  return (
    <>
      {loading ? <Loader /> :
        <Box
          sx={{
            height: 500,
            width: "83.8%",
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
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            sx={{
              "& .MuiDataGrid-cell": {
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              },
              "& .MuiDataGrid-columnHeader": {
                justifyContent: "center",
                bgcolor: Theme.palette.primary.main,
                color: "white",
              },
            }}
          />
        </Box>
      }
    </>
  );
}
