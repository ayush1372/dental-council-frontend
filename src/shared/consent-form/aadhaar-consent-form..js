import { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {
  Box,
  // Container,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSpeechSynthesis } from 'react-speech-kit';

import { verboseLog } from '../../config/debug';
import { Button } from '../../ui/core';
import { Checkbox } from '../../ui/core/form/check-box/check-box';
// import ButtonGroupWizard from '../../ui/core/wizard/button-group-wizard';
import CaptchaComponent from '../captcha-component/captcha-component';
export function AadhaarConsentForm({ onNext, onStepChange }) {
  const { t } = useTranslation();

  const [speechvalue, setSpeechValue] = useState(t('declaration_aadhaar_text').toString());
  const [textSpeech, setTextSpeech] = useState(false);
  const { speak } = useSpeechSynthesis();
  const textToSpeech = () => {
    if (textSpeech) {
      setSpeechValue('');
      speak({ text: '' });
      setTextSpeech(false);
    }
    speak({ text: speechvalue });
    setTextSpeech(true);
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      AadhaarNumber: '',
    },
  });
  const onSubmit = (data) => {
    try {
      let req = { mobile: data.AadhaarNumber };
      if (req) {
        verboseLog('usersListData', req);
        onStepChange();
      }
    } catch (err) {
      verboseLog('usersListData', err);
    }

    if (data.consentCheckbox) {
      onNext();
    }
  };

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box data-testid="register-aadhaar">
      <Box bgcolor={'background.default'} p={4} mt={2} borderRadius={2} color={'#766d85'}>
        {' '}
        <Typography variant="caption" color="#8c898">
          <Box mb={8}>
            <Box>
              <Typography variant="body1" htmlFor="standard-adornment-password">
                <b>{t('Aadhaar_Number')}</b>
              </Typography>
            </Box>
            <Box width={1}>
              <FormControl sx={{ m: '10px 0px', width: 1 }} variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  name={'AadhaarNumber'}
                  placeholder={t('Aadhaar_Number')}
                  defaultValue={getValues().AadhaarNumber}
                  error={errors.AadhaarNumber?.message}
                  {...register('AadhaarNumber', {
                    required: {
                      value: true,
                      message: 'Aadhaar Number is not valid',
                    },
                    pattern: {
                      value: /^(\d{12})$/i,
                      message: 'Aadhaar Number is not valid',
                    },
                    onChange: () => {
                      handleChange('password');
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography variant="body2" color="error">
                  {errors.AadhaarNumber?.message}
                </Typography>
              </FormControl>
            </Box>
            <Box
              mt={2}
              p={3}
              textAlign={'justify'}
              maxHeight={180}
              overflow={'auto'}
              border={'1px solid'}
              borderColor={'#f3f2f9'}
              value={speechvalue}
              onChange={(event) => setSpeechValue(event.target.value)}
            >
              <Box m="10px 0">
                <Typography color="#4b4a4a">
                  <b>{t('Terms & Conditions')}</b>
                </Typography>
              </Box>
              <Typography color="#9c95a7" variant="caption">
                {t('declaration_aadhaar_text')}
              </Typography>
            </Box>
            <Box sx={{ float: 'right', padding: '10px 10px' }}>
              {textSpeech ? (
                <IconButton onClick={textToSpeech}>
                  <VolumeUpIcon />
                </IconButton>
              ) : (
                <IconButton onClick={textToSpeech}>
                  <VolumeOffIcon />
                </IconButton>
              )}
            </Box>
            <Box p={1} border={'1px solid'} borderColor={'#f3f2f9'}>
              <Checkbox
                name={'consentCheckbox'}
                {...register('consentCheckbox', {
                  required: 'Consent is required',
                })}
                label={'I agree'}
                error={errors.consentCheckbox?.message}
              />
            </Box>
            <CaptchaComponent />
          </Box>
        </Typography>
        <Button onClick={handleSubmit(onSubmit)} color="secondary" variant="contained">
          {t('Start')}
        </Button>
      </Box>
    </Box>
  );
}

export default AadhaarConsentForm;
