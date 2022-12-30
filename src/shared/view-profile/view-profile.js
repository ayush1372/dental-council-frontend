import { Box, Container, Grid, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
export function ViewProfile(props) {
  return (
    <Container>
      <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }}>
        <Typography
          sx={{ marginBottom: '0px' }}
          id="2"
          variant="h2"
          mb={3}
          color={props.showViewProfile ? 'primary.main' : 'black.main'}
        >
          View Profile
        </Typography>
        <Box
          align="right"
          // align={{ xs: 'none', md: 'right' }}
          display={'flex'}
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <FormControlLabel
            sx={{
              width: {
                xs: 'fit-content',
                md: '250px',
              },
              marginLeft: 0,
              marginRight: -3,
            }}
            value="email"
            control={<Switch color="primary" defaultChecked />}
            label="Email Notifications"
            labelPlacement="start"
          />
          <FormControlLabel
            sx={{
              width: {
                xs: 'fit-content',
                md: '250px',
              },
              marginLeft: 0,
              marginRight: -3,
            }}
            value="mobile"
            control={<Switch color="primary" defaultChecked />}
            label="Mobile Notifications"
            labelPlacement="start"
          />
        </Box>
      </Box>
      <Box
        sx={{
          boxShadow: '1',
        }}
        bgcolor="white.main"
      >
        <Grid container spacing={2} mt={2} p={3}>
          <Grid container item spacing={6}>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                NMR ID
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                71-1567-8728-1025
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Council verification status
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                Submitted
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Work Detail Verification Status
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                Submitted
              </Typography>
            </Grid>
          </Grid>

          {/* First row */}

          <Grid container item spacing={6}>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Email
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                madhura638@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={8} md={4}>
              <Typography variant="body3" color="grey.label">
                Mobile Number
              </Typography>
              <Typography variant="subtitle2" color="primary.main">
                9967453678
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ViewProfile;
