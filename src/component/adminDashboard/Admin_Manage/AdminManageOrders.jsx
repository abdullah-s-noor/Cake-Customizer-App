import * as React from "react";
import { Box, Button, Chip, Typography, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../api/api.js";
import Loader from "../../Loaders/Loader.jsx";
import Theme from "../../../../src/theme.js";

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
  const [loading, setLoading] = useState(true);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = (await api.get("/order/all?limit=20")).data;
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
      case "pending":
        color = "warning";
        label = "Pending";
        break;
      case "accepted":
        color = "success";
        label = "Accepted";
        break;
      case "cancelled":
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

  // const handleCancel = async (id) => {
  //   try {
  //     const user = orderRows.find((row) => row._id === id);
  //     if (user.status !== "cancelled") {
  //       await api.post("/order/cancel", { orderId: id });
  //       setOrderRows((prev) =>
  //         prev.map((row) =>
  //           row._id === id ? { ...row, status: "cancelled" } : row
  //         )
  //       );
  //       toast.success("Order cancelled successfully");
  //     } else {
  //       toast.info("Order is already cancelled");
  //     }
  //   } catch {
  //     toast.error("Failed to update order status");
  //   }
  // };

  const updateStatus = async (id, newStatus) => {
    try {
      const order = orderRows.find((row) => row._id === id);
      if (order && order.status === newStatus) {
        toast.info(`Order status already ${newStatus}`);
        return;
      }
      await api.put("/order/update/status", { orderId: id, status: newStatus });
      setOrderRows((prev) =>
        prev.map((row) =>
          row._id === id ? { ...row, status: newStatus } : row
        )
      );
      toast.success(`Order status updated to ${newStatus}`);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  const columns = [
    {
      field: "user",
      headerName: "Customer",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "items",
      headerName: "items",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const items = params.value;
        if (Array.isArray(items) && items.length > 0) {
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
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => `${params.value}₪`,
    },
    {
      field: "status",
      headerName: "Status",
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
      headerName: "Order Date",
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
      width: 250,
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
            sx={{ color: "#388e3c", borderColor: "#388e3c" }}
            onClick={(e) => {
              setSelectedOrderId(params.row._id);
              setMenuAnchorEl(e.currentTarget);
            }}
          >
            Update
          </Button>
          {/* <Button
            variant="outlined"
            size="small"
            sx={{ color: "#d32f2f", borderColor: "#d32f2f" }}
            onClick={() => {
              handleCancel(params.row._id);
            }}
          >
            Cancel
          </Button> */}
        </Box>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ width: "76%", mx: "auto", mt: 9, mb: 9 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Manage Orders
          </Typography>
          <DataGrid
            rows={orderRows}
            // @ts-ignore
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            rowsPerPageOptions={[5]}
            autoHeight
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
          {/* Status Update Menu */}
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={() => setMenuAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                updateStatus(selectedOrderId, "accepted");
                setMenuAnchorEl(null);
              }}
            >
              Accepted
            </MenuItem>
            <MenuItem
              onClick={() => {
                updateStatus(selectedOrderId, "pending");
                setMenuAnchorEl(null);
              }}
            >
              Pending
            </MenuItem>
            <MenuItem
              onClick={() => {
                updateStatus(selectedOrderId, "cancelled");
                setMenuAnchorEl(null);
              }}
            >
              Cancelled
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}
