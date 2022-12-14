import { Box, Card, CardContent, Chip, Container, Grid, Link, Typography } from '@mui/material';

import styles from './screen-reader.module.scss';

export function ScreenReader() {
  const cardContent = [
    {
      title: 'Non Visual Desktop Access (NVDA)',
      website: 'NVDA',
      url: 'https://www.nvaccess.org/',
      type: 'Free',
    },
    {
      title: 'System Access To Go',
      website: 'Satogo',
      url: 'https://www.satogo.com/en/',
      type: 'Free',
    },
    {
      title: 'Hal',
      website: 'Dolphin Screen Reader',
      url: 'https://yourdolphin.com/ScreenReader',
      type: 'Commercial',
    },
    {
      title: 'Job Access With Speech (JAWS)',
      website: 'JAWS',
      url: 'https://www.freedomscientific.com/products/software/jaws/',
      type: 'Commercial',
    },
    {
      title: 'SuperNova Magnifier & Screen Reader',
      website: 'SuperNova',
      url: 'https://yourdolphin.com/SuperNova',
      type: 'Commercial',
    },
  ];

  return (
    <Container sx={{ mt: 8, mb: 6 }}>
      <Typography variant="h2" mb={3} color="primary" data-testid="infoId">
        Information related to the various screen readers
      </Typography>
      <Grid container spacing={3}>
        {cardContent.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                <Chip
                  label={item.type}
                  sx={{
                    borderRadius: '0 10px 0 0',
                  }}
                  color="primary"
                  className={styles.cardType}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    color="primary"
                    variant="body1"
                    component="div"
                    data-testid="screenTitle"
                    mb={0}
                  >
                    {item.title}
                  </Typography>
                  <Box>
                    <Typography
                      mb={0}
                      gutterBottom
                      color="textPrimary"
                      variant="body3"
                      component="span"
                      mr={1}
                    >
                      Website:
                    </Typography>

                    <Link
                      href={item.url}
                      variant="body3"
                      color="primary"
                      target="_blank"
                      data-testid="screenWebsite"
                    >
                      {item.website}
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default ScreenReader;
