// import { useState } from 'react';

// import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
// import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Box, Dialog, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import { Button } from '../../../ui/core';

import styles from '../search-doctor.module.scss';

const DoctorProfileModal = ({ open, setOpen, imagepath }) => {
  const theme = useTheme();

  const { searchDetailsById } = useSelector((state) => state.searchDoctor);

  // const [copiedItem, setCopiedItem] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  // const textCopier = (copiedValue, copiedItemName) => {
  //   navigator.clipboard.writeText(copiedValue);
  //   setCopiedItem(copiedItemName);
  // };

  return (
    <Dialog
      scroll="body"
      open={open}
      onClose={handleClose}
      sx={{
        '.MuiPaper-root': {
          borderRadius: '10px',
          width: '100%',
          maxWidth: '882px',
          boxShadow: 1,
        },
      }}
    >
      <Box width="100%">
        <Box
          pt={3}
          px={3}
          display="flex"
          justifyContent="flex-end"
          className={styles.doctorTitleBackground}
        >
          <CloseIcon
            color="white"
            onClick={handleClose}
            sx={{ width: '48px', height: '48px', zIndex: 1, cursor: 'pointer' }}
          />
        </Box>
        <Box className={styles.docterDetails} px={6}>
          <Box display="flex" py={1}>
            <Box className={styles.icon} width="30%" position="relative">
              <Box className={styles.outerImage}>
                <img
                  src={`data:image/png;base64,${imagepath}`}
                  alt="doctor profile"
                  width="50%"
                  height="50%"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={7} p={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h2" color="inputTextColor.main">
              {searchDetailsById?.data?.data?.salutation +
                ' ' +
                searchDetailsById?.data?.data?.full_name || ''}
            </Typography>
            <Button
              sx={{ marginLeft: 'auto' }}
              color="secondary"
              variant="contained"
              onClick={() => window.print()}
            >
              Print
            </Button>
            {/* <ShareOutlinedIcon color="inputTextColor.main" sx={{ ml: 2 }} /> */}
          </Box>
          <Typography component="div" variant="h3" color="textSecondary.main">
            {searchDetailsById?.data?.data?.state_medical_council || ''}
          </Typography>
          <Grid
            container
            my={3}
            borderRadius="5px"
            border={`1px solid ${theme?.palette?.inputBorderColor?.main}`}
          >
            <Grid
              item
              pl={3}
              py={2}
              xs={12}
              sm={6}
              md={3}
              borderRight={`1px solid ${theme?.palette?.inputBorderColor?.main}`}
            >
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                NMR ID
              </Typography>
              <Typography component="div" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.nmr_id || ''}
              </Typography>
            </Grid>
            <Grid
              item
              pl={3}
              py={2}
              xs={12}
              sm={6}
              md={3}
              borderRight={`1px solid ${theme?.palette?.inputBorderColor?.main}`}
            >
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Registration No.
              </Typography>
              <Typography component="div" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.registration_number || ''}
              </Typography>
            </Grid>
            <Grid
              item
              pl={3}
              py={2}
              xs={12}
              sm={6}
              md={3}
              borderRight={`1px solid ${theme?.palette?.inputBorderColor?.main}`}
            >
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Date of Reg.
              </Typography>
              <Typography component="div" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.date_of_registration || ''}
              </Typography>
            </Grid>
            <Grid item pl={3} py={2} xs={12} sm={6} md={3}>
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Year of Registration
              </Typography>
              <Typography component="div" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.year_of_info || ''}
              </Typography>
            </Grid>
          </Grid>
          <Grid container rowSpacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Father/Husband Name
              </Typography>
              <Typography component="div" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.father_husband_name || ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Date of Birth
              </Typography>
              <Typography component="div" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.date_of_birth || ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Mobile number
              </Typography>
              <Typography component="span" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.mobile_number || ''}
                {/* {searchDetailsById?.data?.data?.mobile_number ? (
                  copiedItem === 'mobile' ? (
                    <CheckCircleOutlineOutlinedIcon
                      sx={{
                        color: 'success.main',
                        width: '16px',
                        height: '16px',
                        ml: 0.5,
                        cursor: 'pointer',
                      }}
                      onClick={() => setCopiedItem('')}
                    />
                  ) : (
                    <ContentCopyOutlinedIcon
                      sx={{
                        color: 'inputFocusColor.main',
                        width: '16px',
                        height: '16px',
                        ml: 0.5,
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        textCopier(searchDetailsById?.data?.data?.mobile_number, 'mobile')
                      }
                    />
                  )
                ) : (
                  ''
                )} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Email address
              </Typography>
              <Typography
                sx={{ wordBreak: 'break-word' }}
                component="span"
                variant="body1"
                color="textSecondary.main"
              >
                {searchDetailsById?.data?.data?.email || ''}
                {/* {searchDetailsById?.data?.data?.email ? (
                  copiedItem === 'email' ? (
                    <CheckCircleOutlineOutlinedIcon
                      sx={{
                        color: 'success.main',
                        width: '16px',
                        height: '16px',
                        ml: 0.5,
                        cursor: 'pointer',
                      }}
                      onClick={() => setCopiedItem('')}
                    />
                  ) : (
                    <ContentCopyOutlinedIcon
                      sx={{
                        color: 'inputFocusColor.main',
                        width: '16px',
                        height: '16px',
                        ml: 0.5,
                        cursor: 'pointer',
                      }}
                      onClick={() => textCopier(searchDetailsById?.data?.data?.email, 'email')}
                    />
                  )
                ) : (
                  ''
                )} */}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Qualification
              </Typography>
              <Typography component="span" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.qualifications[0]?.qualification || ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                Qualification year
              </Typography>
              <Typography component="span" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.qualifications[0]?.qualification_year || ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                component="div"
                variant="body1"
                fontWeight="400"
                color="inputTextColor.main"
              >
                University Name
              </Typography>
              <Typography component="span" variant="body1" color="textSecondary.main">
                {searchDetailsById?.data?.data?.qualifications[0]?.university_name || ''}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {searchDetailsById?.data?.data?.qualifications
          ? searchDetailsById?.data?.data?.qualifications?.map((q, index) => {
              return index !== 0 ? (
                <Box
                  key={`qualification_${index}`}
                  borderTop={`1px solid ${theme?.palette?.inputBorderColor?.main}`}
                  p={3}
                >
                  <Typography
                    color="tabHighlightedBackgroundColor.main"
                    component="div"
                    borderRadius={0}
                    pl={2}
                    mb={3}
                    borderLeft={`3px solid ${theme?.palette?.secondary?.main}`}
                  >
                    Additional Qualification :- {index}
                  </Typography>
                  <Grid container rowSpacing={{ xs: 2, md: 0 }}>
                    <Grid item xs={12} sm={4} md={3}>
                      <Typography
                        component="div"
                        variant="body1"
                        fontWeight="400"
                        color="inputTextColor.main"
                      >
                        Qualification
                      </Typography>
                      <Typography component="div" variant="body1" color="textSecondary.main">
                        {q?.qualification}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Typography
                        component="div"
                        variant="body1"
                        fontWeight="400"
                        color="inputTextColor.main"
                      >
                        Qualification year
                      </Typography>
                      <Typography component="div" variant="body1" color="textSecondary.main">
                        {q?.qualification_year}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                      <Typography
                        component="div"
                        variant="body1"
                        fontWeight="400"
                        color="inputTextColor.main"
                      >
                        University Name
                      </Typography>
                      <Typography component="div" variant="body1" color="textSecondary.main">
                        {q?.university_name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                ''
              );
            })
          : ''}
      </Box>
    </Dialog>
  );
};

export default DoctorProfileModal;
