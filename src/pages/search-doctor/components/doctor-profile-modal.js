import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog } from '@mui/material';

// import { useSelector } from 'react-redux';
import { verboseLog } from '../../../config/debug';
// import { Button } from '../../../ui/core/button/button';

const DoctorProfileModal = ({ open, setOpen, doctorDetails, imagepath }) => {
  // const { searchDetailsById } = useSelector((state) => state.searchDoctor);

  const handleClose = () => {
    setOpen(false);
  };
  verboseLog('Doctor Details Object -> ', doctorDetails);
  return (
    <Dialog
      maxWidth="sm"
      sx={{
        '.MuiPaper-root': {
          borderRadius: '10px',
          width: '100%',
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <Box width="100%">
        <Box bgcolor="grey2.dark" py={6} px={2} display="flex" justifyContent="flex-end">
          <CloseIcon color="white" onClick={handleClose} />
        </Box>
        <Box className="docter-details" px={6}>
          <Box className="info" display="flex" py={1}>
            <Box className="icon" width="30%" position="relative">
              <Box className="outer-image">
                <img
                  src={`data:image/png;base64,${imagepath}`}
                  alt="doctor profile"
                  width="50%"
                  height="50%"
                />
              </Box>
            </Box>
            {/* <Box className="details" width="70%" mt={8}>
              <Typography variant="h2" color="textPrimary.main" component="div">
                {searchDetailsById?.data?.data?.salutation +
                  searchDetailsById?.data?.data?.full_name || ''}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary.main" component="div">
                {searchDetailsById?.data?.data?.state_medical_council}
              </Typography>
            </Box> */}
          </Box>
          {/* <Divider />
          <Typography variant="subtitle1" color="textPrimary.main" component="div" mt={2} mb={1}>
            View IMR Details
          </Typography>
          <Box display="flex" width="100%">
            <Box width="62%">
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="45%" color="inputTextColor.main" variant="body1">
                  Father/Husband Name
                </Typography>
                <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.father_husband_name}
                </Typography>
              </Box>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="45%" color="inputTextColor.main" variant="body1">
                  Date of Birth
                </Typography>
                <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.date_of_birth}
                </Typography>
              </Box>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="45%" color="inputTextColor.main" variant="body1">
                  Mobile number
                </Typography>
                <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.mobile_number}
                </Typography>
              </Box>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="45%" color="inputTextColor.main" variant="body1">
                  Email address
                </Typography>
                <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.email}
                </Typography>
              </Box>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="45%" color="inputTextColor.main" variant="body1">
                  Qualification
                </Typography>
                <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.qualifications[0]?.qualification}
                </Typography>
              </Box>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="45%" color="inputTextColor.main" variant="body1">
                  Qualification year
                </Typography>
                <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.qualifications[0]?.qualification_year}
                </Typography>
              </Box>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="45%" color="inputTextColor.main" variant="body1">
                  University Name
                </Typography>
                <Typography component="div" width="55%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.qualifications[0]?.university_name}
                </Typography>
              </Box>
            </Box>
            <Box width="38%" borderLeft="1px solid" borderColor="grey.main" pl={3}>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="55%" color="inputTextColor.main" variant="body1">
                  Year of Info
                </Typography>
                <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.year_of_info}
                </Typography>
              </Box>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="55%" color="inputTextColor.main" variant="body1">
                  Registration No.
                </Typography>
                <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.registration_number}
                </Typography>
              </Box>
              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="55%" color="inputTextColor.main" variant="body1">
                  Date of Reg.
                </Typography>
                <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.date_of_registration}
                </Typography>
              </Box>

              <Box className="detail" display="flex" mb={1}>
                <Typography component="div" width="55%" color="inputTextColor.main" variant="body1">
                  NMR ID
                </Typography>
                <Typography component="div" width="45%" color="textPrimary.main" variant="body1">
                  {searchDetailsById?.data?.data?.nmr_id}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="options" display="flex" justifyContent="flex-end" mb={2}>
            <Button
              sx={{
                marginRight: '10px',
              }}
              color="grey"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button color="secondary" variant="contained">
              Print
            </Button>
          </Box> */}
        </Box>
      </Box>
    </Dialog>
  );
};

export default DoctorProfileModal;
