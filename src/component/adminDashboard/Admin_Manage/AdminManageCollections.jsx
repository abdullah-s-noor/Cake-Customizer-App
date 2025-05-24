import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../public/image/1.jpg";

// 🔹 Fake cake data
const initialCakes = [
  {
    id: 1,
    product: "Chocolate Dream",
    image: Logo,
    collection: "Birthday",
    status: "Available",
  },
  {
    id: 2,
    product: "Vanilla Delight",
    image: Logo,
    collection: "Wedding",
    status: "Available",
  },
  {
    id: 3,
    product: "Strawberry Swirl",
    image: Logo,
    collection: "Kids",
    status: "Available",
  },
  {
    id: 4,
    product: "Strawberry Swirl",
    image: Logo,
    collection: "Kids",
    status: "unAvailable",
  },
  {
    id: 5,
    product: "Strawberry Swirl",
    image: Logo,
    collection: "Kids",
    status: "Available",
  },
  {
    id: 6,
    product: "Strawberry Swirl",
    image: Logo,
    collection: "Kids",
    status: "unAvailable",
  },
];

export default function AdminManageCakes() {
  const [rows, setRows] = React.useState(initialCakes);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Image",
      flex:0.8,
      align:"center",
      headerAlign:"center",
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt={params.row.product}
          style={{
            width: 100,
            height: 100,
            marginTop:"2px",
            marginBottom:"2px",
            borderRadius: "5%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "product",
      headerName: "Product",
      editable: true,
      flex: 1,
      align:"center",
      headerAlign:"center",
    },
    
    {
      field: "collection",
      headerName: "Collection",
      flex: 0.7,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/cakeinformation");
            }}
            sx={{ mr: 1 }}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 500, width: "65%", mx: "auto", mt: 7, mb: 7 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" color="#42a5f5">
          Admin - Manage Cakes
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#42a5f5",
          }}
          onClick={() => {
            navigate("/addnewcake");
          }}
        >
          Add New Cake
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        selection
        model={selectionModel}
        onSelectionModelChange={(newSelection) =>
          setSelectionModel(newSelection)
        }
        disableRowSelectionOnClick
        autoHeight
        pageSizeOptions={[3]}
        rowHeight={100}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 3 },
          },
        }}
        sx={{
          "& .MuiDataGrid-cell, .MuiDataGrid-columnHeader": {
            textAlign: "center",
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#42a5f5",
            color: "white",
          },
        }}
      />
    </Box>
  );
}
