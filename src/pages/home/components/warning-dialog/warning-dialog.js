import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from 'react-router-dom';

const WarningDialog = () => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    const handleVisit = () => {
        setOpen(false);
    };


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Sandbox Environment"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This is a testing portal. If your are a healthcare professional kindly register yourself on
                        <br />
                        https://ndr.abdm.gov.in/
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <NavLink to={'https://ndr.abdm.gov.in'}>
                        <Button onClick={handleVisit} autoFocus>
                            Visit NDR
                        </Button>
                    </NavLink>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default WarningDialog


