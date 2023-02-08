import { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Container, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';

import { verboseLog } from '../../../config/debug';
import { UniqueUserNameForDoctor } from '../../../constants/common-data';
import { Button } from '../../../ui/core';
import SuccessModal from './success-popup';

const UniqueUserNameForDoctorRegistration = () => {
  const theme = useTheme();
  const [isNext, setIsNext] = useState(false);
  const {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: '',
      RegistrationCouncil: '',
      RegistrationNumber: '',
    },
  });
  const onSubmit = () => {
    setIsNext(true);
  };
  verboseLog(isNext);

  return (
    <Box>
      {/* {isNext === false ? ( */}
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
                Create new password and confirm it. This new password will be used for login.
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
                  clearErrors={clearErrors}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ p: 4, backgroundColor: theme.palette.grey.main }}
                      >
                        <Typography></Typography>
                      </InputAdornment>
                    ),
                  }}
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
              <Link color="secondary.main" fontSize="14px">
                aarushi.sharma3,{' '}
              </Link>
              <Link color="secondary.main" fontSize="14px">
                aarushisharma390,{' '}
              </Link>
              <Link color="secondary.main" fontSize="14px">
                sharmaaarushi090
              </Link>
            </Box>

            <Box display="flex" pb={6}>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="medium"
                sx={{
                  mr: 3,
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                Create
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
      {isNext && <SuccessModal />}
    </Box>
  );
};

export default UniqueUserNameForDoctorRegistration;
