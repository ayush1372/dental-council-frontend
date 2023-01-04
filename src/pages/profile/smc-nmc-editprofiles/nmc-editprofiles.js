import { useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Button, TextField } from '../../../ui/core';
const NmcEditProfile = () => {
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
      Council: 'West Bengal',
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
    <Box>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h2" color="textPrimary.main">
              Edit Profile
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container item spacing={2} mt={3}>
        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
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
              required: ' Name is required',
              onChange: (e) => handleName(e),
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
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
              required: 'Phone Number is required',
              onChange: (e) => handlePhoneNumber(e),
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
            Email ID
          </Typography>
          <Typography component="span" color="error.main">
            *
          </Typography>
          <TextField
            type="text"
            fullWidth
            required
            name={'EmailId'}
            placeholder={'Enter Email ID'}
            value={email}
            defaultValue={getValues().EmailId}
            error={errors.EmailId?.message}
            {...register('EmailId', {
              required: 'Email ID required',
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
          <Typography variant="body3" color="grey.label">
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
                message: 'Provide a Valid User ID',
              },
            })}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="body3" color="grey.label">
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
              required: 'Council is required',
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
    </Box>
  );
};

export default NmcEditProfile;
