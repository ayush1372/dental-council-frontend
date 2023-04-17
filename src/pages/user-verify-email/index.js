import { useEffect, useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { userVerifyEmail } from '../../store/actions/doctor-user-profile-actions';
import successToast from '../../ui/core/toaster';
const UserVerifyUser = () => {
  const [userVerify, setUserVerify] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    let userVerifyEmailBody = {
      token: window.location.href.substring(window.location.href.indexOf('email/') + 6),
    };
    try {
      dispatch(userVerifyEmail(userVerifyEmailBody)).then(() => {
        setUserVerify(true);
      });
    } catch (allFailMsg) {
      successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
    }
  }, []);
  return (
    <Modal open={userVerify || open} onClose={handleClose} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',
          height: '300px',
          p: '30px',
        }}
      >
        <Box mb={1} display="flex" justifyContent="center">
          <TaskAltOutlinedIcon
            sx={{
              color: theme.palette.success.dark,
              width: '80px',
              height: '80px',
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography
            data-testid="popup-input-success-text"
            variant="h2"
            color="success.dark"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            Email Verified
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            textAlign="center"
            mt={2}
            // ml={10}
            data-testid="popup-input-text"
            component="div"
            flexDirection="column"
          >
            Your Email has been successfully verified
          </Typography>
        </Box>
      </Container>
    </Modal>
  );
};
export default UserVerifyUser;
