import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, } from '@mui/material';

const ConfirmDialog = ({
    open,
    title = "Confirm Action",
    description = "This action cannot be undone.",
    onClose,
    onConfirm,
}) => {
    return (
        <Dialog open={open} onClose={onClose} sx={{
            '& .MuiDialog-paper': {
                borderRadius: 4,
                padding: 2,
                backgroundColor: '#fff',
                minWidth: 300,
                minHeight:200
            },
        }}>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: 20, textAlign:"center"}}>{title}</DialogTitle>
            <DialogContent sx={{ fontSize: 16}}>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-evenly', gap: 1  }}>
                <Button onClick={onClose} variant="outlined" color="inherit" sx={{padding:1}}> Cancel </Button>
                <Button onClick={onConfirm} variant="contained" color="success" sx={{padding:1}}> Confirm </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
