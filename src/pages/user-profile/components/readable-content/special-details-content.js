import { Grid, Typography } from '@mui/material';

const SpecialDetails = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Broad Speciality
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Doctor
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Super Speciality
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Your Sub Speciality
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SpecialDetails;
