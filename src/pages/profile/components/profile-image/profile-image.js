import { useState } from 'react';
import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
import CancelIcon from '@mui/icons-material/Cancel';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import ReportIcon from '@mui/icons-material/Report';
import TimerIcon from '@mui/icons-material/Timer';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, FormGroup, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import ReactivationLogo from '../../../../../src/assets/images/reactivate-license-icon.png';
import avtarImg from '../../../../assets/images/user.png';
import { workflowStatusId } from '../../../../helpers/functions/common-functions';
import ReactivateLicencePopup from '../../../../shared/reactivate-licence-popup/re-activate-licence-popup';
import SuccessPopup from '../../../../shared/reactivate-licence-popup/success-popup';
import {
  getPersonalDetailsData,
  getUserProfileImage,
} from '../../../../store/actions/doctor-user-profile-actions';
import successToast from '../../../../ui/core/toaster';

import styles from './profile-image.module.scss';

export default function ProfileImage(props) {
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const currentStatus = useSelector(
    (state) => state.doctorUserProfileReducer?.personalDetails?.hp_profile_status_id
  );

  const profileId = useSelector((state) => state.loginReducer.loginData.data.profile_id);
  const name = useSelector((state) => state.college.collegeData.data.name);
  const profileImage = useSelector(
    (state) => state.doctorUserProfileReducer?.personalDetails?.personal_details?.profile_photo
  );
  const updatedProfileImage = useSelector(
    (state) => state.doctorUserProfileReducer?.profileImage?.data?.profile_picture
  );
  const nmrIdData = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.nmr_id
  );
  const dispatch = useDispatch();
  const [imageChanged, setImageChanged] = useState(false);
  const [imageTypeError, setImageTypeError] = useState(false);
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [showReactivateLicense, setShowReactivateLicense] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const logInDoctorStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.blacklisted
  );
  const doctorEsignStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.esign_status
  );
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { loginData } = useSelector((state) => state?.loginReducer);
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    avtarImage: {
      width: '30px',
      height: '30px',
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));
  const classes = useStyles(theme);
  useEffect(() => {}, [profileImage, imageChanged]);
  const changeImage = (e) => {
    const requestObjNew = new FormData();
    if (
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/jpg' ||
      e.target.files[0].type === 'image/png'
    ) {
      if (e.target.files[0].size > 5000000) {
        setImageErrorMessage('Maximum allowed file size is 5MB');
        setImageTypeError(true);
      } else {
        setImageTypeError(false);
        requestObjNew.append('file', e.target.files[0]);
        dispatch(getUserProfileImage(profileId, requestObjNew))
          .then((response) => {
            if (response) {
              dispatch(getPersonalDetailsData(profileId));
            }
          })
          .catch((errorMsg) => {
            successToast(
              'ERR_INT: ' + errorMsg + imageTypeError + imageErrorMessage,
              'auth-error',
              'error',
              'top-center'
            );
          });
        setImageChanged(true);
      }
    } else {
      setImageErrorMessage('Allowed file types are JPEG/PNG');
      setImageTypeError(true);
    }
  };
  const renderSuccess = () => {
    setShowReactivateLicense(false);
    setShowSuccessPopup(true);
  };
  const closeReactivateLicense = () => {
    setShowReactivateLicense(false);
  };
  const fetchDoctorUserPersonalDetails = () => {
    dispatch(getPersonalDetailsData(loginData?.data?.profile_id))
      .then(() => {})
      .catch((allFailMsg) => {
        successToast('ERR_INT: ' + allFailMsg, 'auth-error', 'error', 'top-center');
      });
  };
  const getIconAndText = (currentStatus) => {
    switch (currentStatus) {
      case 1:
        return { icon: <TimerIcon sx={{ color: 'primary.main' }} />, text: workflowStatusId(1) };
      case 2:
        return { icon: <VerifiedIcon sx={{ color: 'success.main' }} />, text: workflowStatusId(2) };
      case 3:
        return {
          icon: <ReportIcon sx={{ color: 'secondary.lightOrange' }} />,
          text: workflowStatusId(3),
        };
      case 4:
        return { icon: <CancelIcon sx={{ color: 'error.main' }} />, text: workflowStatusId(4) };
      case 5:
        return {
          icon: <NoAccountsIcon sx={{ color: 'error.main' }} />,
          text: workflowStatusId(5),
        };
      case 6:
        return {
          icon: <NoAccountsIcon sx={{ color: 'error.main' }} />,
          text: workflowStatusId(6),
        };
      default:
        return { icon: null, text: 'Unknown Status' };
    }
  };
  const { icon, text } = getIconAndText(currentStatus);

  return (
    <Grid container className={styles.profileImageDetailsContainer} justifyContent="center">
      <ToastContainer></ToastContainer>
      {loggedInUserType === 'Doctor' ? (
        <Grid item xs={12} mt={2} display="flex" justifyContent="center">
          <Box maxWidth="110px" width="100%" position="relative">
            <FormGroup className="update-image"></FormGroup>
            <img
              src={
                profileImage
                  ? imageChanged
                    ? 'data:image/*;base64,' + updatedProfileImage
                    : 'data:image/*;base64,' + profileImage
                  : avtarImg
              }
              className={styles.profileImage}
              alt="avtarImg"
            />
            <FormGroup />
            <Box position="absolute" right="0" bottom="0">
              <input
                type="file"
                id="icon-button-file"
                accept=" image/jpeg, image/jpg, image/png"
                onChange={(event) => changeImage(event)}
                style={{ display: 'none' }}
              />
              <Box className={classes.avtarImage}>
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="Box">
                    <EditOutlinedIcon color="white" fontSize="small" />
                  </IconButton>
                </label>
              </Box>
            </Box>
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
          <Box maxWidth="110px" width="100%" position="relative">
            <img
              alt="avtarImg"
              className={styles.profileImage}
              src={avtarImg}
              data-testid="profileImg"
            />
          </Box>
        </Grid>
      )}
      <Grid textAlign="center" container xs={12} mt={4} justifyContent="center" flexWrap="nowrap">
        <Grid item>
          <Typography component="span" variant="subtitle2" whiteSpace="initial" display="flex">
            {props.name || name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="div" title={text}>
            {icon}
          </Typography>
        </Grid>
      </Grid>
      {loggedInUserType === 'Doctor' && nmrIdData && (
        <Grid display="flex" borderRight={`1px solid ${theme.palette.inputBorderColor.main}`} item>
          <Typography variant="subtitle2" color="grey.label" sx={{ mr: '5px' }}>
            NMR ID :
          </Typography>
          <Typography variant="subtitle2" color="textPrimary.main">
            {nmrIdData ? nmrIdData : ''}
          </Typography>{' '}
        </Grid>
      )}
      {logInDoctorStatus &&
        (personalDetails?.hp_profile_status_id === 5 ||
          personalDetails?.hp_profile_status_id === 6) && (
          <Grid container mt={1}>
            <Grid item xs={12}>
              <Typography
                color="suspendAlert.dark"
                component="div"
                textAlign="center"
                display="inline-flex"
                variant="body2"
              >
                Your profile is set to suspend mode.
                <br />
                You will not be able to perform actions <br />
                on the profile.
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center" mt={1} mr={2}>
              <img
                src={ReactivationLogo}
                alt="Reactivation license logo"
                width="15px"
                height="15px"
              />
              <Link
                sx={{
                  cursor: 'pointer',
                  'pointer-events':
                    (personalDetails?.hp_profile_status_id === 5 ||
                      personalDetails?.hp_profile_status_id === 6) &&
                    personalDetails?.work_flow_status_id === 1
                      ? 'none'
                      : 'unset',
                  opacity:
                    (personalDetails?.hp_profile_status_id === 5 ||
                      personalDetails?.hp_profile_status_id === 6) &&
                    personalDetails?.work_flow_status_id === 1
                      ? 0.5
                      : 'unset',
                }}
                ml={1}
                variant="subtitle2"
                onClick={() => {
                  setShowReactivateLicense(true);
                  setShowSuccessPopup(false);
                }}
              >
                Reactivate License
              </Link>
            </Grid>
          </Grid>
        )}
      {doctorEsignStatus === 2 && (
        <Grid container mt={1}>
          <Grid item>
            <Typography
              color="suspendAlert.dark"
              component="div"
              display="inline-flex"
              variant="body2"
            >
              You have done E-sign with different
              <br /> account. Please verify and re-do the <br />
              E-sign process correctly.
            </Typography>
          </Grid>
        </Grid>
      )}
      {doctorEsignStatus === 3 && (
        <Grid container mt={1}>
          <Grid item>
            <Typography
              color="suspendAlert.dark"
              component="div"
              display="inline-flex"
              variant="body2"
            >
              Your profile has to complete E-sign <br />
              process. You will not be able to perform <br /> actions on the profile untill you{' '}
              <br />
              complete E-sign process.
            </Typography>
          </Grid>
        </Grid>
      )}
      {showReactivateLicense && (
        <ReactivateLicencePopup
          renderSuccess={renderSuccess}
          closeReactivateLicense={closeReactivateLicense}
        />
      )}{' '}
      {showSuccessPopup && (
        <SuccessPopup fetchDoctorUserPersonalDetails={fetchDoctorUserPersonalDetails} />
      )}
    </Grid>
  );
}
