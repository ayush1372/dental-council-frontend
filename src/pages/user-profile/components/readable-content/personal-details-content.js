import { Grid, Typography } from '@mui/material';

const PersonalDetails = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="grey.label">
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

          <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
            xxxx-xxxx-4688
          </Typography>
        </Grid>
        {false && (
          <Grid item xs={8} md={4}>
            <Typography variant="subtitle2" color="grey.label">
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

          <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
            Aarnav
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Middle Name
          </Typography>

          <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
            Your middle name
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Last Name
          </Typography>

          <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
            Sharma
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Fathers Name
          </Typography>

          <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
            Praveen Sharma
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Mothers Name
          </Typography>

          <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
            Savita Sharma
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Spouce Name
          </Typography>

          <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
            Poonam Bala
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Nationality
          </Typography>
          <Typography bgcolor="grey2.main" p={1} variant="subtitle2" color="inputTextColor.light">
            Indian
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Languages
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            Hindi,English
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Date Of Birth
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            09-18-1989
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="grey.label">
            Gender
          </Typography>
          <Typography variant="subtitle2" color="primary.main">
            Male
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="grey.label">
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
