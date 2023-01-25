import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  RegistrationCouncilNames,
  StateNames,
  UniversityNames,
} from '../../../constants/common-data';
import { SearchableDropdown } from '../../../shared/autocomplete/searchable-dropdown';
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
    <Grid>
      <Grid container spacing={2} mt={2}>
        <Grid container item xs={12}>
          <Typography variant="h2" color="textPrimary.main">
            Edit Profile
          </Typography>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
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

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College ID
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
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

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Phone Number
            <Typography component="span" color="error.main">
              *
            </Typography>
            <Typography component="span">
              <IconButton aria-label="toggle password visibility" edge="end">
                {getValues()?.CollegePhoneNumber?.length === 11 ? (
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
            fullWidth
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
                      p: '15px 10px 12px 10px',
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
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Email ID
            <Typography component="span" color="error.main">
              *
            </Typography>
            <Typography component="span">
              <IconButton aria-label="toggle password visibility" edge="end">
                {!errors.CollegeEmailId?.message && getValues().CollegeEmailId.length !== 0
                  ? // <CheckCircleIcon color="success" />
                    ''
                  : ''}
              </IconButton>
            </Typography>
          </Typography>
          <TextField
            fullWidth
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
                      p: '15px 10px 12px 10px',
                    }}
                  >
                    Get OTP
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Select University Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <SearchableDropdown
            name="UniversityName"
            clearErrors={clearErrors}
            defaultValue={getValues().UniversityName}
            items={UniversityNames}
            // TO DO:UniversityName default value to be shown on UI for future ref
            // value={UniversityNames[0].name}
            placeholder="Select University Name"
            error={errors.UniversityName?.message}
            {...register('UniversityName', {
              required: 'University Name is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Website
          </Typography>

          <TextField
            fullWidth
            name={'CollegeWebsite'}
            placeholder={'Enter College Website'}
            defaultValue={getValues().CollegeWebsite}
          />
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Address
          </Typography>

          <TextField
            multiline
            rows={1}
            fullWidth
            name={'CollegeAddress'}
            defaultValue={getValues().CollegeAddress}
            error={errors.CollegeAddress?.message}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            College Pin Code
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            name={'CollegePincode'}
            placeholder={'Enter Pin Code'}
            defaultValue={getValues().CollegePincode}
            error={errors.CollegePincode?.message}
            {...register('CollegePincode', {
              required: 'College Pin Code is required',
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            State Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>

          <SearchableDropdown
            name="StateName"
            clearErrors={clearErrors}
            items={StateNames}
            placeholder="Select State Name"
            error={errors.StateName?.message}
            {...register('StateName', {
              required: 'State Name is required',
            })}
          />
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Select your Registration Council
            <Typography component="span" color="error.main">
              *
            </Typography>
          </Typography>
          <Box>
            <SearchableDropdown
              name="RegistrationCouncil"
              items={RegistrationCouncilNames}
              placeholder="Select your Registration Council"
              clearErrors={clearErrors}
              error={errors.RegistrationCouncil?.message}
              {...register('RegistrationCouncil', {
                required: 'Registration Council is required',
              })}
            />
          </Box>
          <Grid />
          <Grid />
        </Grid>
      </Grid>

      <Grid container alignItems="center" mt={3}>
        <Grid item xs={12} sm="auto" alignItems="flex-start" mr={{ lg: 2, md: 2, sm: 2 }}>
          <Button
            sx={{
              m: {
                xs: '5px 0px',
                md: '0px',
              },
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onsubmit)}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm="auto" alignItems="flex-start">
          <Button
            variant="contained"
            color="grey"
            sx={{
              m: {
                xs: '5px 0px',
                // md: '0px',
              },
              width: {
                xs: '100%',
                // md: 'fit-content',
              },
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CollegeEditProfile;
