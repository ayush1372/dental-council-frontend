import { Box, Grid, Typography } from '@mui/material';

const QualificationDetailsContent = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Name of the degree or diploma obtained
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              bachelor of dental surgery
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Country Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              India
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            State
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              New Delhi
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Name of the college
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Care Dental College
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            University
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Dr. NTR University of Health sciences
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Month of awarding Degree/Diploma
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              November
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Year of awarding Degree/Diploma
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              2016
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={6}>
          <Typography variant="subtitle2" color="inputTextColor">
            Is your name in degree, different from your name in Aadhaar?
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            No
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QualificationDetailsContent;
