import { Box, InputAdornment, StyledEngineProvider } from '@mui/material';
import CN from 'clsx';

import { Button } from '../../button/button';
import { SvgImageComponent } from '../../svg-icons';
import { TextField } from '../textfield/textfield';

import styles from './search-bar.module.scss';

export default function SearchAppBar({ color, placeholder, basic }) {
  return (
    <StyledEngineProvider injectFirst>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <TextField
          placeholder={placeholder}
          className={CN({
            [styles.basic]: basic,
          })}
          InputProps={{
            className: styles.searchInput,
            'aria-label': 'search',

            endAdornment: basic ? (
              ''
            ) : (
              <InputAdornment position="end" className={styles.iconWrapper}>
                <SvgImageComponent height="24px" width="24px" icon="cancel" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className={CN(styles.searchIconBtn, {
            [styles.transparent]: color === 'transparent',
          })}
          color={color}
          endIcon={<SvgImageComponent height="30px" width="30px" icon="searchIcon" />}
          size="small"
          variant="contained"
        />
      </Box>
    </StyledEngineProvider>
  );
}
