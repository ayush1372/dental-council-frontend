import { Chip as MuiChip, StyledEngineProvider } from '@mui/material';
import CN from 'clsx';

import styles from './chip.module.scss';

export const Chip = ({ type, ...prop }) => {
  return (
    <StyledEngineProvider injectFirst>
      <MuiChip
        sx={{ padding: '10px 16px ' }}
        variant="filled"
        className={CN(styles.wrapper, {
          [styles.submitted]: type === 'submitted',
          [styles.pending]: type === 'pending',
          [styles.reject]: type === 'reject',
          [styles.approved]: type === 'approved',
          [styles.queryRaised]: type === 'queryRaised',
          [styles.suspended]: type === 'suspended',
          [styles.blacklisted]: type === 'blacklisted',
        })}
        {...prop}
      ></MuiChip>
    </StyledEngineProvider>
  );
};
