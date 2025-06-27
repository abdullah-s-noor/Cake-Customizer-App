import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';

const ConfirmDialog = ({
    open,
    title = "Confirm Action",
    description = "This action cannot be undone.",
    onClose,
    onConfirm,
    loading = false, // new prop
}) => {
    return (
        <Dialog
            open={open}
            onClose={loading ? null : onClose}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 4,
                    padding: 2,
                    backgroundColor: '#fff',
                    minWidth: 300,
                    minHeight: 200
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: 20, textAlign: "center" }}>
                {title}
            </DialogTitle>

            <DialogContent sx={{ fontSize: 16 }}>
                <Typography>{description}</Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'space-evenly', gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="inherit"
                    sx={{ padding: 1 }}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color="error"
                    sx={{ padding: 1, minWidth: 80 }}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : (
                        'Delete'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
