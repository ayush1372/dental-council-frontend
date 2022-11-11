import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Container, Grid, IconButton, InputAdornment, Paper, Typography } from '@mui/material';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { TextField } from '../../../../src/ui/core/form/textfield/textfield';
import { DepartmentNames } from '../../../constants/utils';
import { StateNames } from '../../../constants/utils';
import { Button, Select } from '../../../ui/core';
// import { UploadFile } from '../../../ui/core';

export function CollegeRegistration() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      CollegeName: '',
      CollegeId: '',
      CollegePhoneNumber: '',
      CollegeAddress: '',
      CollegePincode: '',
      CollegeWebsite: '',
      DeparmentName: '',
      StateName: '',
      LastName: '',
      Day: '',
      Month: '',
      Year: '',
    },
  });
  const handleInput = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      e.target.value = isNaN(e.target.value)
        ? e.target.value.toString().slice(0, -1)
        : Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
    }
  };
  return (
    <Container sx={{ paddingTop: '40px' }}>
      <Paper square elevation={1}>
        <Box width="1281" height="800px" pl="43px" pr="43px">
          <Box pt="20px">
            <Typography variant="h1" mt="40px" color="primary.dark">
              College Registration
            </Typography>
            <Typography variant="subtitle1" mt="40px" color="primary.dark">
              College Details
            </Typography>
          </Box>
          <Grid item container>
            {/* parent grid */}
            <Grid container columnSpacing={'109px'} sx={{ pt: '35px' }}>
              {/* //child grid 1 */}
              <Grid item xs={8} xl={4}>
                <Box>
                  <Typography variant="body3" color="textSecondary.main">
                    College Name
                    <Typography component="span" sx={{ color: 'error.main' }}>
                      *
                    </Typography>
                  </Typography>
                  <TextField
                    sx={{ paddingTop: '19px' }}
                    fullWidth={true}
                    required
                    data-testid={'login-recovery-collegename-id'}
                    name={'CollegeName'}
                    placeholder={t('Enter College Name')}
                    defaultValue={getValues().CollegeName}
                    error={errors.CollegeName?.message}
                    {...register('CollegeName', {
                      required: 'College Name is required',
                    })}
                  />
                </Box>
              </Grid>
              <Grid item xs={8} xl={4}>
                <Box>
                  <Typography variant="body3" color="textSecondary.main">
                    College ID
                    <Typography component="span" sx={{ color: 'error.main' }}>
                      *
                    </Typography>
                  </Typography>
                  <TextField
                    sx={{ paddingTop: '19px' }}
                    fullWidth={true}
                    required
                    data-testid={'login-recovery-middlename-id'}
                    name={'CollegeId'}
                    placeholder={t('Enter College ID')}
                    defaultValue={getValues().CollegeId}
                    error={errors.CollegeId?.message}
                    {...register('CollegeId', {
                      required: 'College ID is required',
                    })}
                  />
                </Box>
              </Grid>
              <Grid item xs={8} xl={4}>
                <Box>
                  <Typography variant="body3" color="textSecondary.main">
                    College Phone Number
                    <Typography component="span" sx={{ color: 'error.main' }}>
                      *
                    </Typography>
                    <Typography component="span">
                      <IconButton aria-label="toggle password visibility" edge="end">
                        {getValues()?.CollegePhoneNumber?.length === 10 ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CheckCircleIcon />
                        )}
                      </IconButton>
                    </Typography>
                  </Typography>
                  {/* <TextField
                    sx={{ paddingTop: '6px', marginTop: '-2px' }}
                    fullWidth={true}
                    type="number"
                    name="CollegePhoneNumber"
                    size="large"
                    required
                    defaultValue={getValues().CollegePhoneNumber}
                    error={errors.CollegePhoneNumber?.message}
                    {...register('CollegePhoneNumber', {
                      required: 'Mobile Number is required',
                      pattern: {
                        value: /^\d{10}$/i,
                        message: 'Provide a Valid Phone Number',
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button variant="contained" sx={{ marginRight: '-13px', height: '57px' }}>
                            Get OTP
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  /> */}
                  <TextField
                    sx={{ paddingTop: '5px', marginTop: '-2px' }}
                    fullWidth={true}
                    type="text"
                    name="CollegePhoneNumber"
                    size="large"
                    required
                    placeholder={t('Phone Number')}
                    defaultValue={getValues().CollegePhoneNumber}
                    onInput={(e) => handleInput(e)}
                    error={errors.CollegePhoneNumber?.message}
                    {...register('CollegePhoneNumber', {
                      required: 'Mobile Number is required',
                      pattern: {
                        value: /^\d{10}$/i,
                        message: 'Provide a Valid Phone Number',
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button variant="contained" sx={{ marginRight: '-13px', height: '57px' }}>
                            Get OTP
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container columnSpacing={'109px'} sx={{ pt: '35px' }}>
              {/* // child grid-2 */}
              <Grid item xs={8} xl={4}>
                <Box padding={'-10px'}>
                  <Typography variant="body3" color="textSecondary.main">
                    College Email ID
                    <Typography component="span" sx={{ color: 'error.main' }}>
                      *
                    </Typography>
                    <Typography component="span">
                      <IconButton aria-label="toggle password visibility" edge="end">
                        {!errors.email?.message && getValues().email.length !== 0 ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CheckCircleIcon />
                        )}
                      </IconButton>
                    </Typography>
                  </Typography>
                  <TextField
                    sx={{ paddingTop: '5px', marginTop: '-10px' }}
                    fullWidth={true}
                    type="text"
                    name="email"
                    size="large"
                    required
                    placeholder={t('Email')}
                    defaultValue={getValues().email}
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email ID is required',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                        message: 'Provide a Valid Email ID',
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button variant="contained" sx={{ marginRight: '-13px', height: '57px' }}>
                            Get OTP
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={8} xl={4}>
                <Box>
                  <Typography variant="body3" color="textSecondary.main">
                    Department name
                    <Typography component="span" sx={{ color: 'error.main' }}>
                      *
                    </Typography>
                  </Typography>
                  <Select
                    // sx={{ paddingTop: '19px' }}
                    placeholder={'select department name'}
                    fullWidth
                    error={errors.DepartmentName?.message}
                    defaultValue={getValues().DepartmentName}
                    name="DepartmentName"
                    {...register('DepartmentName', {
                      required: 'Department name is required',
                    })}
                    options={DepartmentNames}
                  />
                </Box>
              </Grid>
              <Grid item xs={8} xl={4}>
                <Box>
                  <Typography variant="body3" color="textSecondary.main">
                    State Name
                    <Typography component="span" sx={{ color: 'error.main' }}>
                      *
                    </Typography>
                  </Typography>
                  <Select
                    // sx={{ paddingTop: '19px' }}
                    fullWidth
                    error={errors.StateName?.message}
                    defaultValue={getValues().StateName}
                    name="StateName"
                    {...register('StateName', {
                      required: 'state name is required',
                    })}
                    options={StateNames}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={'109px'} sx={{ pt: '35px' }}>
              <Grid item xs={4} mt={0}>
                <Box>
                  <Typography variant="body3" color="textSecondary.main">
                    College Website
                  </Typography>
                  <TextField sx={{ paddingTop: '19px' }} fullWidth={true} />
                </Box>
              </Grid>
              <Grid item xs={4} mt={0}>
                <Box gridColumn="span 8">
                  <Typography variant="body3" color="textSecondary.main">
                    College Address
                  </Typography>
                  <TextField fullWidth={true} sx={{ paddingTop: '19px' }} />
                </Box>
              </Grid>
              <Grid item xs={4} mt={0}>
                <Box>
                  <Typography variant="body3" color="textSecondary.main">
                    College Pin Code
                  </Typography>
                  <TextField
                    sx={{ paddingTop: '19px' }}
                    fullWidth={true}
                    data-testid={'login-recovery-middlename-id'}
                    defaultValue={getValues().MiddleName}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Box p={'55px'} textAlign="center">
            <Button
              onClick={handleSubmit(onsubmit)}
              variant="contained"
              color="secondary"
              sx={{
                width: '96px',
                height: '51px',
              }}
            >
              submit
            </Button>
          </Box>
          {/* <UploadFile /> */}
        </Box>
      </Paper>
    </Container>
  );
}
export default CollegeRegistration;
