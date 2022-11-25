import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { SearchableDropdown } from '../../../components/autocomplete/searchable-dropdown';
import { StateNames, UniversityNames } from '../../../constants/utils';
import { Button, TextField } from '../../../ui/core';

const CollegeEditProfile = () => {
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      CollegeEmailId: 'aarnav.sharma@gmail.com',
      CollegeName: 'Aarnav sharma',
      CollegeId: '132188',
      CollegePhoneNumber: '8778636526',
      CollegeAddress: 'GGSIPU, Golf Course Rd, Sector 16 C, Dwarka, Delhi, 110078',
      CollegePincode: '110088',
      UniversityName: 'AIIMS Delhi',
      DeparmentName: '',
      StateName: 'New Delhi',
      CollegeWebsite: 'ipuniversity.co.in',
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
    <Box>
      <Grid container spacing={2} mt={2}>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h2" color="textPrimary.main">
                Edit Profile
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            College Name
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>
          <TextField
            fullWidth={true}
            required
            name={'CollegeName'}
            placeholder={'Enter College Name'}
            defaultValue={getValues().CollegeName}
            error={errors.CollegeName?.message}
            {...register('CollegeName', {
              required: 'College Name is required',
            })}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            College ID
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>
          <TextField
            fullWidth={true}
            required
            name={'CollegeId'}
            placeholder={'Enter College Id'}
            defaultValue={getValues().CollegeId}
            error={errors.CollegeId?.message}
            {...register('CollegeId', {
              required: 'College ID is required',
            })}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Phone Number
            <Typography component="span" sx={{ color: 'error.main' }}>
              *
            </Typography>
            <Typography component="span">
              <IconButton aria-label="toggle password visibility" edge="end">
                {getValues()?.CollegePhoneNumber?.length === 10 ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  ''
                )}
              </IconButton>
            </Typography>
          </Typography>
          <TextField
            type="number"
            onInput={(e) => handleInput(e)}
            fullWidth={true}
            required
            name={'CollegePhoneNumber'}
            placeholder={'Enter College Phone Number'}
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
                  <Button
                    variant="contained"
                    sx={{
                      padding: '15px 10px 12px 10px',
                    }}
                  >
                    Get OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={3}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor.main">
            College Email ID
            <Typography component="span" sx={{ color: 'error.main' }}>
              *
            </Typography>
            <Typography component="span">
              <IconButton aria-label="toggle password visibility" edge="end">
                {!errors.CollegeEmailId?.message && getValues().CollegeEmailId.length !== 0 ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  ''
                )}
              </IconButton>
            </Typography>
          </Typography>
          <TextField
            fullWidth={true}
            required
            name={'CollegeEmailId'}
            placeholder={'Enter College Email ID'}
            defaultValue={getValues().CollegeEmailId}
            error={errors.CollegeEmailId?.message}
            {...register('CollegeEmailId', {
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
                  <Button
                    variant="contained"
                    sx={{
                      padding: '15px 10px 12px 10px',
                    }}
                  >
                    Get OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Select University Name
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>
          <SearchableDropdown
            name="UniversityName"
            clearErrors={clearErrors}
            defaultValue={getValues().UniversityName}
            items={UniversityNames}
            // value={UniversityNames[0].name}
            placeholder="Select University Name"
            error={errors.UniversityName?.message}
            {...register('UniversityName', {
              required: 'University Name is required',
            })}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            College Website
          </Typography>

          <TextField
            fullWidth={true}
            name={'CollegeWebsite'}
            placeholder={'Enter College Website'}
            defaultValue={getValues().CollegeWebsite}
          />
        </Grid>
      </Grid>
      <Grid container item spacing={2} mt={3}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            College Address
          </Typography>

          <TextField
            fullWidth={true}
            name={'CollegeAddress'}
            placeholder={'Enter College Address'}
            defaultValue={getValues().CollegeAddress}
            error={errors.CollegeAddress?.message}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            College Pin Code
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>
          <TextField
            fullWidth={true}
            name={'CollegePincode'}
            placeholder={'Enter Pin Code'}
            defaultValue={getValues().CollegePincode}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            State Name
          </Typography>
          <Typography component="span" sx={{ color: 'error.main' }}>
            *
          </Typography>

          <SearchableDropdown
            name="StateName"
            clearErrors={clearErrors}
            items={StateNames}
            placeholder="Select StateName Name"
            error={errors.StateName?.message}
            {...register('StateName', {
              required: 'StateName Name is required',
            })}
          />
        </Grid>
      </Grid>
      <Box display="flex" marginTop="37px">
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginRight: '16px' }}
          onClick={handleSubmit(onsubmit)}
        >
          Submit
        </Button>
        <Button variant="contained" color="grey">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CollegeEditProfile;
