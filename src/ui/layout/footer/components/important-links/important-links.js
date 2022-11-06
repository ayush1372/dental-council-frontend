import { List, ListItem, ListItemText, Typography } from '@mui/material';

import styles from './important-links.module.scss';

export const ImportantLinks = () => {
  const Links = [
    { title: 'Ayushman Bharat Digital Mission', url: '/' },
    { title: 'Health ID Healthcare Professionals Registry', url: '/' },
    { title: 'Health Facility Registry', url: '/' },
    { title: 'Grievance Portal', url: '/' },
  ];
  return (
    <>
      <Typography variant="subtitle1" component="div" className={styles.footerTitle}>
        Important Links
      </Typography>

      <List>
        {Links.map((item) => (
          <ListItem disableGutters disablePadding={true} key={`impLink_${item.title}`}>
            <ListItemText sx={{ margin: '0' }}>
              <Typography>
                <a href={item.url}>{item.title}</a>
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
