import { Link, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export const BreadcrumbContainer = ({ primary, ...prop }) => {
  return (
    <>
      <Typography textTransform="capitalize" variant="h5">
        {prop?.pageName ? prop?.pageName : ''}
      </Typography>
      <Breadcrumbs aria-label="breadcrumb" style={{ fontSize: '16px', fontWeight: 400 }}>
        <Link
          underline="hover"
          color={primary.main}
          href={prop?.primaryLink}
          onClick={prop?.onClick}
          style={{ cursor: 'pointer' }}
        >
          <Typography textTransform="capitalize" variant="body1" color={primary.main}>
            {(primary && primary) || 'Applications List'}
          </Typography>
        </Link>
        {prop?.secondary && (
          <Link
            underline="hover"
            color={prop?.tertiary ? primary.main : 'textPrimary.main'}
            href={prop?.secondaryLink}
            style={{ cursor: 'pointer' }}
          >
            <Typography
              textTransform="capitalize"
              variant="body1"
              color={prop?.tertiary ? primary.main : 'textPrimary.main'}
            >
              {prop?.secondary}
            </Typography>
          </Link>
        )}
        {prop?.tertiary && (
          <Link
            underline="hover"
            color="textPrimary.main"
            href={prop?.tertiaryLink}
            aria-current="page"
            style={{ cursor: 'pointer' }}
          >
            <Typography textTransform="capitalize" variant="body1" color="textPrimary.main">
              {prop?.tertiary}
            </Typography>
          </Link>
        )}
      </Breadcrumbs>
    </>
  );
};

export default BreadcrumbContainer;
