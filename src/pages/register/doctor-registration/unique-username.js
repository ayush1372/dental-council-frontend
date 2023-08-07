import { useState } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Container, TextField, Tooltip, Typography } from '@mui/material';
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
    return getValues().UniqueUserNameForDoctor === ''
      ? ''
      : firstSuggestion !== '' || firstSuggestion !== undefined
      ? firstSuggestion
      : getValues().UniqueUserNameForDoctor;
  };
  const {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    //formState: {},
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
      notifyUser: false,
    };
    dispatch(createUniqueHprId(data)).then(() => {
      navigate(`/reset-password`);
    });
  };

  const handleSuggestionName = (e) => {
    setSuggestion(e.target.value);
  };

  return (
    <Box>
      <Box my={3}>
        <Container
          sx={{
            boxShadow: '1',
            width: {
              xs: '100%',
              sm: '712px',
            },
          }}
        >
          <Box>
            <Box pt={2} pb={2}>
              <Typography variant="h2" color="textPrimary.main">
                Create Username
              </Typography>
              <Typography variant="body1" fontWeight="400">
                Username will be used to login into Council. Please choose from suggestions below or
                create your own username.
              </Typography>
            </Box>

            <Box pb={1}>
              <Typography variant="body3" color="textSecondary.main">
                Username
                <Typography component="span" color="error.main">
                  *
                </Typography>
                <Tooltip
                  title={<Box>You can use letters, numbers & symbols.</Box>}
                  placement="right"
                  arrow
                >
                  <InfoOutlinedIcon sx={{ fontSize: '15px', mr: '2px' }} />
                </Tooltip>
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  name="UniqueUserName"
                  defaultValue={getInputValue()}
                  // error={suggestion ? '' : errors.UniqueUserNameForDoctor?.message}
                  {...register(
                    'UniqueUserNameForDoctor'
                    // suggestion
                    //   ? ''
                    //   : {
                    //       required: 'UniqueUserNameForDoctor Number is required',
                    //       minLength: {
                    //         value: 8,
                    //         message: 'Username should be of minimum 8 characters',
                    //       },
                    //     }
                  )}
                  value={suggestion}
                  onChange={(e) => handleSuggestionName(e)}
                  clearErrors={clearErrors}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
            ></Box>

            <Box pt={1} pb={4}>
              <Typography>Suggestions: </Typography>
              {firstSuggestion
                ? firstSuggestion.map((item, index) => {
                    return index < 6 ? (
                      index + 1 === 5 ? (
                        <Link
                          sx={{ cursor: 'pointer', textDecoration: 'none' }}
                          onClick={() => handleSuggestion(item)}
                          color="primary.main"
                          fontSize="14px"
                        >
                          {`${item}`}
                        </Link>
                      ) : (
                        <Link
                          sx={{ cursor: 'pointer', textDecoration: 'none' }}
                          onClick={() => handleSuggestion(item)}
                          color="primary.main"
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
                color="secondary"
                size="medium"
                sx={{
                  mr: 3,
                  backgroundColor: theme.palette.secondary.main,
                }}
              >
                Create Username
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
