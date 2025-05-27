import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Hidden } from "@mui/material";
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
  document.title = "Manage collections";
  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/collections/${id}`);
      setRows((prev) => prev.filter((row) => row._id !== id));
      toast.success("Collection deleted successfully");
    } catch {
      toast.error("Failed to delete collection");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = (await api.get("/collections?page=1&limit=5")).data;
        const mappedRows = responseData.collections.map((item) => ({
          _id: item._id,
          name: item.name,
          image: typeof item.image === "string" ? item.image : item.image?.secure_url || "",
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

  
  // useEffect(() => {
  //   const handleKeyDown = async (event) => {
  //     const responseData =(await api.get("/collections/67c8d85904d8b3a3d68a2349")).data;
  //     if (event.key === "Delete") {
  //       // const idsToDelete = responseData.map((id) => id);
  //       setRows((prev) => prev.filter((row) => !selectionModel.includes(row._id)));
  //       toast.success("Selected cakes deleted successfully");
  //       setSelectionModel([]);
  //     }
  //   };
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [selectionModel]);

  const columns = [
  
    {
      field: "image",
      headerName: "Image",
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        console.log(params);
        return(<img
          src={params.row.image}
          style={{
            width: 100,
            height: 100,
            marginTop: "2px",
            marginBottom: "2px",
            borderRadius: "5%",
            objectFit: "cover",
          }}
        />)
        
        },
    },
    {
      field: "name",
      headerName: "Name",
      editable: true,
      flex: 0.2, 
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex",flexDirection: "column", gap: 1, alignItems: "center", justifyContent: "center", height: "100%" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/cakeinformation");
            }}
            sx={{
              width: "70%",
              textTransform: "none",
            }}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row._id)}
            sx={{
              width: "70%",
              textTransform: "none",
            }}
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
        <Box sx={{maxWidth:{xs:"700px",md:"600px"}, mx: "auto", mt: 7, mb: 7 }}>
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
            getRowId={row => row._id} // Only show rows you want
            // @ts-ignore
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
      }
    </>
  );
}
