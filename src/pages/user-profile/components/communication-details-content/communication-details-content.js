import { Box, Grid, Typography } from '@mui/material';

const CommunicationAddress = () => {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Your Name
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              Aarnav Sharma
            </Typography>
          </Box>
        </Grid>
        {/* {false && ( )} */}
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Your Address
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor">
              Hno. 560 Row 3 Sadar Bazar, New Delhi
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            City/Town/Village
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              New Delhi
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            District
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              New Delhi
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Sub District
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              Sub District
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            State/Union Territory
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              New Delhi
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Country
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              India
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Postal code
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              120018
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item xs={8} md={4}>
          <Typography variant="subtitle2" color="inputTextColor">
            Email Address
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              aarushi.sharma309@gmail.com
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Typography variant="body3" color="inputTextColor">
            Mobile Number
          </Typography>
          <Box bgcolor="grey2.main" lineHeight="2" padding="10px">
            <Typography variant="subtitle2" color="inputTextColor.light">
              9988334355
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommunicationAddress;
