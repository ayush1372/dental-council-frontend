import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Copyright = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      bgcolor={
        theme.palette.mode === 'dark'
          ? theme.palette.black.main
          : theme.palette.tabHighlightedBackgroundColor.main
      }
      py={3}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <Typography color="white.main" variant="body3" fontWeight="400">
              {t('copyright')}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Typography color="white.main" variant="body3" fontWeight="400" component={'div'}>
              {t('Page last updated on: 12-10-2022 | No. of Visitors: 1,08,82,332')}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
