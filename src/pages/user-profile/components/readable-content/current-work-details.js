import { Grid, Typography } from '@mui/material';

const CurrentWorkDetails = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="primary.main">
            Facility
          </Typography>
          {/*<Typography component={'span'} variant="subtitle2" color="primary.main">
            Organization
  </Typography>*/}
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            State
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Select State
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            District
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Select District
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Name of the Organization where you work
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Name of the Organization
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Organization Type
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Select Organization Type
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Address
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Address
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Pincode
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Pincode
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Telecommunication URL
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Telecommunication URL
          </Typography>
        </Grid>
        {/*<Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Department
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Department
          </Typography>
  </Grid>*/}
      </Grid>
    </Grid>
  );
};

export default CurrentWorkDetails;
