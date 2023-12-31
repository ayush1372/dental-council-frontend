import { useEffect, useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
import DatafoundModalPopup from '../../../shared/common-modals/data-found-modal';
import ErrorModalPopup from '../../../shared/common-modals/error-modal-popup';
import { getRegistrationCouncilList } from '../../../store/actions/common-actions';
import { fetchSmcRegistrationDetails } from '../../../store/actions/doctor-registration-actions';
import { resetDoctorHPName } from '../../../store/reducers/doctor-registration-reducer';
import { Button, TextField } from '../../../ui/core';
import FetchDoctorDetails from './fetch-doctor-details';
const DoctorRegistrationWelcomePage = () => {
  const [isNext, setIsNext] = useState(false);
  const [imrDataNotFound, setImrDataNotFound] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  // const [datafoundModalPopup, setDatafoundModalPopup] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    // reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: '',
      RegistrationCouncil: '',
      RegistrationCouncilId: '',
      RegistrationNumber: '',
    },
  });

  const { councilNames } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  const handleAadhaarPage = (data) => {
    setImrDataNotFound(data);
    setRejectPopup(false);
    // setDatafoundModalPopup(false);
  };
  useEffect(() => {
    dispatch(getRegistrationCouncilList());
    setImrDataNotFound(false);
  }, []);

  const onSubmit = () => {
    dispatch(resetDoctorHPName());
    let registrationData = {
      smcId: getValues().RegistrationCouncilId,
      registrationNumber: getValues().RegistrationNumber,
    };
    dispatch(fetchSmcRegistrationDetails(registrationData))
      .then((response) => {
        if (response?.data?.already_registered_in_nmr) {
          setAccountExists(true);
        } else {
          setRejectPopup(true);
          // setIsNext(true);
        }
      })
      .catch((err) => {
        if (err?.data?.response?.data?.status === 400 && err?.data?.response?.data?.error) {
          setAccountExists(true);
        } else {
          setRejectPopup(true);
        }
      });
  };
  const onReset = () => {
    setValue('RegistrationCouncilId', '');
    setValue('RegistrationNumber', '');
    setValue('RegistrationCouncil', '');
  };
  return (
    <>
      <Box>
        {isNext === false ? (
          <Box py={4} sx={{ backgroundColor: 'backgroundColor.main' }}>
            <Container
              sx={{
                boxShadow: '1',
                pt: 2,
                width: {
                  xs: '100%',
                  md: '679px',
                },
                backgroundColor: 'white.main',
                borderRadius: '8px',
              }}
            >
              <Box>
                <Box pt={1} pb={1}>
                  <Typography variant="h2" color="textSecondary.main">
                    Register Your Profile
                  </Typography>
                  <Typography variant="body3" color="textSecondary.main">
                    Please choose a registration council from the provided options and enter your
                    registration number.
                  </Typography>
                </Box>

                <Box pb={4}>
                  <Typography variant="body1" color="textSecondary.main">
                    Registered Council
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>
                  <Box>
                    <SearchableDropdown
                      name="RegistrationCouncil"
                      items={createEditFieldData(councilNames)}
                      placeholder="Select registered council"
                      clearErrors={clearErrors}
                      error={errors.RegistrationCouncil?.message}
                      {...register('RegistrationCouncil', {
                        required: 'Please select the registered council',
                      })}
                      onChange={(currentValue) => {
                        setValue('RegistrationCouncilId', currentValue?.id);
                        setValue('RegistrationCouncil', currentValue?.name);
                      }}
                    />
                  </Box>
                </Box>
                <Box pb={4}>
                  <Typography variant="body1" color="textSecondary.main">
                    Registration Number
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    name={'RegistrationNumber'}
                    placeholder={t('Enter registration number')}
                    defaultValue={getValues().RegistrationNumber}
                    error={errors.RegistrationNumber?.message}
                    {...register('RegistrationNumber', {
                      required: 'Please enter the registration number',
                      pattern: {
                        value: /^[A-Za-z0-9_.,?!@#$%^&*():;-]{1,100}$/,
                        message: 'Please enter valid registration number',
                      },
                      minLength: {
                        value: 1,
                        message: 'Please enter the registration number',
                      },
                    })}
                  />
                </Box>
                <Box display="flex" pb={4}>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="secondary"
                    sx={{
                      mr: 2,
                    }}
                  >
                    Submit
                  </Button>
                  <Button onClick={onReset} variant="contained" color="grey">
                    Reset
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        ) : (
          <FetchDoctorDetails
            imrDataNotFound={imrDataNotFound}
            aadhaarFormValues={getValues()}
            setIsNext={setIsNext}
            onReset={onReset}
          />
        )}
      </Box>
      {/* Commneted by, Ashvini For future use */}
      {/* {rejectPopup && (
        <ErrorModalPopup
          open={setRejectPopup}
          setOpen={() => {
            setDatafoundModalPopup(true);
            setRejectPopup(false);
          }}
          imrData={true}
          handleAadhaarPage={handleAadhaarPage}
          onReset={onReset}
          text={` Your data is not found in the DCI.
           Do you want to continue the registration in the DCI ? `}
        />
      )} */}
      {rejectPopup && (
        <DatafoundModalPopup
          open={setRejectPopup}
          setOpen={() => {
            setRejectPopup(true);
          }}
          handleClose={() => {
            setRejectPopup(false);
          }}
          imrData={true}
          handleAadhaarPage={handleAadhaarPage}
          isNext={isNext}
          setIsNext={setIsNext}
          registrationData={{
            smcId: getValues().RegistrationCouncilId,
            registrationNumber: getValues().RegistrationNumber,
          }}
          text={`No data found for the provided details. Do you still want to continue with the registration?`}
        />
      )}
      {accountExists && (
        <ErrorModalPopup
          open={setAccountExists}
          setOpen={() => setAccountExists(false)}
          accountExist={true}
          text={`Your account already exists. Please login with your credentials.`}
          loginFormName="Doctor"
        />
      )}
    </>
  );
};

export default DoctorRegistrationWelcomePage;
