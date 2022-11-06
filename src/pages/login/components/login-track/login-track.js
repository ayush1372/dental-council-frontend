import { Box, Button, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SvgImageComponent } from '../../../../ui/core/svg-icons';

const LoginTrackComplete = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 1 }} data-testid={'login-track-heading-testid'}>
        {t('Your Enrolment Number has been recovered')}
        <Box component="span" sx={{ color: 'green', ml: 1 }}>
          <SvgImageComponent icon={'checkCircleOutline'} />
        </Box>
      </Typography>
      <Typography variant="h3">
        {t('Your Enrolment Number is')}
        <Box sx={{ ml: 1 }} component="span">
          {t('91-4038-8243-4307')}
        </Box>
      </Typography>
      <Typography variant="h6">
        {t('Recovery Successful')}
        <Box component="span" sx={{ color: 'green', ml: 1 }}>
          <SvgImageComponent icon={'checkCircleOutline'} />
        </Box>
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Button variant="contained" href="/">
        {t('Goto Homepage')}
      </Button>
    </Box>
  );
};

export default LoginTrackComplete;
