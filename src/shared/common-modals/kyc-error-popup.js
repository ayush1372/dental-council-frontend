import { Box, Container, Modal, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

import { Button } from '../../ui/core';
export default function KycErrorPopup({ open, setOpen, text }) {
  const theme = useTheme();
  const handleCloseModal = () => {
    setOpen(false);
    window.location.reload();
  };

  const fuzzyDetails = useSelector(
    (state) => state?.doctorRegistration?.getkycDetailsData?.data?.fuzzy_parameters
  );

  return (
    <Modal open={open} sx={{ mt: 15 }}>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',
          height: '500px',
          p: '15px',
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography
            data-testid="popup-input-success-text"
            variant="h2"
            color="error.main"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            Details Mismatched!
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            textAlign="center"
            mt={2}
            data-testid="popup-input-text"
            component="div"
            flexDirection="column"
          >
            {text}
          </Typography>
          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Field</TableCell>
                    <TableCell align="center">Registered Value</TableCell>
                    <TableCell align="center">KYC Value</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fuzzyDetails.map((row) => (
                    <TableRow key={row.i}>
                      <TableCell align="center">{row.field}</TableCell>
                      <TableCell align="center">{row.registered_value}</TableCell>
                      <TableCell align="center">{row.kyc_value}</TableCell>
                      <TableCell
                        align="center"
                        sx={{ color: row.status === 'Success' ? 'green' : 'red' }}
                      >
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Button
            sx={{ width: { xs: '100%', sm: '408px' }, mt: 5, ml: 19 }}
            variant="contained"
            color="warning"
            onClick={handleCloseModal}
          >
            Ok
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
