import {
  Card as MuiNewsCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { Button } from '../button/button';
import { SvgImageComponent } from '../svg-icons';

export function CardNews({
  imageUrl,
  imageAlt,
  title,
  subTitle,
  buttonLabel,
  publishedDate,
  linkCard,
  href,
}) {
  return (
    <MuiNewsCard sx={{ padding: '0' }}>
      <CardMedia component="img" sx={{ maxHeight: '231px' }} image={imageUrl} alt={imageAlt} />
      <CardContent
        sx={{
          padding: '24px',
          marginTop: '0',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Typography gutterBottom variant="subtitle1" color="primary" component="div" mb={1}>
          {title}
        </Typography>
        <Typography variant="subtitle2" mb={1}>
          {subTitle}
        </Typography>
        <Typography variant="body3" color="textSecondary.main">
          {publishedDate}
        </Typography>
      </CardContent>
      <CardActions
        sx={
          linkCard
            ? { padding: '0 24px 24px', margin: '0' }
            : { padding: '24px', margin: '0', backgroundColor: 'backgroundColor.light' }
        }
      >
        {linkCard ? (
          <Button
            href={href}
            color="secondary"
            iconBtn
            endIcon={<SvgImageComponent icon="keyboardRight" />}
            sx={{
              fontWeight: '500',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '0',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            {buttonLabel}
          </Button>
        ) : (
          <Button href={href} variant="contained" color="secondary">
            {buttonLabel}
          </Button>
        )}
      </CardActions>
    </MuiNewsCard>
  );
}
