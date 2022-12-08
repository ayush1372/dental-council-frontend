import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Box, Container, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { FontSize } from '../../../../../helpers/components/fontsize-toggle';
import { MultilingualDropdown } from '../../../../../helpers/components/multilingual-dropdown';
import { ColorModeContext } from '../../../../../theme/theme-provider-wrapper';
import { Button } from '../../../../core/button/button';

import styles from './top-bar.module.scss';

export const TopBar = () => {
  const { t } = useTranslation();
  const { palette } = useTheme(); //getting this from material-ui
  return (
    <Box className={styles.topBarWrapper} bgcolor="backgroundColor.main" color="primary">
      <Container>
        <Grid container justifyContent="space-between" alignItems="end">
          <Grid alignSelf="center" item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <LocalPhoneOutlinedIcon sx={{ width: '16px', height: '16px' }} color="primary" />
              <Typography variant="body4" m="0 0 0 5px" color="primary">
                {t('Our Toll Free Number')}: 1800-11-4477 / 14477
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} alignSelf="end" textAlign="end">
            <Button
              startIcon={<VisibilityOffOutlinedIcon sx={{ marginRight: '4px' }} />}
              className={styles.topBarIcon}
            >
              Screen Reader
            </Button>
            <Button className={styles.topBarIcon}>
              <FontSize size="small" />
            </Button>
            <Button className={styles.topBarIcon}>
              <FontSize size="medium" />
            </Button>
            <Button className={styles.topBarIcon}>
              <FontSize size="large" />
            </Button>
            <ColorModeContext.Consumer>
              {({ toggleColorMode }) => (
                <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit" disableRipple>
                  {palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              )}
            </ColorModeContext.Consumer>
            <Button
              startIcon={<NotificationsOutlinedIcon sx={{ marginRight: '4px' }} />}
              className={styles.topBarIcon}
            >
              Notification
            </Button>
            <Button
              startIcon={<HelpOutlineOutlinedIcon sx={{ marginRight: '4px' }} />}
              className={styles.topBarIcon}
            >
              Help
            </Button>
            <Button className={styles.topBarIcon}>
              <MultilingualDropdown />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
