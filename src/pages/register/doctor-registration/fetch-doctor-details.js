import { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Container, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSpeechSynthesis } from 'react-speech-kit';
import { ToastContainer } from 'react-toastify';

import { consentDescription } from '../../../constants/common-data';
import { validateAadharNumber } from '../../../constants/common-data';
import { dateFormat, encryptData } from '../../../helpers/functions/common-functions';
import KycErrorPopup from '../../../shared/common-modals/kyc-error-popup';
import SuccessModalPopup from '../../../shared/common-modals/success-modal-popup';
import OtpForm from '../../../shared/otp-form/otp-component';
import {
  checkHpidExists,
  checkKycDetails,
  generateMobileOtp,
  getHprIdSuggestions,
  getSessionAccessToken,
  verifyHealthProfessional,
  verifyMobileOtp,
} from '../../../store/actions/doctor-registration-actions';
import {
  getDemographicAuthMobile,
  sendAaadharOtp,
  validateOtpAadhaar,
} from '../../../store/actions/user-aadhaar-actions';
import {
  storeMobileDetails,
  UserNotFoundDetails,
} from '../../../store/reducers/doctor-registration-reducer';
import { Button, Checkbox, TextField } from '../../../ui/core';
import AadhaarInputField from '../../../ui/core/aadhaar-input-field/aadhaar-input-field';
import successToast from '../../../ui/core/toaster';
import CreateHprId from './unique-username';

