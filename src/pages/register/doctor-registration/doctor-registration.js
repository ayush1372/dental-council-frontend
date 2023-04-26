import { useEffect, useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { createEditFieldData } from '../../../helpers/functions/common-functions';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
// import DatafoundModalPopup from '../../../shared/common-modals/data-found-modal';
import ErrorModalPopup from '../../../shared/common-modals/error-modal-popup';
import { getRegistrationCouncilList } from '../../../store/actions/common-actions';
import { fetchSmcRegistrationDetails } from '../../../store/actions/doctor-registration-actions';
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
    reset,
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
    // setDatafoundModalPopup(false);
  };
  useEffect(() => {
    dispatch(getRegistrationCouncilList());
    setImrDataNotFound(false);
  }, []);

  const onSubmit = () => {
    let registrationData = {
      smcId: getValues().RegistrationCouncilId,
      registrationNumber: getValues().RegistrationNumber,
    };
    dispatch(fetchSmcRegistrationDetails(registrationData))
      .then(() => {
        setIsNext(true);
        // setDatafoundModalPopup(true);
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

    reset();
  };
  return (
    <>
      <ToastContainer></ToastContainer>

      <Box>
        {isNext === false ? (
          <Box my={9}>
            <Container
              sx={{
                boxShadow: '1',
                pt: 4,
                width: {
                  xs: '100%',
                  md: '679px',
                },
              }}
            >
              <Box>
                <Box pt={2} pb={4}>
                  <Typography variant="h2" color="textSecondary.main">
                    Register Your Profile
                  </Typography>
                  <Typography variant="body3" color="textSecondary.main">
                    Select registration council from dropdown and enter registration number
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
                      placeholder="Select Registered Council"
                      clearErrors={clearErrors}
                      error={errors.RegistrationCouncil?.message}
                      {...register('RegistrationCouncil', {
                        required: 'Registration Council is required',
                      })}
                      onChange={(currentValue) => {
                        setValue('RegistrationCouncilId', currentValue?.id);
                      }}
                    />
                  </Box>
                </Box>
                <Box pb={5}>
                  <Typography variant="body1" color="textSecondary.main">
                    Registration Number
                    <Typography component="span" color="error.main">
                      *
                    </Typography>
                  </Typography>
                  <TextField
                    fullWidth
                    name={'RegistrationNumber'}
                    placeholder={t('Enter Registration Number')}
                    defaultValue={getValues().RegistrationNumber}
                    error={errors.RegistrationNumber?.message}
                    {...register('RegistrationNumber', {
                      required: 'Registration Number is required',
                      pattern: {
                        // value: /^[a-zA-Z0-9@~`!@#$%^&*()_=+\\';:"/?>.<,-]*$/i,
                        value: /^[a-zA-Z0-9-]*$/i,
                        message: 'Enter Valid Registration Number',
                      },
                      minLength: {
                        value: 1,
                        message: 'Enter Valid Registration Number',
                      },
                    })}
                  />
                </Box>
                <Box display="flex" pb={6}>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    sx={{
                      mr: 3,
                      width: '105px',
                      height: '45px',
                      backgroundColor: 'secondary.main',
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={onReset}
                    variant="outlined"
                    sx={{
                      width: '105px',
                      height: '45px',
                      backgroundColor: 'grey.main',
                      color: 'black',
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </Container>
          </Box>
        ) : (
          <FetchDoctorDetails imrDataNotFound={imrDataNotFound} aadhaarFormValues={getValues()} />
        )}
      </Box>
      {rejectPopup && (
        <ErrorModalPopup
          open={setRejectPopup}
          setOpen={() => setRejectPopup(false)}
          imrData={true}
          handleAadhaarPage={handleAadhaarPage}
          isNext={isNext}
          setIsNext={setIsNext}
          text={` Your data is not found in the NMR.
           Do you want to continue the registration in the NMR ? `}
        />
      )}
      {/* {datafoundModalPopup && (
        <DatafoundModalPopup
          open={setRejectPopup}
          setOpen={() => setRejectPopup(false)}
          imrData={true}
          handleAadhaarPage={handleAadhaarPage}
          isNext={isNext}
          setIsNext={setIsNext}
          text={`We found below details as per provided information. If the details are correct, click yes to continue registration. `}
        />
      )} */}
      {accountExists && (
        <ErrorModalPopup
          open={setAccountExists}
          setOpen={() => setAccountExists(false)}
          accountExist={true}
          text={`Your account already exists. Please login with your credentails`}
        />
      )}
    </>
  );
};

export default DoctorRegistrationWelcomePage;