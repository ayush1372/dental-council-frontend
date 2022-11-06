import { forwardRef, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBox({ isOpen, title, content, buttonName }) {
  const [isOpenDialog, setOpenDialog] = useState(isOpen);
  const handleClose = () => {
    return null;
  };

  const redirectLogin = () => setOpenDialog(!isOpenDialog);

  return (
    <div>
      <Dialog
        open={isOpenDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{ fontWeight: 600 }}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#000', color: 'white', fontWeight: '600' }}
            onClick={redirectLogin}
          >
            {buttonName}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
