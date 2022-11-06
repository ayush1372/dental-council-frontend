import { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Icon,
  // FormControl,
  // FormControlLabel,
  // FormLabel,
  // Radio,
  // RadioGroup,
  Link,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { verboseLog } from '../../../../config/debug';
import { Palette } from '../../../../theme/palette';
import { Button } from '../../../../ui/core';
import { SvgImageComponent } from '../../../../ui/core/svg-icons';

import styles from './login-via-mobile.module.scss';

export function SelectAbhaId() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isError = false;
  const [copyOrCopied, setCopyOrCopied] = useState('');

  const abhaIDS = [
    { name: 'Aarushi Sharma', id: '91-6688-9900-5400', address: 'aarushi.sharma309@abdm.com' },
    { name: 'Nidhi Sharma', id: '91-6688-9900-6890', address: 'nidhi.sharma190@abdm.com' },
  ];

  function handleProfile(abhaID, abhaAddress) {
    verboseLog('In handleProfile');
    verboseLog('Your ID - ', abhaID);
    verboseLog('Your Address - ', abhaAddress);
    navigate('/profile');
  }

  function handleCopy(copiedElement, textToCopy) {
    navigator.clipboard.writeText(textToCopy);
    setCopyOrCopied(copiedElement);
  }

  return (
    <Box p="32px 0px">
      <Typography variant="h2">
        We Found The Following ABHA Number Linked to Mobile Number
      </Typography>
      <Box textAlign="left" mt={4}>
        {abhaIDS.map((ids, index) => {
          return (
            <Box key={`${index}_${ids.id}`} mb={4}>
              <Box display="flex">
                <Typography variant="subtitle1" width="auto">
                  Name:{' '}
                </Typography>
                <Typography variant="h3" pl={1} letterSpacing="1.5px" color="primary.main">
                  {ids.name}
                </Typography>
              </Box>
              <Typography variant="subtitle2" display="block" mt={1.5}>
                Your ABHA Number Is{' '}
                <Link
                  className={styles.abhaID_Link}
                  onClick={() => handleProfile(ids.id, ids.address)}
                >
                  {ids.id}
                </Link>
                <Icon>
                  {copyOrCopied === `${index}_abhaNumber` ? (
                    <span onClick={() => handleCopy('', ids.id)}>
                      <SvgImageComponent
                        width="16px"
                        height="16px"
                        icon="checkCircle"
                        fill={Palette.success.main}
                      />
                    </span>
                  ) : (
                    <ContentCopyIcon
                      className={styles.copyIconButton}
                      onClick={() => handleCopy(`${index}_abhaNumber`, ids.id)}
                    />
                  )}
                </Icon>
              </Typography>
              <Typography variant="subtitle2" display="block" mt={1.5}>
                Your ABHA Address Is{' '}
                <Link
                  className={styles.abhaID_Link}
                  onClick={() => handleProfile(ids.id, ids.address)}
                >
                  {ids.address}
                </Link>
                <Icon>
                  {copyOrCopied === `${index}_abhaAddress` ? (
                    <span onClick={() => handleCopy('', ids.address)}>
                      <SvgImageComponent
                        width="16px"
                        height="16px"
                        icon="checkCircle"
                        fill={Palette.success.main}
                      />
                    </span>
                  ) : (
                    <ContentCopyIcon
                      className={styles.copyIconButton}
                      onClick={() => handleCopy(`${index}_abhaAddress`, ids.address)}
                    />
                  )}
                </Icon>
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box mt={10}>
        {isError ? (
          <Typography display="block" component="span" mb={4} color="red">
            {' '}
            Please Select an ABHA ID
          </Typography>
        ) : (
          ''
        )}
        <Typography variant="body3">
          Forgot Your ABHA Number? <Link>Click here</Link>
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography pt={2.5} variant="body3">
            Want to Track Your Enrollment Number? <Link>Click here</Link>
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            // onClick={handleSubmit}
            // loading={isLoading}
            sx={{ fontSize: '16px', width: '33%' }}
          >
            {/* {t('Next')} */}
            {t('Continue to Profile')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default SelectAbhaId;
