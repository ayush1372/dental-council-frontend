import {
  Box,
  Divider,
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SvgImageComponent } from '../../../../ui/core/svg-icons';

// import styles from './driving-licence-abha-creation.module.scss';

export function RegisterAbhaCreation() {
  const { t } = useTranslation();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#264488',
      color: theme.palette.common.white,
      fontSize: '1.1rem',
      fontWeight: 550,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      fontWeight: 450,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div data-testid="register-consent">
      <Box>
        <Box>
          <Box
            sx={{
              backgroundColor: 'background.default',
              p: 2,
              mt: 1,
              borderRadius: 2,
            }}
          >
            <Box>
              <Typography variant="h6">
                <b>{t('your_enrollment_number_is')} 1234454543</b>
              </Typography>
              <Typography variant="h6">
                <b>{t('complete_your_registration_at_a_nearby_participating')}</b>
              </Typography>
              <Typography variant="h6">
                <b>{t('use_your_enrolment_number_do_not_forget')} </b>
                <Link
                  href="https://facility.ndhm.gov.in/"
                  target="_blank"
                  rel="noopener  norefferrer"
                >
                  {t('abdm_participating_facility_center')}
                </Link>
              </Typography>
              <Typography>
                {t('driving_licence_authentication_successful')}
                <Box component="span" sx={{ color: 'green', ml: 1 }}>
                  <SvgImageComponent color={'green'} icon={'checkCircleOutline'} />
                  <br></br>
                </Box>
              </Typography>
              <Typography>
                {t('enrolement_number_created')}
                <Box component="span" sx={{ color: 'green', ml: 1 }}>
                  <SvgImageComponent color={'green'} icon={'checkCircleOutline'} />
                </Box>
              </Typography>

              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '99',
                  }}
                >
                  {/* <Typography variant="h5">
                    {' '}
                    {t('abha_number_available_after_physical_verification')}
                  </Typography> */}
                </Box>
                <Box
                  sx={{
                    maxWidth: '70%',
                    width: '100%',
                    mt: 2,
                    filter: 'blur(6px)',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <SvgImageComponent icon="arrowLeft" />
                  {/* <HidCardSvg svgData={svgData} /> */}
                </Box>
              </Box>
              <Box sx={{ mt: '5px', display: 'flex', justifyContent: 'space-evenly' }}>
                <Paper sx={{ width: '70%' }}>
                  <TableContainer
                    component={Paper}
                    sx={{
                      mt: 0,
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Table>
                      <TableHead>
                        <StyledTableCell> {t('Enrolment Number')}</StyledTableCell>
                        <StyledTableCell>123131</StyledTableCell>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell scope="row">Name</StyledTableCell>
                          <StyledTableCell>John Clinton</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell scope="row">Date of Birth</StyledTableCell>
                          <StyledTableCell>13/2/1995</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell scope="row">Gender</StyledTableCell>
                          <StyledTableCell>Male</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell scope="row">Address</StyledTableCell>
                          <StyledTableCell>154, Arul Nagar, Rose Mount</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell scope="row">State Name</StyledTableCell>
                          <StyledTableCell>Tamil Nadu</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell scope="row">Verification Type</StyledTableCell>
                          <StyledTableCell>Driving Licence</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                          <StyledTableCell scope="row">Verification Status</StyledTableCell>
                          <StyledTableCell>Provisional</StyledTableCell>
                        </StyledTableRow>
                        {/*
                         {rows.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell scope="row">{row.name}</StyledTableCell>
                            <StyledTableCell>{row.data}</StyledTableCell>
                          </StyledTableRow>
                        ))} */}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
              {/* <Button variant="contained" href="profile?redirectedFrom=registrationDL">View Details</Button> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default RegisterAbhaCreation;
