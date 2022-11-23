import { Box, Grid, Typography } from '@mui/material';

const PersonalDetails = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Salutation
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            Dr.
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor.main">
            Aadhaar Number
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              xxxx-xxxx-4688
            </Typography>
          </Box>
        </Grid>
        {false && (
          <Grid item xs={8} md={4}>
            <Typography variant="body3" color="grey.label">
              Salutation
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              Dr.
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            First Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Aarnav
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Middle Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Your middle name
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Last Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Sharma
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Fathers Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Praveen Sharma
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Mothers Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Savita Sharma
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Spouce Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Poonam Bala
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Nationality
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Indian
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Languages
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            Hindi,English
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Date Of Birth
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            09-18-1989
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Gender
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            Male
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="grey.label">
            Schedule
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            Schedule 1
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PersonalDetails;
