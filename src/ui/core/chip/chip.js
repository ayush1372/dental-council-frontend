import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Chip as MuiChip, StyledEngineProvider } from '@mui/material';
import CN from 'clsx';

import styles from './chip.module.scss';

export const Chip = ({ submitted, pending, reject, approved, type, queryRaised, ...prop }) => {
  return (
    <StyledEngineProvider injectFirst>
      <MuiChip
        sx={{ padding: '10px 16px ' }}
        variant="filled"
        icon={
          <FiberManualRecordIcon
            className={CN({
              [styles.dotSubmitted]: type === submitted,
              [styles.dotPending]: type === pending,
              [styles.dotReject]: type === reject,
              [styles.dotApproved]: type === approved,
              [styles.dotQueryRaised]: type === queryRaised,
            })}
            sx={{ fontSize: '6px' }}
          />
        }
        className={CN(styles.wrapper, {
          [styles.submitted]: type === 'submitted',
          [styles.pending]: type === 'pending',
          [styles.reject]: type === 'reject',
          [styles.approved]: type === 'approved',
          [styles.queryRaised]: type === 'queryRaised',
        })}
        {...prop}
      ></MuiChip>
    </StyledEngineProvider>
  );
};
