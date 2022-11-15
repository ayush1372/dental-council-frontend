import { Box, Grid, Typography } from '@mui/material';

const QualificationDetailsContent = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Name of the degree or diploma obtained
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              bachelor of dental surgery
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Country Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              India
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            State
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              New Delhi
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Name of the college
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              Care Dental College
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            University
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              Dr. NTR University of Health sciences
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Month of awarding Degree/Diploma
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              November
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Year of awarding Degree/Diploma
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              2016
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant="subtitle2" color="inputTextColor">
            Is your name in degree, different from your name in Aadhaar?*
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            no
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QualificationDetailsContent;
