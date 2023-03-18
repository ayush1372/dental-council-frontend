import { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Container, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createUniqueHprId } from '../../../store/actions/doctor-registration-actions';
import { Button } from '../../../ui/core';

const UniqueUserNameForDoctorRegistration = () => {
  const [suggestion, setSuggestion] = useState('');
  const dispatch = useDispatch();
  const aadhaarTxnId = useSelector((state) => state?.AadhaarTransactionId?.aadharData?.data?.txnId);
  const firstSuggestion = useSelector(
    (state) => state?.doctorRegistration?.hprIdSuggestionsDetailsData?.data
  );
  const theme = useTheme();
  const navigate = useNavigate();
  const getInputValue = () => {
    return getValues().UniqueUserNameForDoctor === '' ? '' : firstSuggestion;
  };
  const {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      UniqueUserNameForDoctor: '',
    },
  });
  const handleSuggestion = (item) => {
    setSuggestion(item);
  };
  const handleCancel = () => {
    window.location.reload();
  };
  const onSubmit = () => {
    let data = {
      email: null,
      txnId: aadhaarTxnId,
      // hprId: `${getValues().UniqueUserNameForDoctor}@hpr.abdm`,
      hprId: suggestion,
    };
    dispatch(createUniqueHprId(data)).then(() => {
      reset();
      navigate(`/reset-password`);
    });
  };

  const handleSuggestionName = (e) => {
    setSuggestion(e.target.value);
  };

  return (
    <Box>
      <Box my={9}>
        <Container
          sx={{
            boxShadow: '1',
            pt: 4,
            width: {
              xs: '100%',
              sm: '712px',
            },
          }}
        >
          <Box>
            <Box pt={2} pb={4}>
              <Typography variant="h2" color="textPrimary.main">
                Create Username
              </Typography>
            </Box>

            <Box pb={1}>
              <Typography variant="body3" color="textSecondary.main">
                Create Username
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  name="UniqueUserName"
                  defaultValue={getInputValue()}
                  error={suggestion ? '' : errors.UniqueUserNameForDoctor?.message}
                  {...register(
                    'UniqueUserNameForDoctor',
                    suggestion
                      ? ''
                      : {
                          required: 'UniqueUserNameForDoctor Number is required',
                        }
                  )}
                  value={suggestion ? suggestion : getValues().UniqueUserNameForDoctor}
                  onChange={(e) => handleSuggestionName(e)}
                  clearErrors={clearErrors}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
              <InfoOutlinedIcon sx={{ fontSize: '15px', mr: '2px' }} />
              <Typography variant="body3" color="primary" component={'div'}>
                You can use letters, numbers & symbols. Minimum length of the username should be 8
                character.
              </Typography>
            </Box>

            <Box pt={2} pb={4}>
              <Typography>Suggestions: </Typography>
              {firstSuggestion
                ? firstSuggestion.map((item, index) => {
                    return index < 6 ? (
                      index + 1 === 5 ? (
                        <Link
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleSuggestion(item)}
                          color="secondary.main"
                          fontSize="14px"
                        >
                          {`${item}`}
                        </Link>
                      ) : (
                        <Link
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleSuggestion(item)}
                          color="secondary.main"
                          fontSize="14px"
                        >
                          {`${item}, ` + ' '}
                        </Link>
                      )
                    ) : (
                      ''
                    );
                  })
                : ''}
            </Box>

            <Box display="flex" pb={6}>
              <Button
                disabled={suggestion.length > 4 ? false : true}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="medium"
                sx={{
                  mr: 3,
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                Continue to set password
              </Button>
              <Button variant="contained" color="grey" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UniqueUserNameForDoctorRegistration;
