import { useEffect, useState } from 'react';

import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { userVerifyEmail } from '../../store/actions/doctor-user-profile-actions';
// import successToast from '../../ui/core/toaster';
const UserVerifyUser = () => {
  const [emailVerify, setEmailVerify] = useState(false);
  const [emailLinkError, setEmailLinkError] = useState(false);
  const [emailLinkErrorText, setEmailLinkErrorText] = useState();
  // const handleClose = () => setOpen(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    // let userVerifyEmailBody = {
    //   token: window.location.href.substring(window.location.href.indexOf('email/') + 6),
    // };
    let userVerifyEmailBody = {
      token: params?.id,
    };
    // try {
    dispatch(userVerifyEmail(userVerifyEmailBody))
      .then((response) => {
        if (response?.data?.message === 'Success') {
          setEmailVerify(true);
        } else {
          setEmailLinkErrorText(response?.data?.message);
          setEmailLinkError(true);
        }
      })
      .catch((error) => {
        setEmailLinkErrorText(error?.data?.response?.data?.message);
        setEmailLinkError(true);
      });
  }, [params?.id]);
  return emailVerify ? (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: theme.palette.grey.main,
        borderRadius: '10px',
        height: '300px',
        p: '30px',
        margin: '15px auto',
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
          Your email has been successfully verified
        </Typography>
      </Box>
    </Container>
  ) : emailLinkError ? (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: theme.palette.grey.main,
        borderRadius: '10px',
        height: '300px',
        p: '30px',
        margin: '15px auto',
      }}
    >
      <Box mb={1} display="flex" justifyContent="center">
        <ErrorOutlineOutlinedIcon
          sx={{
            color: theme.palette.error.main,
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
          Error
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
          {emailLinkErrorText}
        </Typography>
      </Box>
    </Container>
  ) : (
    ''
  );
};
export default UserVerifyUser;
