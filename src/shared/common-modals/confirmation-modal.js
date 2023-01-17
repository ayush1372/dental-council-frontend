import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export default function ConfirmationModal({ showModal, handleLogout }) {
  const handleStay = () => {};

  return (
    <Dialog
      open={showModal}
      //onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">
          
      </DialogTitle> */}
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You Have Been Idle! You will get timed out.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleStay}>Stay</Button>
        <Button onClick={handleLogout} autoFocus>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