function FetchDoctorDetails({ aadhaarFormValues, imrDataNotFound, setIsNext, onReset }) {
  const [kycError, setKycError] = useState(false);
  const [consentD, setConsentD] = useState(false);
  const [textSpeech, setTextSpeech] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOtpMobile, setShowOtpMobile] = useState(false);
  const [showOtpAadhar, setshowOtpAadhar] = useState(false);
  const [isOtpValidMobile, setisOtpValidMobile] = useState(false);
  const [isOtpValidAadhar, setisOtpValidAadhar] = useState(false);
  const [showCreateHprIdPage, setShowCreateHprIdPage] = useState(false);
  const [existHprId, setExistHprId] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(false);

  const { speak, cancel } = useSpeechSynthesis();

  const dispatch = useDispatch();

  const otptype = useSelector((state) => state?.AadhaarTransactionId?.typeOfOtpDetailsData);

  const registrationNumber = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.registration_number
  );
  const kycstatus = useSelector(
    (state) => state?.doctorRegistration?.getkycDetailsData?.data?.kyc_fuzzy_match_status
  );
  const aadhaarTxnId = useSelector((state) => state?.AadhaarTransactionId?.aadharData?.data?.txnId);
  const mobileNumber = useSelector(
    (state) => state?.AadhaarTransactionId?.aadharData?.data?.mobileNumber
  );
  const mobileTxnId = useSelector(
    (state) => state?.doctorRegistration?.getMobileOtpDetails?.data?.txnId
  );
  const councilName = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.council_name
  );
  const hpName = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.hp_name
  );
  const demographicAuthMobileVerify = useSelector(
    (state) => state?.AadhaarTransactionId?.demographicAuthMobileDetailsData
  );
  const existUSerName = useSelector(
    (state) => state?.doctorRegistration?.hpIdExistsDetailsData?.data?.hprId
  );
  const { councilNames } = useSelector((state) => state.common);

  const getCouncilID = (name) => {
    let councilData = [];
    Array.isArray(councilNames) &&
      councilNames?.map((elementData) => {
        if (elementData.name === name) {
          councilData.push(elementData);
        }
      });
    return councilData[0]?.id;
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      MobileNumber: '',
      AadhaarNumber: '',
      field_1: '',
      field_2: '',
      field_3: '',
      consent: false,
    },
  });
  const handleUserAadhaarNumber = () => {
    let aadharDataFields = getValues().field_1 + getValues().field_2 + getValues().field_3;
    handleVerifyAadhar(aadharDataFields);
  };
  const handleVerifyAadhar = (value) => {
    let reqObj = {
      clientId: process.env.REACT_APP_SESSION_CLIENT_ID,
      clientSecret: process.env.REACT_APP_SESSION_CLIENT_SECRET,
    };
    dispatch(getSessionAccessToken(reqObj)).then(() => {
      const encryptedAadhaar = encryptData(value, process.env.REACT_APP_HPRID_PUBLICKEY);
      dispatch(sendAaadharOtp(encryptedAadhaar)).then(() => {
        setshowOtpAadhar(true);
      });
    });
  };
  const onCancel = () => {
    window.location.reload();
  };

  const handleValidateAadhar = () => {
    handleClear();
    if (otpValue.length === 6) {
      dispatch(
        validateOtpAadhaar({
          txnId: aadhaarTxnId,
          otp: encryptData(otpValue, process.env.REACT_APP_HPRID_PUBLICKEY),
        })
      ).then((response) => {
        setisOtpValidAadhar(true);

        setshowOtpAadhar(false);
        handleClear();
        if (!imrDataNotFound) {
          let councilID = getCouncilID(councilName);
          dispatch(
            checkKycDetails(
              {
                registrationNumber: registrationNumber || '',
                txn_id: response.data.txnId || '',
                mobile_number: response.data.mobileNumber || '',
                photo: response.data.photo || '',
                gender: response.data.gender || '',
                name: response.data.name || '',
                email: response.data.email || '',
                pincode: response.data.pincode || '',
                birth_date: dateFormat(response.data.birthdate) || '',
                care_of: response.data.careOf || '',
                house: response.data.house || '',
                street: response.data.street || '',
                kycLandMark: response.data.landmark || '',
                locality: response.data.locality || '',
                village_town_city: response.data.villageTownCity || '',
                sub_dist: response.data.subDist || '',
                district: response.data.district || '',
                state: response.data.state || '',
                post_office: response.data.postOffice || '',
                address: response.data.address || '',
              },
              councilID
            )
          ).then((response) => {
            if (response.data.kyc_fuzzy_match_status === 'Fail') {
              setKycError(true);
            }
          });
        }
      });
    }
  };

  const handleVerifyMobile = () => {
    dispatch(storeMobileDetails(getValues().MobileNumber));
    dispatch(
      getDemographicAuthMobile({
        txnId: aadhaarTxnId,
        mobileNumber: encryptData(getValues().MobileNumber, process.env.REACT_APP_HPRID_PUBLICKEY),
      })
    ).catch(() => {
      let data = {
        mobile: getValues().MobileNumber,
        txnId: aadhaarTxnId,
      };
      dispatch(generateMobileOtp(data))
        .then(() => {
          setShowOtpMobile(true);
        })
        .catch((error) => {
          successToast('ERROR: ' + error?.data?.message, 'auth-error', 'error', 'top-center');
        });
    });
  };

  useEffect(() => {
    if (demographicAuthMobileVerify?.data?.verified) {
      setisOtpValidMobile(true);
    }
  }, [demographicAuthMobileVerify?.data?.verified]);

  const handleValidateMobile = () => {
    let data = {
      txnId: mobileTxnId,
      otp: encryptData(otpValue, process.env.REACT_APP_HPRID_PUBLICKEY),
    };
    if (otpValue.length === 6) {
      dispatch(verifyMobileOtp(data)).then(() => {
        setisOtpValidMobile(true);
        setShowOtpMobile(false);
        handleClear();
      });
    }
  };

  const otpResend = () => {
    if (otptype === 'aadhaar') {
      let aadharDataFields = getValues().field_1 + getValues().field_2 + getValues().field_3;
      const encryptedAadhaar = encryptData(aadharDataFields, process.env.REACT_APP_HPRID_PUBLICKEY);
      dispatch(sendAaadharOtp(encryptedAadhaar));
    } else {
      let data = {
        mobile: getValues().MobileNumber,
        txnId: aadhaarTxnId,
      };
      dispatch(generateMobileOtp(data));
    }
  };

  const { otpform, otpValue, handleClear, validationOtpInvalid } = OtpForm({
    resendAction: otpResend,
    resendTime: 90,
  });
  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };
  const onSubmit = () => {
    dispatch(verifyHealthProfessional(getValues().MobileNumber)).then((validationResponse) => {
      let responseLength = validationResponse && validationResponse?.data?.length;
      if (imrDataNotFound || kycstatus !== 'Success') {
        dispatch(UserNotFoundDetails({ imrDataNotFound, aadhaarFormValues }));
      }
      dispatch(
        checkHpidExists({
          txnId: aadhaarTxnId,
        })
      ).then((response) => {
        if (response?.data?.hprIdNumber === null || response?.data?.hprIdNumber === '') {
          setShowCreateHprIdPage(true);
          dispatch(
            getHprIdSuggestions({
              txnId: aadhaarTxnId,
            })
          );
          setExistHprId(true);
          setSuccessRegistration(false);
        } else {
          if (response?.data?.hprId && response?.data?.hprIdNumber && responseLength !== 0) {
            setShowSuccess(true);
            setExistHprId(false);
            setSuccessRegistration(true);
          }
          if (response?.data?.hprId && response?.data?.hprIdNumber && responseLength === 0) {
            setShowSuccess(true);
            setExistHprId(true);
            setSuccessRegistration(false);
          }
        }
      });
    });
  };

  //Helper method to voice over the Aadhar Consent Message.
  const textToSpeech = () => {
    if (textSpeech === false) {
      setTextSpeech(true);
      speak({ text: t(consentDescription) });
    }
    if (textSpeech === true) {
      setTextSpeech(false);
      cancel();
    }
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      {kycError && (
        <KycErrorPopup
          open={kycError}
          setOpen={() => setKycError(false)}
          setIsNext={setIsNext}
          onReset={onReset}
          text="Your NMR and Aadhar details doesn't match. Do you want to continue the registration in the NMR?"
        />
      )}

      {showCreateHprIdPage ? (
        <CreateHprId aadhaarFormValues={aadhaarFormValues} imrDataNotFound={imrDataNotFound} />
      ) : (
        <>
          <Container
            sx={{
              width: {
                xs: '100%',
                md: '712px',
              },
              p: {
                xs: 0,
                sm: '12px 16px 12px',
              },
            }}
          >
            <Box p="30px 32px 0px 32px" width={{ xs: '100%', md: '679px' }} sx={{ boxShadow: '2' }}>
              <Box mb={4}>
                <Typography variant="h2" color="textSecondary.main">
                  Registration Details
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body3" component="div" color="grey.label">
                    Name
                  </Typography>
                  <Typography variant="subtitle2" component="div" color="primary">
                    {hpName ? hpName : '-'}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body3"
                    component="div"
                    paddingRight={{ xs: 0, sm: '169px' }}
                    color="grey.label"
                  >
                    Registration Number
                  </Typography>
                  <Typography variant="subtitle2" component="div" color="primary">
                    {aadhaarFormValues ? aadhaarFormValues?.RegistrationNumber : registrationNumber}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ paddingTop: '34px', paddingBottom: '20px' }}>
                <Typography variant="body3" component="div" color="grey.label">
                  Council
                </Typography>
                <Typography variant="subtitle2" component="div" color="primary">
                  {aadhaarFormValues ? aadhaarFormValues?.RegistrationCouncil : councilName}
                </Typography>
              </Box>
              <Divider sx={{ marginBottom: '25px' }} variant="fullWidth" />
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection={{ xs: 'column', sm: 'row' }}
              >
                <Box>
                  <AadhaarInputField
                    defaultValue={getValues().AadhaarNumber}
                    name="AadhaarNumber"
                    {...register('AadhaarNumber', {})}
                    register={register}
                    getValues={getValues}
                    required={true}
                    errors={errors}
                    setValue={setValue}
                    disabled={showOtpAadhar || isOtpValidAadhar}
                  />
                </Box>
                <Box p="35px 32px 0px 32px">
                  {isOtpValidAadhar ? <CheckCircleIcon color="success" /> : ''}
                </Box>
              </Box>
              <Grid
                container
                bgcolor="backgroundColor.light"
                p={2}
                pb={0}
                mt={2}
                mb={2}
                display="flex"
                border="1px solid"
                borderColor="inputBorderColor.main"
                borderRadius="5px"
              >
                <Grid item xs={12} display="flex">
                  <Grid item xs={1} display="flex"></Grid>
                  <Box maxHeight={80} overflow="scroll">
                    <Typography component="div" variant="body7">
                      {consentDescription}
                    </Typography>
                  </Box>
                </Grid>
                <Grid Container xs={12} display="flex" sx={{ alignItems: 'center' }}>
                  <Grid item xs={11} display="flex">
                    <Checkbox
                      label="I Agree"
                      sx={{ width: '18px', height: '18px', marginRight: 1, marginLeft: 2 }}
                      name="consent"
                      defaultChecked={getValues()?.consent}
                      checked={consentD}
                      onChange={(e) => {
                        setConsentD(e.target.checked);
                      }}
                      disabled={isOtpValidAadhar}
                    />
                  </Grid>

                  <Grid item xs={1} display="flex">
                    <Box
                      sx={{
                        display: 'flex !important',
                        'justify-content': 'right !important',
                        cursor: 'pointer',
                      }}
                    >
                      {textSpeech ? (
                        <IconButton onClick={textToSpeech}>
                          <VolumeUpIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={textToSpeech}>
                          <VolumeOffIcon />
                        </IconButton>
                      )}
                    </Box>{' '}
                  </Grid>
                </Grid>
              </Grid>

              <Box
                display="flex"
                justifyContent="flex-end"
                flexDirection={{ xs: 'column', sm: 'row' }}
              >
                {!showOtpAadhar && !isOtpValidAadhar && (
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      width="95px"
                      onClick={handleUserAadhaarNumber}
                      disabled={
                        !validateAadharNumber(
                          getValues().field_1 + getValues().field_2 + getValues().field_3
                        ) ||
                        getValues().field_1 === '' ||
                        getValues().field_2 === '' ||
                        getValues().field_3 === '' ||
                        !consentD
                      }
                    >
                      Verify Aadhaar
                    </Button>
                  </Box>
                )}
              </Box>
              {showOtpAadhar && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: {
                      xs: 'column',
                      sm: 'row',
                    },
                  }}
                >
                  <Box pt={1}>
                    <Typography variant="body1">
                      OTP sent to Aadhaar registered mobile number ending with {mobileNumber}
                    </Typography>
                    {otpform}
                  </Box>
                  <Button
                    sx={{ width: '114px', height: '53px', marginTop: '77px' }}
                    component="span"
                    variant="contained"
                    color="secondary"
                    onClick={handleValidateAadhar}
                    disabled={
                      consentD
                        ? validationOtpInvalid
                          ? validationOtpInvalid
                          : otpValue === ''
                          ? true
                          : false
                        : true
                    }
                  >
                    Validate
                  </Button>
                </Box>
              )}

              <Box sx={{ marginTop: '20px', paddingBottom: '48px', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2">
                  Mobile Number
                  <Typography component="span" sx={{ color: 'error.main' }}>
                    *
                  </Typography>
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    sx={{ width: { xs: '100%', sm: '536px' }, marginRight: '24px' }}
                    required
                    type="text"
                    onInput={(e) => handleInput(e)}
                    name={'MobileNumber'}
                    disabled={isOtpValidMobile}
                    placeholder={t('Enter Mobile Number')}
                    defaultValue={getValues().MobileNumber}
                    error={errors.MobileNumber?.message}
                    {...register('MobileNumber', {
                      required: 'Please enter a valid 10 digit mobile number',
                      pattern: {
                        value: /^\d{10}$/i,
                        message: 'Please enter a valid mobile number',
                      },
                    })}
                  />
                  {isOtpValidMobile ? <CheckCircleIcon color="success" /> : ''}
                  <Box>
                    {!showOtpMobile && !isOtpValidMobile && (
                      <Button
                        variant="contained"
                        color="secondary"
                        width="95px"
                        onClick={handleVerifyMobile}
                        disabled={getValues().MobileNumber.length < 10}
                      >
                        Verify
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
              {showOtpMobile && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: {
                      xs: 'column',
                      sm: 'row',
                    },
                  }}
                >
                  <Box>
                    <Typography variant="body1">
                      Please enter the OTP sent on your Mobile Number.
                    </Typography>
                    {otpform}
                  </Box>

                  <Button
                    sx={{ width: '114px', height: '53px', marginTop: '44px', marginLeft: '65px' }}
                    component="span"
                    variant="contained"
                    color="secondary"
                    onClick={handleValidateMobile}
                  >
                    Validate
                  </Button>
                </Box>
              )}
              <Box sx={{ paddingBottom: '40px', marginTop: { xs: '10px', sm: 0 } }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginRight: '10px', width: '105px', height: '48px' }}
                  onClick={handleSubmit(onSubmit)}
                  disabled={!isOtpValidMobile}
                >
                  Submit
                </Button>
                <Button
                  onClick={onCancel}
                  variant="outlined"
                  sx={{
                    backgroundColor: 'grey.main',
                    color: 'black.textBlack',
                    border: 'none',
                    width: '105px',
                    height: '48px',
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Container>

          {showSuccess && (
            <SuccessModalPopup
              open={showSuccess}
              setOpen={() => setShowSuccess(false)}
              successRegistration={successRegistration}
              existHprId={existHprId}
              isHpIdCreated={existHprId}
              text={
                existHprId
                  ? `Your account with username "${existUSerName
                      .replace('@hpr.abdm', '')
                      ?.replace(
                        '@dr.abdm',
                        ''
                      )}" has been created. Please click on set password to proceed.`
                  : `Your account with username "${existUSerName
                      .replace('@hpr.abdm', '')
                      ?.replace(
                        '@dr.abdm',
                        ''
                      )}" has been created. Please click on login to proceed.`
              }
            />
          )}
        </>
      )}
    </>
  );
}

export default FetchDoctorDetails;
