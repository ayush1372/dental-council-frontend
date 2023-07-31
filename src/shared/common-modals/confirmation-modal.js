import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function ConfirmationModal({
  showModal,
  handleYes,
  handleNo,
  handleYesText,
  handleNoText,
  text,
}) {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={showModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{text?.heading}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text?.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="grey" variant="contained" onClick={handleNo}>
          {handleNoText}
        </Button>
        <Button color="secondary" variant="contained" ml={2} onClick={handleYes} autoFocus>
          {handleYesText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
