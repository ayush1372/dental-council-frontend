import { Box, TextField, Typography } from '@mui/material';

import { validateAadharNumber } from '../../../constants/common-data';
import { SvgImageComponent } from '../../../ui/core/svg-icons';

export const FIELD = 'field';
export const FIRST_FIELD_NAME = `${FIELD}_1`;
export const SECOND_FIELD_NAME = `${FIELD}_2`;
export const THIRD_FIELD_NAME = `${FIELD}_3`;

export const AadhaarInputField = (props) => {
  const { register, errors, getValues } = props;

  const inputFocus = (fieldIndex) => {
    const nextField = document.querySelector(`input[name=field_${fieldIndex}]`);
    if (nextField) nextField.focus();
  };

  const onHandleAadhaarChange = (e) => {
    const { maxLength, value, name } = e.target;
    const [, fieldIndex] = name.split('_');
    const fieldIntIndex = parseInt(fieldIndex, 10);

    if (value.length >= maxLength) {
      if (fieldIntIndex < 3) inputFocus(fieldIntIndex + 1);
    } else {
      if (value.length === 0 && fieldIntIndex >= 0 && fieldIntIndex <= 3) {
        inputFocus(fieldIntIndex - 1);
      }
    }
  };

  const renderError = () => {
    if (errors[FIRST_FIELD_NAME] || errors[SECOND_FIELD_NAME] || errors[THIRD_FIELD_NAME]) {
      return (
        <Typography
          style={{ display: 'flex', alignItems: 'center' }}
          variant="body2"
          color="error"
          {...register('aadhar number', {
            required: 'Provide a valid aadhaar number',
            pattern: {
              value: /^[0-9]{4}$/,
              message: 'Provide a valid aadhaar number',
            },
          })}
        >
          <SvgImageComponent color={'error'} icon={'error'} height={'16px'} />
        </Typography>
      );
    } else if (
      (getValues().field_1 + getValues().field_2 + getValues().field_3).length === 12 &&
      !validateAadharNumber(getValues().field_1 + getValues().field_2 + getValues().field_3)
    ) {
      return (
        <Typography style={{ display: 'flex', alignItems: 'center' }} variant="body2" color="error">
          <SvgImageComponent color={'error'} icon={'error'} height={'16px'} />
          {'Aadhaar number is not valid'}
        </Typography>
      );
    }
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Box component={'div'}>
          <Typography variant="subtitle2" component={'span'}>
            {'Enter your Aadhaar number'}
          </Typography>
          <Typography variant="body2" color="error">
            {' *'}
          </Typography>
        </Box>
        <Box gap="10px" display="flex" width="335px">
          <TextField
            name={FIRST_FIELD_NAME}
            error={
              Boolean(errors[FIRST_FIELD_NAME]?.message) ||
              Boolean(
                (getValues().field_1 + getValues().field_2 + getValues().field_3).length === 12 &&
                  !validateAadharNumber(
                    getValues().field_1 + getValues().field_2 + getValues().field_3
                  )
              )
            }
            placeholder="0000"
            variant="outlined"
            inputProps={{ maxLength: 4 }}
            sx={{
              textAlign: 'center',
              width: 'fit-content',
              height: '56px',
              '.MuiOutlinedInput-root': {
                width: { xs: '70px', sm: '99px' },
                '& input': {
                  textAlign: 'center',
                },
              },
            }}
            {...register(FIRST_FIELD_NAME, {
              required: 'required',
              pattern: {
                value: /^[0-9]{4}$/,
                message: 'Provide a valid aadhaar number',
              },
              onChange: (e) => onHandleAadhaarChange(e),
            })}
          />{' '}
          <Box component="span" display="flex" alignItems="center" justifyContent="center">
            -
          </Box>
          <TextField
            name={SECOND_FIELD_NAME}
            error={
              Boolean(errors[SECOND_FIELD_NAME]?.message) ||
              Boolean(
                (getValues().field_1 + getValues().field_2 + getValues().field_3).length === 12 &&
                  !validateAadharNumber(
                    getValues().field_1 + getValues().field_2 + getValues().field_3
                  )
              )
            }
            placeholder="0000"
            variant="outlined"
            inputProps={{ maxLength: 4 }}
            sx={{
              textAlign: 'center',
              width: 'fit-content',
              height: '56px',
              '.MuiOutlinedInput-root': {
                width: { xs: '70px', sm: '99px' },
                '& input': {
                  textAlign: 'center',
                },
              },
            }}
            {...register(SECOND_FIELD_NAME, {
              required: 'required',
              pattern: {
                value: /^[0-9]{4}$/,
                message: 'Provide a valid aadhaar number',
              },
              onChange: (e) => onHandleAadhaarChange(e),
            })}
          />
          <Box component="span" display="flex" alignItems="center" justifyContent="center">
            -
          </Box>
          <TextField
            error={
              Boolean(errors[THIRD_FIELD_NAME]?.message) ||
              Boolean(
                (getValues().field_1 + getValues().field_2 + getValues().field_3).length === 12 &&
                  !validateAadharNumber(
                    getValues().field_1 + getValues().field_2 + getValues().field_3
                  )
              )
            }
            name={THIRD_FIELD_NAME}
            placeholder="0000"
            variant="outlined"
            inputProps={{ maxLength: 4 }}
            sx={{
              textAlign: 'center',
              width: 'fit-content',
              height: '56px',
              '.MuiOutlinedInput-root': {
                width: { xs: '70px', sm: '99px' },
                '& input': {
                  textAlign: 'center',
                },
              },
            }}
            {...register(THIRD_FIELD_NAME, {
              required: 'required',
              pattern: {
                value: /^[0-9]{4}$/,
                message: 'Provide a valid aadhaar number',
              },
              onChange: (e) => onHandleAadhaarChange(e),
            })}
          />
        </Box>
        {renderError()}
      </Box>
    </Box>
  );
};

export default AadhaarInputField;
