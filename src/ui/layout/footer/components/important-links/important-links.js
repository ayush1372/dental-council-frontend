import CircleIcon from '@mui/icons-material/Circle';
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';

import styles from './important-links.module.scss';

export const ImportantLinks = () => {
  const theme = useTheme();
  const Links = [
    { title: 'Ministry of Health & Family Welfare', url: 'https://www.mohfw.gov.in' },
    { title: 'Ayushman Bharat Health Account(ABHA)', url: 'https://abha.abdm.gov.in/' },
    { title: 'Healthcare Professionals Registry(HPR)', url: 'https://hpr.abdm.gov.in/en' },
    { title: 'Healthcare Family Registry (HFR)', url: 'https://facility.abdm.gov.in' },
    { title: 'Grievance Portal', url: 'https://grievance.abdm.gov.in/' },
  ];
  return (
    <>
      <Typography variant="h2" fontWeight={'500'} component="div">
        Important Links
      </Typography>

      <List sx={{ pt: 1, pb: 0 }}>
        {Links.map((item) => (
          <ListItem
            disableGutters
            disablePadding={true}
            key={`impLink_${item.title}`}
            alignItems="flex-start"
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <CircleIcon sx={{ fontSize: '8px', fill: theme.palette.white.main, mr: 1 }} />
            </ListItemIcon>
            <ListItemText sx={{ margin: '0' }}>
              <Link
                variant="body3"
                href={item.url}
                color="white.main"
                fontWeight="400"
                lineHeight="28px"
                className={styles.importantLinkCls}
                underline="hover"
                target="_blank"
              >
                {item.title}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
