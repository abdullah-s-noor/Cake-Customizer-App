import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import Theme from "../../../src/theme";

const ConfirmDialog = ({
  open,
  title = "Confirm Action",
  description = "This action cannot be undone.",
  onClose,
  onConfirm,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          padding: 2,
          backgroundColor: "#fff",
          minWidth: 300,
          minHeight: 200,
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ fontSize: 16 }}>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-evenly", gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ padding: 1,
            background:Theme.palette.primary.main,
            color:"white",
           }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            padding:1,
            background:Theme.palette.primary.main,
            color:"white",
          }}
        >
          {loading ? <CircularProgress size={20} sx={{ color: Theme.palette.primary.main }} /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;