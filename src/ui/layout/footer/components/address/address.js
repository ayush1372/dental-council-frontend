import { List, ListItem, ListItemText, Typography } from '@mui/material';

import styles from './address.module.scss';

export const Address = () => {
  return (
    <>
      <Typography
        // sx={{ mt: 4, mb: 2 }}
        variant="subtitle1"
        component="div"
        className={styles.footerTitle}
      >
        Address
      </Typography>

      <List>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="body1">
              National Health Authority 9th Floor, Tower-l, Jeevan Bharati Building, Connaught
              Place, New Delhi - 110 001
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="body1">
              E-mail :{' '}
              <a className={styles.emailLink} href="mailto: ndhm@nha.gov.in">
                ndhm@nha.gov.in
              </a>
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="body1">Toll-Free Number : 1800-11-4477</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
