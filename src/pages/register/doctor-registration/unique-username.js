import { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Container, Link, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UniqueUserNameForDoctor } from '../../../constants/common-data';
import { createUniqueHprId } from '../../../store/actions/doctor-registration-actions';
import { Button } from '../../../ui/core';

const UniqueUserNameForDoctorRegistration = () => {
  const [disable, setDisbale] = useState(false);

  const dispatch = useDispatch();
  const aadhaarTxnId = useSelector((state) => state?.AadhaarTransactionId?.aadharData?.data?.txnId);
  const firstSuggestion = useSelector(
    (state) => state?.doctorRegistration?.hprIdSuggestionsDetailsData?.data[0]
  );
  const secondSuggestion = useSelector(
    (state) => state?.doctorRegistration?.hprIdSuggestionsDetailsData?.data[1]
  );
  const thirdSuggestion = useSelector(
    (state) => state?.doctorRegistration?.hprIdSuggestionsDetailsData?.data[2]
  );
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      UniqueUserNameForDoctor: '',
    },
  });

  const onSubmit = () => {
    let data = {
      email: null,
      txnId: aadhaarTxnId,
      hprId: `${getValues().UniqueUserNameForDoctor}@hpr.abdm`,
    };
    dispatch(createUniqueHprId(data)).then(() => {
      navigate(`/reset-password`);
    });
  };

  return (
    <Box>
      <Box my={9}>
        <Container
          sx={{
            boxShadow: '1',
            pt: 4,
            width: {
              xs: '100%',
              sm: '679px',
            },
          }}
        >
          <Box>
            <Box pt={2} pb={4}>
              <Typography variant="h2" color="primary">
                Create your unique username
              </Typography>
              <Typography variant="body3" color="primary.main">
                Create new Username and confirm it. This new Username will be used for login.
              </Typography>
            </Box>

            <Box pb={1}>
              <Typography variant="body3" color="textSecondary.main">
                Create your Username
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  name="UniqueUserName"
                  defaultValue={getValues().UniqueUserNameForDoctor}
                  error={errors.UniqueUserNameForDoctor?.message}
                  {...register('UniqueUserNameForDoctor', {
                    required: 'UniqueUserNameForDoctor Number is required',
                  })}
                  items={UniqueUserNameForDoctor}
                  onChange={(e) => {
                    e.target.value > 4 ? setDisbale(true) : setDisbale(false);
                  }}
                  clearErrors={clearErrors}
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment
                  //       position="end"
                  //       sx={{ p: 4, backgroundColor: theme.palette.grey.main }}
                  //     >
                  //       <Typography></Typography>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <InfoOutlinedIcon sx={{ fontSize: '15px', verticalAlign: 'middle' }} />
              <Typography variant="body3" color="primary" component={'div'}>
                You can use letters, numbers & symbols
              </Typography>
            </Box>

            <Box pt={2} pb={4}>
              <Typography>Suggestions:</Typography>
              <Link color="secondary.main" fontSize="14px" mr={1}>
                {firstSuggestion}
                <span>,</span>
              </Link>
              <Link color="secondary.main" fontSize="14px" mr={1}>
                {secondSuggestion}
                <span>,</span>
              </Link>
              <Link color="secondary.main" fontSize="14px">
                {thirdSuggestion}
              </Link>
            </Box>

            <Box display="flex" pb={6}>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="medium"
                disable={!disable}
                sx={{
                  mr: 3,
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                Continue to set your password
              </Button>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  backgroundColor: theme.palette.grey.main,
                  color: 'black',
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UniqueUserNameForDoctorRegistration;
