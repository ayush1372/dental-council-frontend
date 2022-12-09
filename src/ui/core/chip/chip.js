import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Chip as MuiChip, StyledEngineProvider } from '@mui/material';
import CN from 'clsx';

import styles from './chip.module.scss';

export const Chip = ({ submitted, pending, reject, approved, ...prop }) => {
  return (
    <StyledEngineProvider injectFirst>
      <MuiChip
        sx={{ padding: '10px 16px ' }}
        variant="filled"
        icon={
          <FiberManualRecordIcon
            className={CN({
              [styles.dotSubmitted]: submitted,
              [styles.dotPending]: pending,
              [styles.dotReject]: reject,
              [styles.dotApproved]: approved,
            })}
            sx={{ fontSize: '6px' }}
          />
        }
        className={CN(styles.wrapper, {
          [styles.submitted]: submitted,
          [styles.pending]: pending,
          [styles.reject]: reject,
          [styles.approved]: approved,
        })}
        {...prop}
      ></MuiChip>
    </StyledEngineProvider>
  );
};
