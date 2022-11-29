import { Grid, Typography } from '@mui/material';

const WorkDetails = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Are you currently working
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            No
          </Typography>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Nature of work
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Nature of work
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Choose work status
          </Typography>

          <Typography
            bgcolor="grey2.main"
            padding="10px"
            variant="subtitle2"
            color="inputTextColor.light"
          >
            Government only
          </Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Upload the Proof of work for govt. such as Appointment letter, Last pay slip, recent
            transfer order etc.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WorkDetails;
