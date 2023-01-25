import { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';

import { Button, TextField } from '../../../ui/core';
const SmcEditProfile = () => {
  const [name, setName] = useState('Aarnav Sharma');
  const [phoneNumber, setphoneNumber] = useState('7547448483');
  const [email, setemail] = useState('aarnav@gmail.com.com');
  const [userId, setuserId] = useState('aarnav.sharma');
  const [password, setpassword] = useState('West Bengal');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      Name: 'Aarnav Sharma',
      PhoneNumber: '7547448483',
      UserId: 'aarnav.sharma',
      EmailId: 'aarnav@gmail.com.com',
      Password: 'Arnav@124',
    },
  });

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setphoneNumber(e.target.value);
  };
  const handleEmailId = (e) => {
    setemail(e.target.value);
  };
  const handleUserid = (e) => {
    setuserId(e.target.value);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };

  return (
    <Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Typography variant="h2" color="textPrimary.main">
            Edit Profile
          </Typography>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Name
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'Name'}
            placeholder={'Enter Name'}
            value={name}
            defaultValue={getValues().Name}
            error={errors.Name?.message}
            {...register('Name', {
              required: 'Enter valid name',
              onChange: (e) => handleName(e),
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Phone Number
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'PhoneNumber'}
            placeholder={'Enter Phone Number '}
            defaultValue={getValues().PhoneNumber}
            value={phoneNumber}
            error={errors.PhoneNumber?.message}
            {...register('PhoneNumber', {
              required: 'Enter valid phone number',
              onChange: (e) => handlePhoneNumber(e),
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Email ID
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            type="text"
            fullWidth
            required
            name={'EmailID'}
            placeholder={'Enter Email ID'}
            value={email}
            defaultValue={getValues().EmailId}
            error={errors.EmailId?.message}
            {...register('EmailId', {
              required: 'Enter valid email ID',
              onChange: (e) => handleEmailId(e),

              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
                message: 'Provide a Valid EmalId',
              },
            })}
          />
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            User ID
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            name={'UserId'}
            placeholder={'Enter User ID'}
            value={userId}
            defaultValue={getValues().UserId}
            error={errors.UserId?.message}
            {...register('UserId', {
              required: 'User ID is required',
              onChange: (e) => handleUserid(e),

              pattern: {
                message: 'Enter valid user ID',
              },
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body1" color="inputTextColor.main">
            Council
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            fullWidth
            required
            type="password"
            name={'Password'}
            value={password}
            placeholder={'Enter Council'}
            defaultValue={getValues().Password}
            error={errors.Password?.message}
            {...register('Password', {
              required: 'Enter valid council',
              onChange: (e) => handlePassword(e),
            })}
          />
        </Grid>
      </Grid>
      <Box display="flex" mt={5} md="auto">
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mr: 2,

            width: {
              xs: '100%',

              md: 'fit-content',
            },
          }}
          onClick={handleSubmit(onsubmit)}
        >
          Submit
        </Button>

        <Button
          variant="contained"
          color="grey"
          sx={{
            width: {
              xs: '100%',

              md: 'fit-content',
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Grid>
  );
};

export default SmcEditProfile;
