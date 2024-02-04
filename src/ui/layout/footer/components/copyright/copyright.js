import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

{
  /* Commented for future reference */
}
// import useConfiguration from '../../../../../hooks/use-configuration';

export const Copyright = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  // const { env } = useConfiguration();

  return (
    <Box bgcolor="primary.main" py={4} borderTop={`1px solid ${theme.palette.white.main}`}>
      <Container>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Typography color="white.main" variant="body2" fontWeight="400">
              {t('copyright')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              color="white.main"
              variant="body2"
              fontWeight="400"
              display={'flex'}
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            >
              Page last updated on: 04/02/2024
            </Typography>
            {/* Commented for future reference */}
            {/* {env?.buildDate && (
              <Typography
                display={'flex'}
                justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}
                component={'div'}
                color="white.main"
                variant="body2"
                fontWeight="400"
              >
                {t(`Page last updated on: ${env?.buildDate}`)}
              </Typography>
            )} */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
