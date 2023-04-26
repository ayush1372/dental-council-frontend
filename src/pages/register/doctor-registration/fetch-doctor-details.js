import { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

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
function FetchDoctorDetails({ aadhaarFormValues, imrDataNotFound }) {
  const [showCreateHprIdPage, setShowCreateHprIdPage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOtpMobile, setShowOtpMobile] = useState(false);
  const [showOtpAadhar, setshowOtpAadhar] = useState(false);

  const [isOtpValidMobile, setisOtpValidMobile] = useState(false);
  const [isOtpValidAadhar, setisOtpValidAadhar] = useState(false);
  const [kycError, setKycError] = useState(false);
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
  let consentDescription =
    'I hereby state that I have no objection in authenticating myself with Aadhaar-based authentication system and I Consent to providing my Aadhaar Number, Biometric and/or One Time Pin (OTP) data for Aadhaar-based authentication for the purpose of availing of the eSign Services from Desk Nine Private Limited for the execution of Agreement with Company Name. I understand that the Biometrics and/or OTP I provide for authentication shall be used only for authenticating my identity through the Aadhaar Authentication system for that specific transaction and for the purpose of eSigning the Agreement with Company Name and for no other purposes. I understand that Company Name and Desk Nine Private Limited shall ensure security and confidentiality of my personal identity data provided for the purpose of Aadhaar-based authentication.';
  const [showFullDescription, setFullDescription] = useState(false);
  const [consentD, setConsentD] = useState(false);

  const description = showFullDescription ? consentDescription : consentDescription.slice(0, 110);

  const showFullDescriptionHandler = () => {
    setFullDescription(!showFullDescription);
  };

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
      } else {
        if (response?.data?.hprId && response?.data?.hprIdNumber) {
          setShowSuccess(true);
        }
      }
    });
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      {kycError && (
        <KycErrorPopup
          open={kycError}
          setOpen={() => setKycError(false)}
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
                sm: '0 16px',
              },
            }}
          >
            {hpName !== null || undefined ? (
              ''
            ) : (
              <Box sx={{ width: '100%', height: '53px', marginBottom: '30px', marginTop: '32px ' }}>
                <Alert
                  sx={{
                    m: 2,
                    marginLeft: '0px',
                    borderRadius: '5px',
                    width: {
                      xs: '100%',
                      md: '680px',
                    },
                    boxShadow: '1',
                    color: 'inputSuccessTextColor.main',
                    backgroundColor: 'inputSuccessBackgroundColor.main',
                  }}
                >
                  Record fetched successfully. Please verify your details to proceed further.
                </Alert>
              </Box>
            )}

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
                    disabled={showOtpAadhar || isOtpValidAadhar}
                  />
                </Box>

                <Box p="35px 32px 0px 32px">
                  {isOtpValidAadhar ? <CheckCircleIcon color="success" /> : ''}
                </Box>

                {!showOtpAadhar && !isOtpValidAadhar && (
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      width="95px"
                      onClick={handleUserAadhaarNumber}
                    >
                      Verify
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
                      Please enter the OTP sent on your mobile number {mobileNumber} which is
                      registered with Aadhaar.
                    </Typography>
                    {otpform}
                  </Box>
                  <Button
                    sx={{ width: '114px', height: '53px', marginTop: '77px' }}
                    component="span"
                    variant="contained"
                    color="secondary"
                    onClick={handleValidateAadhar}
                    disabled={consentD ? validationOtpInvalid : true}
                  >
                    Validate
                  </Button>
                </Box>
              )}
              <Grid
                container
                bgcolor="backgroundColor.light"
                p={2}
                mt={2}
                mb={2}
                display="flex"
                border="1px solid"
                borderColor="inputBorderColor.main"
                borderRadius="5px"
              >
                <Grid item xs={12} display="flex">
                  <Grid item xs={1} display="flex">
                    <Checkbox
                      sx={{ width: '18px', height: '18px', marginLeft: 1 }}
                      name="consent"
                      defaultChecked={getValues()?.consent}
                      {...register('consent', {
                        required: 'Consent is Required',
                      })}
                      onChange={(e) => {
                        setConsentD(e.target.checked);
                      }}
                      error={errors.consent?.message}
                    />
                  </Grid>
                  <Grid item xs={11} display="flex" pl={1}>
                    <Typography component="div" variant="body7">
                      {description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} display="flex">
                  <Grid item xs={10} display="flex">
                    {' '}
                  </Grid>
                  <Grid item xs={2} display="flex">
                    <Box
                      sx={{
                        display: 'flex !important',
                        'justify-content': 'right !important',
                        cursor: 'pointer',
                      }}
                    >
                      <Link onClick={showFullDescriptionHandler}>
                        Read {showFullDescription ? 'Less' : 'More'}
                      </Link>
                    </Box>{' '}
                  </Grid>
                </Grid>
              </Grid>
              <Divider sx={{ mb: 4, mt: 4 }} variant="fullWidth" />
              <Box sx={{ marginTop: '20px', paddingBottom: '48px' }}>
                <Typography variant="subtitle2">
                  Mobile Number
                  <Typography component="span" sx={{ color: 'error.main' }}>
                    *
                  </Typography>
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <TextField
                    sx={{ width: { xs: '100%', sm: '536px' }, marginRight: '16px' }}
                    required
                    type="text"
                    onInput={(e) => handleInput(e)}
                    name={'MobileNumber'}
                    disabled={isOtpValidMobile}
                    placeholder={t('Enter mobile number')}
                    defaultValue={getValues().MobileNumber}
                    error={errors.MobileNumber?.message}
                    {...register('MobileNumber', {
                      required: 'Mobile Number is required',
                      pattern: {
                        value: /^\d{10}$/i,
                        message: 'Enter Valid Mobile Number',
                      },
                    })}
                  />
                  <IconButton aria-label="toggle password visibility" edge="end">
                    {isOtpValidMobile ? <CheckCircleIcon color="success" /> : ''}
                  </IconButton>
                  <Box>
                    {!showOtpMobile && !isOtpValidMobile && (
                      <Button
                        variant="contained"
                        color="secondary"
                        width="95px"
                        onClick={handleVerifyMobile}
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
              existHprId={true}
              text={`Your username ${existUSerName.replace(
                '@hpr.abdm',
                ''
              )} has been already created. Please proceed to set your password`}
              isHpIdCreated={true}
            />
          )}
        </>
      )}
    </>
  );
}

export default FetchDoctorDetails;