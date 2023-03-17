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
import { changeUserActiveTab } from '../../store/reducers/common-reducers';
import { setBreadcrumbsActivetab } from '../../store/reducers/common-reducers';
import { Button } from '../../ui/core';

export default function SuccessModalPopup({
  open,
  setOpen,
  text,
  handleClose,
  SuspensionCall,
  isHpIdCreated,
  successRegistration,
  existHprId,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUserType = useSelector((state) => state?.common?.loggedInUserType);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const navigateToLogin = () => {
    navigate('/login-page', { state: { loginFormname: 'Doctor' } });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
      dispatch(getCardCount());
      dispatch(changeUserActiveTab(ActiveTab));
    }
  };
  const navigateLogin = () => {
    navigate('/login-page', { state: { loginFormname: 'Doctor' } });
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
            // ml={10}
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
                ? navigateToLogin
                : successRegistration
                ? navigateLogin
                : handleCloseModal
            }
          >
            {successRegistration ? 'Continue to login' : existHprId ? 'Continue to login' : 'Ok'}
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
