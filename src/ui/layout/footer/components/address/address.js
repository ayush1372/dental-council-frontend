import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export const Address = () => {
  return (
    <>
      <Typography variant="h2">Contact</Typography>

      <List sx={{ paddingTop: { xs: 0, md: 3 } }}>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="h6">Address</Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: '300' }}>
              National Health Authority 9th Floor, Tower-l, Jeevan Bharati Building, Connaught
              Place, New Delhi - 110 001
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="h6" mt={1}>
              Toll-free number
            </Typography>
            <Typography
              sx={{ fontSize: '14px', fontWeight: '300' }}
              display="flex"
              alignItems="flex-start"
            >
              <CallOutlinedIcon sx={{ mr: 1, fontSize: '16px' }} />
              1800-11-4477
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="h6" mt={1}>
              Email
            </Typography>
            <Typography
              sx={{ fontSize: '14px', fontWeight: '300' }}
              display="flex"
              alignItems="flex-start"
              lineHeight="1"
            >
              <EmailOutlinedIcon sx={{ mr: 1, fontSize: '16px' }} />
              <a href="mailto: ndhm@nha.gov.in">&nbsp;abdm[@]nha[dot]gov[dot]in</a>
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
