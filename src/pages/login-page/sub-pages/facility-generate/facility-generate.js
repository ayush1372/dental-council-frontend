import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function FacilityGenerate() {
  const { t } = useTranslation();
  return (
    <div>
      {' '}
      <Box
        sx={{
          m: '2vw auto',
          p: 3,
          border: 1,
          borderColor: 'grey.500',
          borderRadius: '10px',
          width: 700,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography align="center" variant="h2" sx={{ mt: 4 }}>
          {t('Welcome !')}
        </Typography>
        <Typography align="center" variant="h3" sx={{ mt: 4 }}>
          {t('Select one of the options to proceed')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ m: 1 }} variant="outlined">
            {t('Create ABHA Number')}
          </Button>
          <Button sx={{ m: 1 }} variant="outlined">
            {t('Find  & Update ABHA')}
          </Button>
        </Box>
      </Box>{' '}
    </div>
  );
}
export default FacilityGenerate;
