import { useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Box, Collapse, Icon, IconButton, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { verboseLog } from '../../../../config/debug';
import { Button } from '../../../../ui/core';
import { SvgImageComponent } from '../../../../ui/core/svg-icons';

import styles from './view-abha-number.module.scss';

export function ViewAbhaNumber() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isError = false;
  const [copyOrCopied, setCopyOrCopied] = useState('');
  const [open, setOpen] = useState(true);

  const abhaIDS = [
    { name: 'Aarushi Sharma', id: '91-6688-9900-5400', address: 'aarushi.sharma309@abdm.com' },
    // { name: 'Nidhi Sharma', id: '91-6688-9900-6890', address: 'nidhi.sharma190@abdm.com' },
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
    <Box p="40px 16px" border={'1px solid #EDEDF6'} borderRadius="3px" boxShadow={1}>
      <Collapse in={open}>
        <Alert
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }}
          action={
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon color="success" fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 5, borderRadius: '5px' }}
        >
          <Typography variant="subtitle2" sx={{ color: 'success.main' }}>
            Your ABHA Address is successfully generated.{' '}
          </Typography>
        </Alert>
      </Collapse>
      <Typography variant="h2">View Your ABHA Number </Typography>
      <Box textAlign="left" mt={1.5}>
        {abhaIDS.map((ids, index) => {
          return (
            <Box key={`${index}_${ids.id}`} mb={4}>
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
                        fill="#36B37E"
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
                        fill="#36B37E"
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
      {isError ? (
        <Typography display="block" component="span" mb={4} color="red">
          {' '}
          Please Select an ABHA ID
        </Typography>
      ) : (
        ''
      )}
      <Box mt={10} textAlign="right">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/profile')}
          // loading={isLoading}
        >
          {/* {t('Next')} */}
          {t('Go To My Profile')}
        </Button>
      </Box>
    </Box>
  );
}
export default ViewAbhaNumber;
