import * as React from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: 1,
    customer: "Mohammed Jarrad",
    date: "2024-05-01",
    amount: 120,
    status: "Pending",
  },
  {
    id: 2,
    customer: "Sara Ahmed",
    date: "2024-05-03",
    amount: 200,
    status: "Delivered",
  },
  {
    id: 3,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
  {
    id: 4,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
  {
    id: 5,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
  {
    id: 6,
    customer: "Mohammed Jarrad",
    date: "2024-05-01",
    amount: 120,
    status: "Pending",
  },
  {
    id: 7,
    customer: "Sara Ahmed",
    date: "2024-05-03",
    amount: 200,
    status: "Delivered",
  },
  {
    id: 8,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
  {
    id: 9,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
  {
    id: 10,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
  {
    id: 11,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
  {
    id: 12,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
  {
    id: 13,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: 80,
    status: "Cancelled",
  },
];
export default function ManageOrders() {
  document.title = "Manage Orders";
  const navigate = useNavigate();
  const [orderRows, setOrderRows] = React.useState(orders);
  const [selectionModel, setSelectionModel] = React.useState([]);
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

    return <Chip label={label} color={color} size="small" />;
  };
  const handleDelete = (id) => {
    const updatedRows = orderRows.filter((row) => row.id !== id);
    setOrderRows(updatedRows);
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
      field: "customer",
      headerName: "Customer",
      editable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      editable: true,
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
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
      field: "actions",
      headerName: "Actions",
      width: 160,
      align: "center",
      headerAlign: "center",
      editable: true,
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
              handleDelete(params.row.id);
            }}
          >
            DELETE
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "60%", mx: "auto", mt: 9, mb: 9 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Manage Orders
      </Typography>
      <DataGrid
        rows={orderRows}
        columns={columns}
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
  );
}
