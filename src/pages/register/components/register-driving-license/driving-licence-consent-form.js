import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Checkbox } from '../../../../ui/core';
import ButtonGroupWizard from '../../../../ui/core/wizard/button-group-wizard';

export function RegisterConsent({ onNext }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.consentCheckbox) {
      onNext();
    }
  };

  const handlePrevious = () => {
    navigate(`/register`);
  };

  return (
    <Box
      sx={{
        p: 2,
        mt: 1,
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="caption">
          <Typography variant="h6">
            <b>{t('create_abha_number_using_driving_licence')}</b>
          </Typography>
          <Box>{t('declaration_driving_license_text')}</Box>
          <Box>{t('declaration_driving_license_text_bottom')}</Box>
        </Typography>
      </Box>
      <Checkbox
        name={'consentCheckbox'}
        {...register('consentCheckbox', {
          required: 'Consent is required',
        })}
        label={'I agree'}
        error={errors.consentCheckbox?.message}
      />
      <ButtonGroupWizard
        handleNext={handleSubmit(onSubmit)}
        handlePrevious={handlePrevious}
        labelNext={t('Next')}
        labelPrevioius={t('Back')}
      />
    </Box>
  );
}

export default RegisterConsent;
