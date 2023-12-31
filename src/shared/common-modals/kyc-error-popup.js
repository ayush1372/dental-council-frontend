import { Box, Container, Modal, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Button } from '../../ui/core';
export default function KycErrorPopup({ open, setOpen, text, setIsNext, onReset }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleYesClick = () => {
    setOpen(false);
  };
  const handleNo = () => {
    navigate('/register/doctor-registration');
    setOpen(false);
    setIsNext(false);
    onReset();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const fuzzyDetails = useSelector(
    (state) => state?.doctorRegistration?.getkycDetailsData?.data?.fuzzy_parameters
  );

  return (
    <Modal open={open} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',

          p: '15px',
        }}
      >
        <Box>
          <Typography
            data-testid="popup-input-success-text"
            variant="h2"
            color="error.main"
            display="flex"
            alignItems="felx-start"
            mt={2}
          >
            Details Mismatched!
          </Typography>

          <Box mt={3}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Field</TableCell>
                    <TableCell align="left">Registered value</TableCell>
                    <TableCell align="left">KYC value</TableCell>
                    <TableCell align="left">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fuzzyDetails.map((row) => (
                    <TableRow key={row.i}>
                      {row.field === 'DOB' ? (
                        <>
                          <TableCell align="left">{row.field}</TableCell>
                          <TableCell align="left">
                            {row.registered_value !== ''
                              ? moment(row.registered_value).format('DD-MM-YYYY')
                              : ''}
                          </TableCell>
                          <TableCell align="left">
                            {row.kyc_value !== '' ? moment(row.kyc_value).format('DD-MM-YYYY') : ''}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell align="left">{row.field}</TableCell>
                          <TableCell align="left">{row.registered_value}</TableCell>
                          <TableCell align="left">{row.kyc_value}</TableCell>
                        </>
                      )}
                      <TableCell
                        align="left"
                        sx={{ color: row.status === 'Success' ? 'green' : 'red' }}
                      >
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              pt={2}
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
          </Box>
          <Box display="flex" justifyContent="right" mt={4}>
            <Button variant="contained" color="secondary" onClick={handleYesClick}>
              Yes
            </Button>
            <Button
              variant="outlined"
              onClick={handleNo}
              mt={5}
              sx={{
                ml: 3,
                backgroundColor: 'grey.main',
                color: 'black.textBlack',
                border: 'none',
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
