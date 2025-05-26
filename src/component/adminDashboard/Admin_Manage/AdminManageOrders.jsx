import * as React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../api/api.js";
import Loader from "../../Loaders/Loader.jsx";

function formatDateToLong(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
export default function ManageOrders() {
  document.title = "Manage Orders";
  const navigate = useNavigate();
  const [orderRows, setOrderRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = (await api.get("/order/all")).data;
        setOrderRows(responseData.orders);
      } catch {
        toast.error("An error occured during fetching orders");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusChip = (status) => {
    let color, label;

    switch (status) {
      case "Pending":
        color = "warning";
        label = "Pending";
        break;
      case "Delivered":
        color = "success";
        label = "Delivered";
        break;
      case "Cancelled":
        color = "error";
        label = "Cancelled";
        break;
      default:
        color = "default";
        label = status;
    }

    // @ts-ignore
    return <Chip label={label} color={color} size="small" />;
  };
  const handleDelete = (id) => {
    const updatedRows = orderRows.filter((row) => row._id !== id);
    setOrderRows(updatedRows);
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "user",
      headerName: "Customer",
      editable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "items",
      headerName: "items",
      editable: true,
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const items = params.value;
        if (Array.isArray(items) && items.length > 0) {
          // Show a summary: e.g. "summer cake x3, chocolate cake x2"
          return items
            .map(
              (item) => `${item.cake?.name || "Cake"} x${item.quantity || 1}`
            )
            .join(", ");
        }
        return "—";
      },
    },
    {
      field: "totalPrice",
      headerName: "Price",
      editable: true,
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => `${params.value}₪`,
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box width="100%" display="flex" justifyContent="center">
          {getStatusChip(params.value)}
        </Box>
      ),
    },
    {
      field: "createdAt",
      headerName: "BirthDay",
      editable: true,
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return formatDateToLong(params.value);
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" gap={1} width="100%">
          <Button
            variant="outlined"
            size="small"
            sx={{ color: "#1976d2", borderColor: "#1976d2" }}
            onClick={() => {
              navigate("/cart");
            }}
          >
            VIEW
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ color: "#d32f2f", borderColor: "#d32f2f" }}
            onClick={() => {
              handleDelete(params.row._id);
            }}
          >
            DELETE
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ width: "70%", mx: "auto", mt: 9, mb: 9 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Manage Orders
          </Typography>
          <DataGrid
            rows={orderRows}
            // @ts-ignore
            columns={columns}
            getRowId={(row) => row._id}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelection) =>
              setSelectionModel(newSelection)
            }
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            rowsPerPageOptions={[5]}
            disableRowSelectionOnClick
            autoHeight
            sx={{
              "& .MuiDataGrid-cell": {
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              },
              "& .MuiDataGrid-columnHeader": {
                justifyContent: "center",
              },
            }}
          />
        </Box>
      )}
    </>
  );
}
