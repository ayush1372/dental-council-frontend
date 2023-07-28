import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, List, ListItem, ListItemText, Typography, useTheme} from '@mui/material';

export const Address = () => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="h2">
        Contact
      </Typography>

      <List sx={{ paddingTop: { xs: 0, md: 3 } }}>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="h6">Address</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '300'}}>
              National Health Authority 9th Floor, Tower-l, Jeevan Bharati Building, Connaught
              Place, New Delhi - 110 001
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="h6" mt={1}>Toll-free number</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '300'}}
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
            <Typography variant="h6" mt={1}>Email</Typography>
            <Typography
              sx={{fontSize: '14px', fontWeight: '300'}}
              display="flex"
              alignItems="flex-start"
              lineHeight="1"
            >
              <EmailOutlinedIcon sx={{ mr: 1, fontSize: '16px' }} />
              <a href="mailto: ndhm@nha.gov.in">&nbsp;abdm[at]nha[dot]gov[dot]in</a>
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="h6" mt={1}>Social Media</Typography>
            
            <Link href='https://www.facebook.com/AyushmanBharatGoI' sx={{ backgroundColor: theme.white }} p={1}> 
              <FacebookRoundedIcon sx={{fontSize: '32px'}} color='white'/> 
            </Link>

            <Link href='https://www.youtube.com/channel/UCkd7w2rww0HQB4lZ-l3dB6g' sx={{ backgroundColor: theme.white }} p={1}>
              <YouTubeIcon sx={{fontSize: '32px'}} color="white" />
            </Link>
            <Link href='https://twitter.com/AyushmanNHA' sx={{ backgroundColor: theme.white }} p={1}>
              <TwitterIcon sx={{fontSize: '32px'}} color='white'/>
            </Link>
            <Link href='https://www.instagram.com/ayushmannha/' sx={{ backgroundColor: theme.white }} p={1}>
              <InstagramIcon sx={{fontSize: '32px'}} color='white'/>
            </Link>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
