import { Link, List, ListItem, ListItemText, Typography } from '@mui/material';

export const Policies = () => {
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
      <Typography variant="subtitle1" component="div">
        Policies
      </Typography>

      <List sx={{ paddingTop: { xs: 0, md: 3 } }}>
        {policies.map((item) => (
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
