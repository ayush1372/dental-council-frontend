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
import { useTranslation } from 'react-i18next';

import styles from './policies.module.scss';

export const Policies = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const policies = [
    { title: 'Terms and Conditions', url: 'https://abdm.gov.in/terms-condition' },
    { title: 'Website Policies', url: 'https://abdm.gov.in/website-policy' },
    {
      title: 'Health Data Management Policy',
      url: 'https://abdm.gov.in:8081/uploads/health_management_policy_bac9429a79.pdf',
    },
    {
      title: 'Data Privacy Policy',
      url: 'https://abdm.gov.in:8081/uploads/privacypolicy_178041845b.pdf',
    },
  ];
  return (
    <>
      <Typography variant="h2" fontWeight={'500'} component="div">
        Policies
      </Typography>

      <List sx={{ pt: 1, pb: 0 }}>
        {policies.map((item) => (
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
                underline="hover"
                target="_blank"
                className={styles.policiesLinkClass}
              >
                {t(item.title)}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
