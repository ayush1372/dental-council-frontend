import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { Button } from '../../ui/core';

export default function DatafoundModalPopup({
  open,
  setOpen,
  text,
  imrData,
  setIsNext,
  handleClose,
  handleAadhaarPage,
  registrationData,
  accountExist,
}) {
  const theme = useTheme();

  const { councilNames } = useSelector((state) => state.common);

  const getCouncilName = () => {
    let name;
    Array.isArray(councilNames) &&
      councilNames?.map((elementData) => {
        if (elementData.id === registrationData?.smcId) {
          name = elementData?.name;
        }
      });
    return name;
  };
  const registrationNumber = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.registration_number
  );

  const hpName = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.hp_name
  );
  const handleCloseModal = () => {
    setOpen(false);
    window.location.reload();
  };
  const handleYes = () => {
    handleAadhaarPage(true);
    setIsNext(true);
    setOpen(false);
    handleClose(false);
  };
  const handleNo = () => {
    handleClose(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Modal open={open} sx={{ mt: 10 }}>
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',
          p: 3,
        }}
      >
        <Box>
          <Box display="flex" flexDirection="column">
            <Typography
              data-testid="popup-input-success-text"
              variant="h2"
              color="primary.main"
              display="flex"
              alignItems="felx-start"
            >
              {!hpName ? 'No Data Found' : 'Data Found'}
            </Typography>
            <Typography
              display="flex"
              textAlign="left"
              mt={2}
              data-testid="popup-input-text"
              component="div"
              flexDirection="column"
            >
              {!hpName ? text : 'Please review the details and click "Yes" to continue'}
            </Typography>
            {hpName && (
              <Box
                p="16px 16px 0px 16px"
                width={{ xs: '100%' }}
                sx={{
                  border: 'solid 1px',
                  borderColor: theme.inputBorderColor,
                  borderRadius: '8px',
                  marginTop: '16px',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body3" component="div" color="grey.label">
                      Name
                    </Typography>
                    <Typography variant="subtitle2" component="div" color="primary">
                      {registrationNumber === registrationData?.registrationNumber ? hpName : '-'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body3"
                      component="div"
                      paddingRight={{ xs: 0, sm: '169px' }}
                      color="grey.label"
                    >
                      Registration Number
                    </Typography>
                    <Typography variant="subtitle2" component="div" color="primary">
                      {registrationData?.registrationNumber}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ paddingTop: '16px', paddingBottom: '16px' }}>
                  <Typography variant="body3" component="div" color="grey.label">
                    Council
                  </Typography>
                  <Typography variant="subtitle2" component="div" color="primary">
                    {getCouncilName()}
                  </Typography>
                </Box>
              </Box>
            )}
            {imrData ? (
              <Box mt={3} display="flex" justifyContent="right">
                <Button variant="contained" size="small" color="grey" onClick={handleNo}>
                  No
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{
                    ml: 2,
                  }}
                  onClick={handleYes}
                >
                  Yes
                </Button>
              </Box>
            ) : accountExist ? (
              <Box display="flex" justifyContent="right">
                <Button
                  size="small"
                  sx={{
                    mt: 3,
                    width: '20%',
                  }}
                  variant="contained"
                  color="warning"
                  onClick={handleCloseModal}
                >
                  Done
                </Button>
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
