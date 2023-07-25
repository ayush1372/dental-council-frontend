import { useState } from 'react';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { doctorTabs } from '../../helpers/components/sidebar-drawer-list-item';
import { getPersonalDetailsData } from '../../store/actions/doctor-user-profile-actions';
import { changeUserActiveTab } from '../../store/reducers/common-reducers';
import { Button } from '../../ui/core';

export default function SuccessPopup({ fetchDoctorUserPersonalDetails, reactivate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  const logInDoctorStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.blacklisted
  );
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  const handleClose = () => {
    setOpen(false);
    fetchDoctorUserPersonalDetails && fetchDoctorUserPersonalDetails();

    if (reactivate) {
      dispatch(changeUserActiveTab(doctorTabs[1].tabName));
      if (personalDetails?.hp_profile_id !== undefined)
        dispatch(getPersonalDetailsData(personalDetails?.hp_profile_id));
    }
    navigate('/profile');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{ backgroundColor: 'white.main', borderRadius: '10px', height: '430px', p: '30px' }}
      >
        <Box mb={1} display="flex" justifyContent="center">
          <TaskAltOutlinedIcon
            sx={{
              color: 'success.dark',
              width: '80px',
              height: '80px',
            }}
          />
        </Box>

        <Box>
          <Typography
            data-testid="popup-input-success-text"
            variant="h2"
            color="success.dark"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            SUCCESS
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            textAlign="center"
            mt={4}
            variant="body1"
            data-testid="popup-input-text"
          >
            {logInDoctorStatus || personalDetails?.hp_profile_status_id === 6
              ? `Your profile has been re-activated. You can perform action on your profile now.`
              : `Your username has been successfully created. A link to create your password has been sent to the registered mobile number.`}
          </Typography>
          <Button
            sx={{ width: '408px', mt: 8 }}
            variant="contained"
            color="warning"
            onClick={handleClose}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
