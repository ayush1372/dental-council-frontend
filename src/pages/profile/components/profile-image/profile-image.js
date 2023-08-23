import { useState } from 'react';
import { useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
//import CancelIcon from '@mui/icons-material/Cancel';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import HourglassTopIcon from '@mui/icons-material/HourglassTop';
// import NoAccountsIcon from '@mui/icons-material/NoAccounts';
// import ReportIcon from '@mui/icons-material/Report';
//  import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, FormGroup, Grid, IconButton, Link, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import ReactivationLogo from '../../../../../src/assets/images/reactivate-license-icon.png';
import avtarImg from '../../../../assets/images/user.png';
//import { workflowStatusId } from '../../../../helpers/functions/common-functions';
import ReactivateLicencePopup from '../../../../shared/reactivate-licence-popup/re-activate-licence-popup';
import SuccessPopup from '../../../../shared/reactivate-licence-popup/success-popup';
import {
  getPersonalDetailsData,
  getUserProfileImage,
} from '../../../../store/actions/doctor-user-profile-actions';
import successToast from '../../../../ui/core/toaster';

import styles from './profile-image.module.scss';

export default function ProfileImage(props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { loginData } = useSelector((state) => state?.loginReducer);
  const name = useSelector((state) => state.college.collegeData.data.name);
  const loggedInUserType = useSelector((state) => state.common.loggedInUserType);
  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const profileId = useSelector((state) => state.loginReducer.loginData.data.profile_id);
  // const currentStatus = useSelector(
  //   (state) => state.doctorUserProfileReducer?.personalDetails?.hp_profile_status_id
  // );
  const profileImage = useSelector(
    (state) => state.doctorUserProfileReducer?.personalDetails?.personal_details?.profile_photo
  );
  const updatedProfileImage = useSelector(
    (state) => state.doctorUserProfileReducer?.profileImage?.data?.profile_picture
  );
  const nmrIdData = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.nmr_id
  );

  const userStatus = useSelector(
    (state) => state?.doctorUserProfileReducer?.personalDetails?.hp_profile_status_id
  );

  const doctorEsignStatus = useSelector(
    (state) => state?.loginReducer?.loginData?.data?.esign_status
  );

  const [imageChanged, setImageChanged] = useState(false);
  const [imageTypeError, setImageTypeError] = useState(false);
  const [imageErrorMessage, setImageSizeError] = useState(false);
  const [showReactivateLicense, setShowReactivateLicense] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
        setImageSizeError(true);
        setImageTypeError(false);
      } else {
        requestObjNew.append('file', e.target.files[0]);
        dispatch(getUserProfileImage(profileId, requestObjNew))
          .then((response) => {
            if (response) {
              setImageSizeError(false);
              setImageTypeError(false);
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
      setImageSizeError(false);
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
    dispatch(getPersonalDetailsData(loginData?.data?.profile_id)).then(() => {});
  };

  // const getIconAndText = (currentStatus) => {
  //   switch (currentStatus) {
  //     case 1:
  //       return {
  //         icon: <HourglassTopIcon sx={{ color: 'primary.main' }} />,
  //         text: workflowStatusId(1),
  //       };
  //     case 2:
  //       return { icon: <VerifiedIcon sx={{ color: 'success.main' }} />, text: workflowStatusId(2) };
  //     case 3:
  //       return {
  //         icon: <ReportIcon sx={{ color: 'secondary.lightOrange' }} />,
  //         text: workflowStatusId(3),
  //       };
  //     case 4:
  //       return { icon: <CancelIcon sx={{ color: 'error.main' }} />, text: workflowStatusId(4) };
  //     case 5:
  //       return {
  //         icon: <NoAccountsIcon sx={{ color: 'error.main' }} />,
  //         text: workflowStatusId(5),
  //       };
  //     case 6:
  //       return {
  //         icon: <NoAccountsIcon sx={{ color: 'error.main' }} />,
  //         text: workflowStatusId(6),
  //       };

  //     default:
  //       return { icon: null, text: 'Unknown Status' };
  //   }
  // };

  //const { icon, text } = getIconAndText(currentStatus);

  return (
    <Grid container className={styles.profileImageDetailsContainer} justifyContent="center">
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
      {(imageTypeError === true || imageErrorMessage === true) && (
        <Box mt={2}>
          <Typography variant="body2" color="error.main">
            {imageTypeError === true && imageErrorMessage === false
              ? 'JPG/JPEG/PNG file format allowed.'
              : imageTypeError === false && imageErrorMessage === true
              ? 'File size should be less than 5MB.'
              : ''}
          </Typography>
        </Box>
      )}
      <Grid
        textAlign="center"
        container
        xs={12}
        mt={imageTypeError === true || imageErrorMessage === true ? 1 : 4}
        justifyContent="center"
        flexWrap="nowrap"
      >
        <Grid item>
          <Typography
            component="span"
            variant="subtitle2"
            whiteSpace="initial"
            display="flex"
            color={'textPrimary.main'}
          >
            {props.name || name}
          </Typography>
        </Grid>
      </Grid>
      {loggedInUserType === 'Doctor' && (
        <>
          {userStatus && (
            <Grid
              display="flex"
              //borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
              item
            >
              <Typography variant="subtitle2" color="grey.label" sx={{ mr: '5px' }}>
                Status:
              </Typography>
              <Typography
                variant="subtitle2"
                color={
                  userStatus === 1 || userStatus === 7
                    ? 'primary.main'
                    : userStatus === 2
                    ? 'success.main'
                    : userStatus === 3
                    ? 'secondary.main'
                    : userStatus === 4 || userStatus === 5 || userStatus === 6
                    ? 'error.main'
                    : ''
                }
              >
                {userStatus === 1
                  ? 'Pending'
                  : userStatus === 2
                  ? 'Approved'
                  : userStatus === 3
                  ? 'Query Raised'
                  : userStatus === 4
                  ? 'Rejected'
                  : userStatus === 5
                  ? 'Suspended'
                  : userStatus === 6
                  ? 'Blacklisted'
                  : userStatus === 7
                  ? 'Draft'
                  : 'Draft'}
              </Typography>
            </Grid>
          )}
          {nmrIdData && (
            <Grid
              display="flex"
              // borderRight={`1px solid ${theme.palette.inputBorderColor.main}`}
              item
            >
              <Typography variant="subtitle2" color="grey.label" sx={{ mr: '5px' }}>
                NMR ID:
              </Typography>
              <Typography variant="subtitle2" color="textPrimary.main">
                {nmrIdData ? nmrIdData : ''}
              </Typography>{' '}
            </Grid>
          )}
          {(personalDetails?.hp_profile_status_id === 5 ||
            personalDetails?.hp_profile_status_id === 6) && (
            <Grid container mt={1}>
              <Grid item xs={12}>
                <Typography
                  color="suspendAlert.dark"
                  component="div"
                  textAlign="center"
                  display="inline-flex"
                  variant="body2"
                  sx={{ whiteSpace: 'break-spaces' }}
                >
                  {personalDetails?.hp_profile_status_id === 5 &&
                    `Your profile is suspended and you will not be able to perform any action.`}
                  {personalDetails?.hp_profile_status_id === 6 &&
                    `Your profile is blacklisted and you will not be able to perform any action.`}
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
                  Reactivate Licence
                </Link>
              </Grid>
            </Grid>
          )}
          {personalDetails?.esign_status !== 1 &&
            (doctorEsignStatus === 2 ||
              doctorEsignStatus === 3 ||
              doctorEsignStatus === 4 ||
              personalDetails?.esign_status === 2 ||
              personalDetails?.esign_status === 3 ||
              personalDetails?.esign_status === 4) &&
            loginData?.data?.hp_profile_status_id !== 7 && (
              <Grid container mt={1}>
                <Grid item>
                  <Typography
                    color="suspendAlert.dark"
                    component="div"
                    display="inline-flex"
                    variant="body2"
                    sx={{ whiteSpace: 'break-spaces' }}
                  >
                    Please complete E-sign process to perform further actions.
                  </Typography>
                </Grid>
              </Grid>
            )}
        </>
      )}
      {showReactivateLicense && (
        <ReactivateLicencePopup
          renderSuccess={renderSuccess}
          closeReactivateLicense={closeReactivateLicense}
        />
      )}{' '}
      {showSuccessPopup && (
        <SuccessPopup
          fetchDoctorUserPersonalDetails={fetchDoctorUserPersonalDetails}
          reactivate={true}
        />
      )}
    </Grid>
  );
}
