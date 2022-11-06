import './modal-otp.scss';

import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';

import OtpForm from '../../../../../src/shared/otp-form/otp-component';
import OTPPOPUP from '../../../../assets/images/otp-popup.png';
import { Button } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';

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

export function ModalOTP() {
  const [open, setOpen] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const otpResend = () => {
    successToast('OTP Resent Successfully', 'otp-resent', 'success', 'top-center');
  };

  const { otpform, getOtpValidation } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    if (getOtpValidation()) {
      setOpen(false);
      setOtpVerified(true);
    }
  };

  return {
    otpPopup: (
      <Box>
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
          <img className={'OTPImage'} src={OTPPOPUP} alt="OTP" />
          <CustomDialogTitle id="customized-dialog-title" textAlign="center" onClose={handleClose}>
            {'OTP Authentication'}
          </CustomDialogTitle>
          <DialogContent>
            <DialogContentText textAlign="center" id="alert-dialog-description">
              We have just sent an OTP on given <br />
              email address.
            </DialogContentText>
          </DialogContent>
          <Typography variant="body1" color="grey.context">
            Verification Code
          </Typography>
          {otpform}
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleConfirm}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    ),
    handleClickOpen: handleClickOpen,
    isOtpVerified: otpVerified,
  };
}
export default ModalOTP;
