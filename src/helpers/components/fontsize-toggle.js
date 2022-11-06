import { IconButton, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { large, medium, small } from '../../store/reducers/app-font-size';

import styles from '../../ui/layout/header/components/top-bar/top-bar.module.scss';
// import { SvgImageComponent } from '../../ui/core/svg-icons';

export const FontSize = ({ size }) => {
  const dispatch = useDispatch();
  if (size === 'small') {
    return (
      <div>
        <IconButton
          aria-label="language-options"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => dispatch(small())}
          color="inherit"
          disableRipple={true}
          className={styles.fontZoomSmall}
        >
          <Typography variant="body4">- A</Typography>{' '}
          {/* <SvgImageComponent width="20px" height="20px" icon="text" /> */}
        </IconButton>
      </div>
    );
  } else if (size === 'medium') {
    return (
      <div>
        <IconButton
          aria-label="fontSize-options"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => dispatch(medium())}
          color="inherit"
          disableRipple={true}
          className={styles.fontZoomMedium}
        >
          <Typography variant="body4">A</Typography>{' '}
          {/* <SvgImageComponent width="20px" height="20px" icon="text" /> */}
        </IconButton>
      </div>
    );
  } else if (size === 'large') {
    return (
      <div>
        <IconButton
          aria-label="fontSize-options"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => dispatch(large())}
          color="inherit"
          disableRipple={true}
          className={styles.fontZoomLarge}
        >
          <Typography variant="body4">+ A</Typography>{' '}
          {/* - <SvgImageComponent width="20px" height="20px" icon="text" /> */}
        </IconButton>
      </div>
    );
  }
};
