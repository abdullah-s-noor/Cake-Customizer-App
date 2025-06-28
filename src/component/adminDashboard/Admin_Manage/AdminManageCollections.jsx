import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loaders/Loader";
import { toast } from "react-toastify";
import { api } from "../../../api/api";
import Theme from "../../../../src/theme.js";
import AddNewCollection from "../../userDashboard/addNewTopping/AddNewCollection";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
export default function AdminManageCakes() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddCollection, setOpenAddCollection] = useState(false);
  const navigate = useNavigate();
  document.title = "Manage collections";

  const handleDisactive = async (params) => {
    console.log(params);
    try {
      const newStatus = (params.status === 'active' ? 'inactive' : 'active')

      await api.put(`/collections/${params._id}`, { status: newStatus });
      setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === params._id ? { ...row, status: newStatus } : row
        )
      );



      toast.success("Collection edited successfully");
    } catch {
      toast.error("Failed to update collection");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = (await api.get("/collections?page=1&limit=5")).data;
        const mappedRows = responseData.collections.map((item) => ({
          _id: item._id,
          name: item.name,
          status: item.status,
          image:
            typeof item.image === "string"
              ? item.image
              : item.image?.secure_url || "",
        }));
        console.log(mappedRows)
        setRows(mappedRows);
      } catch {
        toast.error("An error occurred during fetching collections");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 0.15,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt={params.row.name}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => handleDisactive(params.row)}
            sx={{
              width: "70%",
              textTransform: "none",
              borderColor: params.row.status === 'inactive'
                ? Theme.palette.success.main
                : Theme.palette.error.main,
              color: params.row.status === 'inactive'
                ? Theme.palette.success.main
                : Theme.palette.error.main,
              fontWeight: 'bold',
              letterSpacing: 1,
              "&:hover": {
                borderColor: params.row.status === 'inactive'
                  ? Theme.palette.success.dark
                  : Theme.palette.error.dark,
                color: params.row.status === 'inactive'
                  ? Theme.palette.success.dark
                  : Theme.palette.error.dark,
                backgroundColor: "#f9f9f9",
              },
            }}
          >
            {params.row.status === 'active' ? 'Inactive' : 'Activate'}
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
        <Box sx={{ maxWidth: { xs: "700px", md: "600px" }, mx: "auto", mt: 7, mb: 7 }}>
          {/* Header and Button */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" sx={{ color: Theme.palette.primary.main }}>
              Admin - Manage collection
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: Theme.palette.primary.main,
              }}
              onClick={() => setOpenAddCollection(true)}
            >
              Add Collection
            </Button>
          </Box>

          {/* Add Collection Modal */}
          <AddNewCollection
            open={openAddCollection}
            onClose={() => setOpenAddCollection(false)}
            onSuccess={(newCollection) => {
              setRows((prevRows) => [
                ...prevRows,
                {
                  _id: newCollection._id,
                  name: newCollection.name,
                  image:
                    typeof newCollection.image === "string"
                      ? newCollection.image
                      : newCollection.image?.secure_url || "",
                },
              ]);
            }}
          />

          {/* Data Grid */}
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
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
                backgroundColor: Theme.palette.primary.main,
                color: "white",
              },
            }}
          />
        </Box>
      )}
    </>
  );
}
