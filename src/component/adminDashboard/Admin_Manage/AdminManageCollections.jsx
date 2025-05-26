import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loaders/Loader";
import {toast} from "react-toastify";
import {api} from "../../../api/api";

export default function AdminManageCakes() {
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    setRows((prev) => prev.filter((row) => row._id !== id));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = (await api.get("/collections?page=1&limit=5")).data;
        const mappedRows = responseData.collections.map((item) => ({
          _id: item._id,
          name: item.name,
          image: typeof item.image === "string" ? item.image : item.image?.url || "",
        }));
        setRows(mappedRows);
      } catch {
        toast.error("An error occured during fetching cakes");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.5,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Image",
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt={params.row.product}
          style={{
            width: 100,
            height: 100,
            marginTop: "2px",
            marginBottom: "2px",
            borderRadius: "5%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      editable: true,
      flex: 1,
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
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      {loading ? <Loader/>:
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
            // @ts-ignore
            columns={columns}
            getRowId={(row) => row._id}   
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
      }
    </>
  );
}
