import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Box, Container, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import CN from 'clsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FontSize } from '../../../../../helpers/components/fontsize-toggle';
import { MultilingualDropdown } from '../../../../../helpers/components/multilingual-dropdown';
import { ColorModeContext } from '../../../../../theme/theme-provider-wrapper';
import { Button } from '../../../../core/button/button';

import styles from './top-bar.module.scss';

export const TopBar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <Box className={styles.topBarWrapper} backgroundColor="backgroundColor.main">
      <Container>
        <Grid container justifyContent="space-between" alignItems="start">
          <Grid alignSelf="center" item xs={12} sm={5}>
            <Box display="flex" alignItems="center">
              <LocalPhoneOutlinedIcon sx={{ width: '16px', height: '16px' }} color="primary" />
              <Typography variant="body4" m="0 0 0 5px" color="primary">
                {t('Our Toll Free Number')}: 1800-11-4477 / 14477
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            display="flex"
            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
            alignItems="center"
            textAlign={{ xs: 'start', sm: 'end' }}
          >
            <Button
              onClick={() => navigate('/screen-reader')}
              startIcon={
                <VisibilityOffOutlinedIcon sx={{ marginRight: { xs: '2px', sm: '4px' } }} />
              }
              className={styles.topBarIcon}
            >
              Screen Reader
            </Button>
            <Box mr={{ xs: '12px', md: 2 }} className={styles.fontBlock}>
              <Button className={styles.fontText}>
                <FontSize size="small" />
              </Button>
              <Button className={styles.fontText}>
                <FontSize size="medium" />
              </Button>
              <Button className={styles.fontText}>
                <FontSize size="large" />
              </Button>
            </Box>

            <ColorModeContext.Consumer>
              {({ toggleColorMode }) => (
                <IconButton
                  onClick={toggleColorMode}
                  disableRipple
                  className={CN(styles.topBarIcon, styles.themeToggleBtn)}
                >
                  {palette.mode === 'light' ? (
                    <Brightness4Icon fontSize="small" color="primary" />
                  ) : (
                    <Brightness7Icon fontSize="small" color="secondary" />
                  )}
                </IconButton>
              )}
            </ColorModeContext.Consumer>

            <Button sx={{ ml: { xs: '2px' } }} className={styles.multilingualDropdown}>
              <MultilingualDropdown />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
