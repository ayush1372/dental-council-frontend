import { Link, List, ListItem, ListItemText, Typography } from '@mui/material';

export const ImportantLinks = () => {
  const Links = [
    { title: 'Ministry of Health & Family Welfare', url: 'https://www.mohfw.gov.in' },
    { title: 'Ayushman Bharat Health Account(ABHA)', url: 'https://abha.abdm.gov.in/' },
    { title: 'Healthcare Professionals Registry(HPR)', url: 'https://hpr.abdm.gov.in/en' },
    { title: 'Healthcare Family Registry (HFR)', url: 'https://facility.abdm.gov.in' },
    { title: 'Grievance Portal', url: 'https://grievance.abdm.gov.in/' },
  ];
  return (
    <>
      <Typography variant="h2">Important Links</Typography>

      <List sx={{ paddingTop: { xs: 0, md: 3 } }}>
        {Links.map((item) => (
          <ListItem disableGutters disablePadding={true} key={`impLink_${item.title}`}>
            <ListItemText sx={{ margin: '0' }}>
              <Link
                href={item.url}
                color="white.main"
                fontWeight="400"
                lineHeight="28px"
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
