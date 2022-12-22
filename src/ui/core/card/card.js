import {
  Box,
  Card as MuiCard,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import { Button } from '../button/button';
import { SvgImageComponent } from '../svg-icons';
export const Card = ({
  svgIcon,
  icon,
  iconWidth,
  iconHeight,
  button,
  title,
  subheader,
  content,
  link,
  href,
  label,
  blockButton,
  statusTag,
  actionList,
  imageIcon,
  imageUrl,
  imageAlt,
}) => {
  return (
    <MuiCard sx={statusTag || imageIcon ? { padding: '0' } : ''}>
      {icon ? (
        <Box marginBottom="12px">
          <SvgImageComponent icon={svgIcon} fill="primary" width={iconWidth} height={iconHeight} />
        </Box>
      ) : (
        ''
      )}

      {statusTag ? (
        <Box borderBottom={1} borderColor="inputBorderColor.main">
          <Box p="24px">
            <Grid container direction="row" justifyContent="space-between">
              <Grid item xs={12} sm={9} display="flex" gap={3}>
                <SvgImageComponent
                  icon={svgIcon}
                  fill="primary"
                  width={iconWidth}
                  height={iconHeight}
                />
                <CardHeader m=" 0 0 0 30px" title={title} subheader={subheader} />
              </Grid>

              <Grid item xs={12} sm={3} textAlign="end">
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    padding: '8px 16px',
                    borderRadius: '25px',
                    color: 'success.main',
                    border: '1px solid',
                    borderColor: 'success.primary',
                    backgroundColor: 'success.light',
                    '&:hover': {
                      color: 'white.main',
                    },
                  }}
                >
                  <Typography variant="body3">Status: open</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : imageIcon ? (
        <Box p="24px">
          <Grid
            container
            direction="row"
            gap={4}
            alignItems="start"
            justifyContent={{ xs: 'center', sm: 'start' }}
          >
            <Grid item xs={12} sm="auto" display="flex">
              {' '}
              <CardMedia
                component="img"
                sx={{ maxHeight: '136px', objectFit: 'contain' }}
                src={imageUrl}
                alt={imageAlt}
              />
            </Grid>
            <Grid item xs={12} sm={8} display="flex">
              <CardHeader m=" 0 0 0 30px" title={title} subheader={subheader} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CardHeader title={title} subheader={subheader} />
      )}
      {!imageIcon && (
        <CardContent>
          {statusTag ? (
            <Box p="24px">
              <Typography mb={1} variant="body1" component="div" sx={{ fontWeight: '600' }}>
                Actions:
              </Typography>
              {actionList.map((item, index) => {
                return (
                  <Box display="flex" alignItems="center" key={index} mb={1}>
                    <SvgImageComponent
                      icon="checkCircleOutline"
                      fill="success"
                      width="20px"
                      height="20px"
                    />
                    <Typography ml={2} variant="body1" sx={{ fontWeight: '600' }}>
                      {item}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Typography>{content}</Typography>
          )}
        </CardContent>
      )}
      {link ? (
        <CardActions m="0">
          <Link underline="hover" href={href} color="secondary.main" sx={{ fontWeight: '500' }}>
            {label}
          </Link>
        </CardActions>
      ) : (
        ''
      )}

      {button ? (
        <CardActions
          pb="18px"
          sx={
            statusTag || imageIcon
              ? {
                  marginTop: '0',
                  padding: '18px 24px 24px',
                  borderTop: '1px solid',
                  borderColor: 'inputBorderColor.main',
                  backgroundColor: 'backgroundColor.light',
                }
              : {}
          }
        >
          {blockButton ? (
            <Button variant="contained" color="secondary" fullWidth>
              {label}
            </Button>
          ) : (
            <Button href={href} variant="contained" color="secondary">
              {label}
            </Button>
          )}
        </CardActions>
      ) : (
        ''
      )}
    </MuiCard>
  );
};
