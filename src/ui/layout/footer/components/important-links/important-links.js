import { Link, List, ListItem, ListItemText, Typography } from '@mui/material';

export const ImportantLinks = () => {
  const Links = [
    { title: 'Ayushman Bharat Digital Mission', url: 'https://abdm.gov.in/' },
    { title: 'ABHA', url: '/' },
    { title: 'Healthcare Professionals Registry', url: 'https://hpr.abdm.gov.in/en' },
    { title: 'Grievance Portal', url: 'https://grievance.abdm.gov.in/' },
  ];
  return (
    <>
      <Typography variant="subtitle1" component="div">
        Important Links
      </Typography>

      <List sx={{ paddingTop: { xs: 0, md: 3 } }}>
        {Links.map((item) => (
          <ListItem disableGutters disablePadding={true} key={`impLink_${item.title}`}>
            <ListItemText sx={{ margin: '0' }}>
              <Link
                href={item.url}
                color="white.main"
                fontWeight="400"
                lineHeight="28px"
                underline="always"
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
