import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { api } from "../../../api/api";
import Loader from "../../Loaders/Loader";
import { toast } from "react-toastify";
import Theme from "../../../../src/theme.js";

export default function Topping() {
  const columns = [
    {
      field: "name",
      headerName: "Topping Name",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const name = params.value;
        const underscoreIndex = name.indexOf("_");
        return (
          <span>
            {underscoreIndex !== -1 ? name.slice(underscoreIndex + 1) : name}
          </span>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 148,
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
              cursor: "pointer",
              "&:hover": {
                backgroundColor: Theme.palette.secondary.main,
              },
            }}
            onClick={() => handleStatus(params.row._id, params.row.status)}
          >
            change status
          </Button>
        </Box>
      ),
    },
  ];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSlicedName = (name) => {
    const underscoreIndex = name.indexOf("_");
    return underscoreIndex !== -1 ? name.slice(underscoreIndex + 1) : name;
  };

  const uniqueRows = [];
  const seen = new Set();
  for (const row of rows) {
    const sliced = getSlicedName(row.name);
    if (!seen.has(sliced)) {
      seen.add(sliced);
      uniqueRows.push(row);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = (await api.get("/custom/topping")).data;
        setRows(responseData.items);
      } catch {
        toast.error("An error occurred during fetching toppings");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await api.patch(`/custom/topping/${id}/toggle-status`, { status: newStatus });
      setRows((prev) =>
        prev.map((row) =>
          row._id === id ? { ...row, status: newStatus } : row
        )
      );
      toast.success(`Topping ${newStatus === "active" ? "activated" : "inactivated"} successfully`);
    } catch {
      toast.error("Failed to update topping or related cakes");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            height: 500,
            width: 500,
            mt: 7,
            justifyContent: "center",
            mx: "auto",
          }}
        >
          <DataGrid
            rows={uniqueRows}
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
      )}
    </>
  );
}
