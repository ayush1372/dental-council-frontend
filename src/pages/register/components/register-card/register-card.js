import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../ui/core/button/button';

export function RegisterCard({ hoverCard, cardIcon, body, btnName, navigation, dataTestid }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Grid item xs={12} md={4} mb={{ xs: '32px', md: '0' }}>
      <Card
        sx={
          hoverCard
            ? {
                padding: '40px',
                backgroundColor: 'primary.main',
                transform: 'scale3d(1.1, 1.2, 1)',

                '@media screen and (max-width: 1023px)': {
                  transform: 'scale3d(1, 1, 1)',
                },
              }
            : {
                padding: '40px',
                backgroundColor: 'grey.main',
                height: '100%',
                '@media screen and (max-width: 1200px)': {
                  padding: '20px',
                },
              }
        }
      >
        <Box textAlign="center" mb={2}>
          <img src={cardIcon} alt="Driving Licence" height={hoverCard ? '74 px' : '56px'} />
        </Box>
        <CardContent>
          <Typography
            variant="body3"
            component="div"
            color={hoverCard ? 'white.main' : 'textPrimary.main'}
            textAlign="center"
            data-testid={dataTestid}
            sx={
              hoverCard && {
                transform: 'scale3d(1, 1, 1)',
              }
            }
          >
            {t(body)}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', marginTop: '8px' }}>
          <Button
            onClick={() => navigate(navigation)}
            color="secondary"
            variant={hoverCard ? 'contained' : 'outlined'}
            data-testid={dataTestid}
          >
            {t(btnName)}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default RegisterCard;
