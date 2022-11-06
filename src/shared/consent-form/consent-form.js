import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox, TextField } from '../../ui/core';
import ButtonGroupWizard from '../../ui/core/wizard/button-group-wizard';
import CaptchaComponent from '../captcha-component/captcha-component';

// import styles from './login-recovery.module.scss';

export function ConsentForm({
  title,
  textFieldName,
  placeholder,
  body,
  checkboxName,
  checkboxValidation,
  checkboxLabel,
  textFieldValidation,
  onClick,
}) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      [textFieldName]: '',
    },
  });

  const onSubmit = () => {
    onClick(getValues());
  };

  return (
    <Box>
      <Box>
        <Typography variant="caption">
          <Box>
            <Box>
              <Typography variant="h6">
                <b>{t(title)}</b>
              </Typography>
            </Box>
            <Box sx={{ width: '1' }}>
              <TextField
                fullWidth
                data-testid={'consent-textfield-testid'}
                name={textFieldName}
                placeholder={t(placeholder)}
                defaultValue={getValues().textFieldName}
                error={errors[textFieldName]?.message}
                {...register(textFieldName, textFieldValidation)}
              />
            </Box>
            <Box mt={2} sx={{ textAlign: 'justify' }}>
              {t(body)}
            </Box>
          </Box>
          <Checkbox
            name={checkboxName}
            dataTestid={'consent-checkbox-testid'}
            {...register(checkboxName, checkboxValidation)}
            label={checkboxLabel}
            error={errors[checkboxName]?.message}
          />
        </Typography>
        <CaptchaComponent />
      </Box>
      <ButtonGroupWizard
        dataTestidNext={'btn-test-next'}
        handleNext={handleSubmit(onSubmit)}
        // loading={isLoading}
        labelNext={t('Next')}
      />
    </Box>
  );
}

export default ConsentForm;
