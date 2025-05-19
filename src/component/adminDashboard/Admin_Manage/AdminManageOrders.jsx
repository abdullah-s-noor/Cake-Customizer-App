import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Button,
  TableContainer,
  TablePagination,
} from "@mui/material";

const mockOrders = [
  {
    id: 1,
    customer: "Mohammed Jarrad",
    date: "2024-05-01",
    amount: "₪120",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Sara Ahmed",
    date: "2024-05-03",
    amount: "₪200",
    status: "Delivered",
  },
  {
    id: 3,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: "₪80",
    status: "Cancelled",
  },
  {
    id: 4,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: "₪80",
    status: "Cancelled",
  },
  {
    id: 5,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: "₪80",
    status: "Cancelled",
  },
  {
    id: 6,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: "₪80",
    status: "Cancelled",
  },
  {
    id: 7,
    customer: "Lina Khalid",
    date: "2024-05-05",
    amount: "₪80",
    status: "Cancelled",
  },
];

const statusColor = {
  Pending: "warning",
  Delivered: "success",
  Cancelled: "error",
};

export default function AdminOrders() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(mockOrders);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 5));
    setPage(0);
  };

  const handleView = (orderId) => {
    alert(`Viewing order ${orderId}`);
  };

  const handleCancel = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <Box width="65%" mx="auto" mt={5} mb={5}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Manage Orders
      </Typography>

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#f7f7f7" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage , page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id} >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={statusColor[order.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleView(order.id)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleCancel(order.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5]}
        />
      </Paper>
    </Box>
  );
}
