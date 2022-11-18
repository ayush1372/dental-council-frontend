import {
  Box,
  // Button, Container,
  Grid,
  Typography,
} from '@mui/material';
// import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { RegistrationCouncilNames } from '../../constants/utils';
import { Button, Select, TextField } from '../../ui/core';

export default function TrackStatus() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      options: '',
      RegistrationCouncil: '',
      RegistrationNumber: '',
    },
  });

  return (
    // <Container>

    //   <Box>
    //     <Typography variant="h2" sx={{ mt: 4 }}>
    //       Track Status
    //     </Typography>
    //   </Box>

    //   <Box>
    //     <Box sx={{ paddingBottom: '8px' }}>
    //       <Typography variant="body3" color="textSecondary.main">
    //         Medical Council Name
    //         <Typography component="span" sx={{ color: 'error.main' }}>
    //           *
    //         </Typography>
    //       </Typography>
    //     </Box>
    //     <Box>
    //       <Select
    //               fullWidth={true}
    //               name={'RegistrationCouncil'}
    //               error={errors.RegistrationCouncil?.message}
    //               defaultValue={getValues().RegistrationCouncil}
    //               options={RegistrationCouncilNames}
    //               {...register('RegistrationCouncil', {
    //                 required: 'Registration council name is required',
    //               })}
    //             />
    //     </Box>
    //   </Box>
    //   <Box sx={{ paddingBottom: '8px' }}>
    //     <Typography variant="body3" color="textSecondary.main">
    //       Registration Number
    //       <Typography component="span" sx={{ color: 'error.main' }}>
    //         *
    //       </Typography>
    //     </Typography>
    //   </Box>
    //   <TextField
    //             fullWidth={true}
    //             name={'RegistrationNumber'}
    //             placeholder={t('Enter Registration Number')}
    //             defaultValue={getValues().RegistrationNumber}
    //             error={errors.RegistrationNumber?.message}
    //             {...register('RegistrationNumber', {
    //               required: 'Registration Number is required',
    //             })}
    //           />

    //   <Button
    //             variant="contained"
    //             sx={{
    //               marginRight: '25px',
    //               width: '105px',
    //               height: '45px',
    //               backgroundColor: 'secondary.main',
    //             }}
    //           >
    //     Submit
    //   </Button>

    // </Container>

    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Box p={1}>
            <Typography color="black" variant="h3">
              Track Status
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={6} md={4}>
          <Select
            fullWidth
            error={errors.RegistrationCouncil?.message}
            name="RegistrationCouncil"
            label="Registration Council"
            defaultValue={getValues().RegistrationCouncil}
            required={true}
            {...register('RegistrationCouncil', {
              required: 'RegistrationCouncil* is required',
            })}
            options={RegistrationCouncilNames}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            variant="outlined"
            name={'RegistrationNumber'}
            label={'Registration Number'}
            fullWidth
            required
            placeholder="Select State"
            defaultValue={getValues().RegistrationNumber}
            {...register('RegistrationNumber')}
          />
        </Grid>
        <Grid item xs={6} md={4} mt={4}>
          <Button
            variant="contained"
            sx={{
              marginRight: '25px',
              width: '96px',
              height: '48px',
              backgroundColor: 'secondary.main',
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
