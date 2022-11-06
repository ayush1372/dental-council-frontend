// import { useForm } from 'react-hook-form';
// import { verboseLog } from '../../../../config/debug';
// import { Button, TextField } from '../../../../ui/core';
import { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, InputAdornment, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Palette } from '../../../../theme/palette';
import { TextField } from '../../../../ui/core';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

const AbhaAddressTextFieldStyled = ({ start, isVerified = false }) => {
  return start ? (
    <InputAdornment>
      <MailOutlineIcon
        sx={{ m: '0 14px 0 0', fill: Palette.breadCrumbActiveColor.main }}
      ></MailOutlineIcon>
    </InputAdornment>
  ) : (
    <Box flexDirection="row" display="flex" alignItems="center">
      {isVerified ? (
        <CheckCircleIcon sx={{ m: '0 14px', fill: '#FFA334' }}></CheckCircleIcon>
      ) : (
        <CheckCircleIcon sx={{ m: '0 14px', fill: '#F0F0F0' }}></CheckCircleIcon>
      )}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="0px 5px 5px 0px"
        bgcolor="#E9ECF3"
        height={56}
        p="0 16px"
      >
        <Typography variant="body1" color="#3F3D56">
          abdm.com
        </Typography>
      </Box>
    </Box>
  );
};

export const ViewCreateAbhaNumber = ({ onNext }) => {
  const { t } = useTranslation();
  const [abhaAddress, setAbhaAddress] = useState('');
  const Suggestion = ['nihal', 'nihal12', 'nihal1998'];
  // const handleSubmit = () => {
  //   const submitAbhaAddress = abhaAddress.length > 2 && abhaAddress.concat('@abdm.com');
  //   // window.alert(val ? val : 'Please enter a Valid Address');
  //   verboseLog('value - ', submitAbhaAddress ? submitAbhaAddress : 'Please enter a Valid Address');
  //   // submitAbhaAddress.length > 2 && onNext();
  // };
  const handleSuggestion = (value) => {
    setAbhaAddress(value.toString());
  };
  return (
    <Box>
      <Typography variant="h2" mb={3}>
        {t('Create your unique ABHA Address')}
      </Typography>
      <Typography variant="body1">{t('Create your ABHA Address')}</Typography>
      <Box display="flex">
        <TextField
          id="create_view_abhaNumber"
          name="abhaAddress"
          placeholder={'ABHA Address'}
          value={abhaAddress}
          onChange={(e) => {
            setAbhaAddress(e.target.value.length < 1 ? '' : e.target.value);
            // verboseLog('Abha Address -> ', abhaAddress);
          }}
          InputProps={{
            startAdornment: <AbhaAddressTextFieldStyled start />,
            endAdornment: <AbhaAddressTextFieldStyled isVerified={abhaAddress.length > 2} />,
          }}
          sx={{
            display: 'block',
            '& .MuiOutlinedInput-root': {
              paddingRight: 0,
            },
          }}
          messageBlue={abhaAddress.length < 1}
          helperMsg={abhaAddress.length < 1 && 'You can use letters, numbers & symbols'}
        />
        {/* {abhaAddress.length > 2 && (
          <Button
            variant="outlined"
            sx={{ marginLeft: '32px' }}
            color="secondary"
            onClick={handleSubmit}
          >
            {t('Submit')}
          </Button>
        )} */}
      </Box>
      {abhaAddress.length > 0 && (
        <Typography display="flex" alignItems="center" color="primary.main">
          <InfoOutlinedIcon sx={{ fontSize: '12px' }} mr={1}></InfoOutlinedIcon>
          <Typography m="0 4px" width="fit-content" variant="body4">
            {`Suggestion: `}
          </Typography>
          {Suggestion.map((item, index) => {
            return index < Suggestion.length - 1 ? (
              <Typography
                key={`suggestion_${index}_${item}`}
                variant="body4"
                width="fit-content"
                pr={0.3}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSuggestion(item)}
              >{`${item},`}</Typography>
            ) : (
              <Typography
                key={`suggestion_${index}_${item}`}
                variant="body4"
                width="fit-content"
                pr={0.3}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleSuggestion(item)}
              >{`${item}`}</Typography>
            );
          })}
        </Typography>
      )}
      <ButtonGroupWizard handleNext={onNext} labelNext={t('Next')} />
    </Box>
  );
};
