import { Grid } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export default function BreadcrumbsCompnent(props) {
  return (
    <Grid sx={{ m: 2 }} role="presentation" onClick={props.handleBreadCrumClick}>
      <Breadcrumbs
        sx={{
          '.MuiBreadcrumbs-separator': {
            color: 'primary.main',
          },
        }}
      >
        <Typography id="1" variant="body1" color="primary.main" sx={{ cursor: 'pointer' }}>
          Dashboard
        </Typography>
        {(props.showTable || props.showViewProfile) && (
          <Typography
            id="2"
            variant="body1"
            color={props.showViewProfile ? 'primary.main' : 'black.main'}
            sx={{ cursor: 'pointer' }}
          >
            Applications List
          </Typography>
        )}
        {props.showViewProfile && (
          <Typography
            id="3"
            variant="body1"
            color="breadCrumbActiveColor.main"
            sx={{ cursor: 'pointer' }}
          >
            View Profile
          </Typography>
        )}
      </Breadcrumbs>
    </Grid>
  );
}
