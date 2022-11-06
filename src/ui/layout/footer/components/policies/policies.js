import { List, ListItem, ListItemText, Typography } from '@mui/material';

import styles from './policies.module.scss';

export const Policies = () => {
  const policies = [
    { title: 'Terms and Conditions', url: '/' },
    { title: 'Website Policies', url: '/' },
    { title: 'Health Data Management Policy', url: '/' },
    { title: 'Data Privacy Policy', url: '/' },
  ];
  return (
    <>
      <Typography variant="subtitle1" component="div" className={styles.footerTitle}>
        Policies
      </Typography>

      <List>
        {policies.map((item) => (
          <ListItem disableGutters disablePadding={true} key={`impLink_${item.title}`}>
            <ListItemText sx={{ margin: '0' }}>
              <Typography variant="body1">
                <a href={item.url}>{item.title}</a>
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
