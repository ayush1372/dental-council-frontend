// import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Button, Checkbox } from '../../../../ui/core';

const ProfileConsent = () => {
  const {
    formState: { errors },
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      consent: '',
    },
  });
  return (
    <Box bgcolor="white.main" py={2} px={4} mt={2} boxShadow={1}>
      <Typography component="div" color="primary.main" variant="body1">
        Consent
      </Typography>
      <Box bgcolor="backgroundColor.light" p={2} display="flex">
        <Checkbox
          name="consent"
          {...register('consent', {
            required: 'Consent is Required',
          })}
          error={errors.consent?.message}
        />
        <Typography component="div" mt={1} variant="body5">
          I, the applicant of the above facility hereby verify that the details as submitted on the
          portal pertaining to the above facility are true to my personal knowledge and nothing
          material has been concealed or falsely stated. I request you to kindly verify that the
          health facility as stated actually exists and give approval to that effect so that the
          facility can be &aposvalidated for existence&apos on the portal.
          <br /> <br />I am aware that the facility ID and related information can be used and
          shared with the entities working in the National Digital Health Ecosystem (NDHE) which
          inter alia includes stakeholders and entities such as healthcare professionals (e.g.
          doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health
          programmes), which are registered with or linked to the Ayushman Bharat Digital Mission
          (ABDM), and various processes there under. I reserve the right to revoke the given consent
          at any point of time, subject to applicable laws, rules and regulations.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            margin: '0 5px',
          }}
        >
          Print & Save as PDF
        </Button>
        <Button
          color="secondary"
          variant="contained"
          sx={{
            margin: '0 5px',
          }}
        >
          E-sign Profile
        </Button>
        <Button
          color="secondary"
          variant="contained"
          sx={{
            margin: '0 5px',
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default ProfileConsent;
