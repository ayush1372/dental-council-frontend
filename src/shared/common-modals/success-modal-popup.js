import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  colgTabs,
  doctorTabs,
  nmcTabs,
  smcTabs,
} from '../../helpers/components/sidebar-drawer-list-item';
import { getCardCount } from '../../store/actions/dashboard-actions';
import { getPersonalDetailsData } from '../../store/actions/doctor-user-profile-actions';
import {
  changeUserActiveTab,
  logout,
  resetCommonReducer,
} from '../../store/reducers/common-reducers';
import { setBreadcrumbsActivetab } from '../../store/reducers/common-reducers';
import { loginActiveState } from '../../store/reducers/login-reducer';
import { Button } from '../../ui/core';
import successToast from '../../ui/core/toaster';

export default function SuccessModalPopup({
  open,
  setOpen,
  text,
  loginName,
  workDetails,
  handleClose,
  SuspensionCall,
  isHpIdCreated,
  successRegistration,
  existHprId,
  fromCollegeRegistration,
  changeUserData,
  navigateToTrackApplication,
  fetchDoctorUserPersonalDetails,
  setChangeUserData,
  PasswordChange,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);
  const { loginData } = useSelector((state) => state?.loginReducer);

  const handleCloseModal = () => {
    if (workDetails) {
      dispatch(changeUserActiveTab(doctorTabs[1].tabName));
    }
    setOpen(false);
  };
  const navigateToSetPassword = () => {
    navigate('/reset-password');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const navigateToTrackStatus = () => {
    dispatch(changeUserActiveTab(doctorTabs[1].tabName));
  };

  const handleCloseModalALL = () => {
    setOpen(false);
    handleClose();
    dispatch(setBreadcrumbsActivetab('DASHBOARD'));
    if (SuspensionCall) {
      let ActiveTab;

      switch (loggedInUserType) {
        case 'SMC':
          ActiveTab = smcTabs[0].tabName;
          break;
        case 'Doctor':
          ActiveTab = doctorTabs[1].tabName;
          break;
        case 'NMC':
          ActiveTab = nmcTabs[0].tabName;
          break;
        case 'College':
          ActiveTab = colgTabs[0].tabName;
          break;
        default:
          ActiveTab = '';
          break;
      }
      if (loggedInUserType === 'Doctor' && SuspensionCall !== true) {
        localStorage.clear();
        dispatch(logout());
        dispatch(resetCommonReducer());
        navigate('/');
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        if (loggedInUserType !== 'SMC' && loggedInUserType !== 'NMC') {
          dispatch(getPersonalDetailsData(loginData?.data?.profile_id))
            .then(() => {})
            .catch((allFailMsg) => {
              successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
            });
        }

        dispatch(getCardCount());
        dispatch(changeUserActiveTab(ActiveTab));

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }
  };
  const navigateLogin = () => {
    dispatch(loginActiveState({ activeIndex: 0 }));
    navigate('/login-page', { state: { loginFormname: loginName } });
  };

  const navigateSetPassword = () => {
    setOpen(false);
  };

  const closeSuccessModal = () => {
    setOpen(false);
    setChangeUserData(false);
    fetchDoctorUserPersonalDetails && fetchDoctorUserPersonalDetails();
  };

  const navigateToDashboard = () => {
    let ActiveTab = colgTabs[0].tabName;
    dispatch(changeUserActiveTab(ActiveTab));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',
          p: 3,
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
            SUCCESS!
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            textAlign="center"
            mt={2}
            data-testid="popup-input-text"
            component="div"
            flexDirection="column"
          >
            {text}
          </Typography>
          <Button
            sx={{ mt: 5 }}
            variant="contained"
            color="warning"
            onClick={
              handleClose
                ? handleCloseModalALL
                : isHpIdCreated
                ? navigateToSetPassword
                : successRegistration
                ? navigateLogin
                : fromCollegeRegistration
                ? navigateSetPassword
                : changeUserData
                ? closeSuccessModal
                : navigateToTrackApplication
                ? navigateToTrackStatus
                : PasswordChange
                ? navigateToDashboard
                : handleCloseModal
            }
          >
            {successRegistration
              ? 'Continue to login'
              : existHprId
              ? 'Continue to set your password'
              : changeUserData
              ? 'Okay'
              : 'Ok'}
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
