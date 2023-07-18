import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export const Address = () => {
  return (
    <>
      <Typography variant="subtitle1" component="div">
        Address
      </Typography>

      <List sx={{ paddingTop: { xs: 0, md: 3 } }}>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="body1" fontWeight="400" lineHeight="28px" component="div" mb={2}>
              National Health Authority 9th Floor, Tower-l, Jeevan Bharati Building, Connaught
              Place, New Delhi - 110 001
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography
              variant="body1"
              fontWeight="400"
              component="div"
              mb={2}
              display="flex"
              alignItems="flex-start"
              lineHeight="1"
            >
              <EmailOutlinedIcon sx={{ mr: 1, fontSize: '16px' }} />
              E-mail:<a href="mailto: ndhm@nha.gov.in">&nbsp;abdm[@]nha[dot]gov[dot]in</a>
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography
              variant="body1"
              fontWeight="400"
              component="div"
              display="flex"
              alignItems="flex-start"
            >
              <CallOutlinedIcon sx={{ mr: 1, fontSize: '16px' }} />
              Toll-Free Number: 1800-11-4477 / 14477
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
