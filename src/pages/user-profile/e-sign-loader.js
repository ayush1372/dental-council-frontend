import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const ConfirmEsignProcess = ({ handleClose }) => {
  return (
    <Box p={3} bgcolor="white.main" boxShadow="4">
      <Grid>
        <Box display={'flex'} justifyContent="flex-end">
          <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleClose} />
        </Box>
        <Box textAlign={'center'}>
          <Typography variant="h2">E-sign Verification</Typography>
        </Box>
      </Grid>

      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <CircularProgress color="primary" />
        <Typography textAlign="center" mt={2}>
          You have been re-directed to E-sign portal for verification process.
        </Typography>
        <Typography textAlign="center" mt={2}>
          Awaiting E-sign confirmation
        </Typography>
      </Box>
    </Box>
  );
};
export default ConfirmEsignProcess;
