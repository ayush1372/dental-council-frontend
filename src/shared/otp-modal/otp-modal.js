import './otp-modal.scss';

import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import OtpIcon from '../../assets/images/otp-popup.png';
import { Button } from '../../ui/core';
import successToast from '../../ui/core/toaster';
import OtpForm from '../otp-form/otp-component';

function CustomDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export function ModalOTP({
  afterConfirm = undefined,
  headerText = 'We have sent the OTP on Your Mobile device.',
}) {
  const [open, setOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
  };

  const { otpform, getOtpValidation, handleClear } = OtpForm({
    resendAction: otpResend,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleClear();
  };

  const handleConfirm = () => {
    if (getOtpValidation()) {
      setOpen(false);
      setOtpVerified(true);
      handleClear();
      afterConfirm();
    }
  };

  return {
    otpPopup: (
      <Box>
        <ToastContainer></ToastContainer>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '.MuiPaper-root': {
              padding: '40px',
            },
          }}
        >
          <img className={'OTPImage'} src={OtpIcon} alt="OTP" />
          <CustomDialogTitle id="customized-dialog-title" textAlign="center" onClose={handleClose}>
            {'OTP Authentication'}
          </CustomDialogTitle>
          <DialogContent>
            <DialogContentText textAlign="center" id="alert-dialog-description">
              {headerText}
            </DialogContentText>
          </DialogContent>
          <Typography variant="body1" color="grey.context">
            Verification Code
          </Typography>
          {otpform}
          <Button
            sx={{ marginTop: '16px' }}
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleConfirm}
            autoFocus
          >
            Confirm
          </Button>
        </Dialog>
      </Box>
    ),
    handleClickOpen: handleClickOpen,
    otpVerified,
  };
}
export default ModalOTP;
