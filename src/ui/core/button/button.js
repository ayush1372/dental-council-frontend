import { StyledEngineProvider } from '@mui/material';
import { Button as MuiButton } from '@mui/material';

import styles from './button.module.scss';

/**
 * Props structure
 *
 * variant: "contained", "outlined","text"
 * color: "primary", "secondary", "grey"
 * size: "small", "medium", "large"
 */

export const Button = ({ menuButton, children, ...prop }) => {
  return (
    <StyledEngineProvider injectFirst>
      <MuiButton className={menuButton ? styles.menuButton : ''} {...prop}>
        {children}
      </MuiButton>
    </StyledEngineProvider>
  );
};
