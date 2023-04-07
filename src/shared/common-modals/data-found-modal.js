import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Button } from '../../ui/core';

export default function DatafoundModalPopup({
  open,
  setOpen,
  text,
  imrData,
  setIsNext,
  handleAadhaarPage,
  accountExist,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const councilName = useSelector(
    (state) => state?.doctorRegistration?.getSmcRegistrationDetails?.data?.council_name
  );

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
  };
  const handleNo = () => {
    navigate('/');
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
              Info !
            </Typography>
            <Typography
              display="flex"
              textAlign="left"
              mt={2}
              data-testid="popup-input-text"
              component="div"
              flexDirection="column"
            >
              {text}
            </Typography>
            <Box p="30px 32px 0px 32px" width={{ xs: '100%', md: '679px' }} sx={{ boxShadow: '2' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body3" component="div" color="grey.label">
                    Name
                  </Typography>
                  <Typography variant="subtitle2" component="div" color="primary">
                    {hpName ? hpName : '-'}
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
                    {registrationNumber}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ paddingTop: '34px', paddingBottom: '20px' }}>
                <Typography variant="body3" component="div" color="grey.label">
                  Council
                </Typography>
                <Typography variant="subtitle2" component="div" color="primary">
                  {councilName}
                </Typography>
              </Box>
            </Box>
            {imrData ? (
              <Box pl={15} mt={3} display="flex" justifyContent="right">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{
                    mr: 3,
                  }}
                  onClick={handleYes}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleNo}
                  sx={{ backgroundColor: 'grey.main', color: 'black.textBlack', border: 'none' }}
                >
                  No
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
                  Ok
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
