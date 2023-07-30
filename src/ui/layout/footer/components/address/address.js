import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Link, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';

export const Address = () => {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h2" fontWeight={'500'} component="div">
        Contact
      </Typography>

      <List sx={{ pt: 1, pb: 0 }}>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0 0 8px 0' }}>
            <Typography variant="body1" component="div">
              Address
            </Typography>
            <Typography variant="body3" fontWeight="400" component="div">
              National Health Authority 9th Floor, Tower-l, Jeevan Bharati Building, Connaught
              Place, New Delhi - 110 001
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0 0 8px 0' }}>
            <Typography variant="body1" component="div">
              Email
            </Typography>
            <Typography variant="body3" fontWeight="400" component="div">
              {`abdm[at]nha[dot]gov[dot]in`}
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0 0 8px 0' }}>
            <Typography variant="body1" component="div">
              Toll-free number
            </Typography>
            <Typography variant="body3" color={'white.main'} fontWeight="400">
              1800-11-4477
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem disableGutters disablePadding={true}>
          <ListItemText sx={{ margin: '0' }}>
            <Typography variant="body1" component="div" mb={0.5}>
              Social Media
            </Typography>
            <Box display={'flex'} gap={1}>
              <Link
                href="https://www.facebook.com/AyushmanBharatGoI"
                target="_blank"
                bgcolor={theme.palette.white.main}
                display="flex"
                flexBasis={5}
                borderRadius={'0'}
                p={'6px'}
              >
                <FacebookRoundedIcon
                  sx={{
                    fontSize: '28px !important',
                    fill:
                      theme.palette.mode === 'dark'
                        ? theme.palette.contrastLink.main
                        : theme.palette.primary.textColor,
                  }}
                />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCkd7w2rww0HQB4lZ-l3dB6g"
                target="_blank"
                bgcolor={theme.palette.white.main}
                display="flex"
                flexBasis={5}
                borderRadius={'0'}
                p={'6px'}
              >
                <YouTubeIcon
                  sx={{
                    fontSize: '28px !important',
                    fill:
                      theme.palette.mode === 'dark'
                        ? theme.palette.contrastLink.main
                        : theme.palette.primary.textColor,
                  }}
                />
              </Link>
              <Link
                href="https://twitter.com/AyushmanNHA"
                target="_blank"
                bgcolor={theme.palette.white.main}
                display="flex"
                flexBasis={5}
                borderRadius={'0'}
                p={'6px'}
              >
                <TwitterIcon
                  sx={{
                    fontSize: '28px !important',
                    fill:
                      theme.palette.mode === 'dark'
                        ? theme.palette.contrastLink.main
                        : theme.palette.primary.textColor,
                  }}
                />
              </Link>
              <Link
                href="https://www.instagram.com/ayushmannha/"
                target="_blank"
                bgcolor={theme.palette.white.main}
                display="flex"
                flexBasis={5}
                borderRadius={'0'}
                p={'6px'}
              >
                <InstagramIcon
                  sx={{
                    fontSize: '28px !important',
                    fill:
                      theme.palette.mode === 'dark'
                        ? theme.palette.contrastLink.main
                        : theme.palette.primary.textColor,
                  }}
                />
              </Link>
            </Box>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
};
