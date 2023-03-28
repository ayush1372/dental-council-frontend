import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getRaiseQueryData } from '../../store/reducers/raise-query-reducer';
import { TextField } from '../../ui/core';

const RaiseQueryPopup = ({ ClosePopup, queryRaisedField }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const { queryRaisedFor } = useSelector((state) => state?.raiseQuery?.raiseQueryData);

  const handleClose = () => {
    setOpen(false);
    ClosePopup();
  };

  const {
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
    register,
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    queryRaisedFor?.map((fieldData) => {
      if (fieldData?.filedName === queryRaisedField) {
        setValue('raiseQuery', fieldData?.value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleSave = () => {
    let queryRaisedResponse = [
      {
        filedName: queryRaisedField,
        value: getValues()?.raiseQuery,
      },
    ];
    queryRaisedFor?.map((fieldData, index) => {
      if (fieldData?.filedName === queryRaisedField) {
        queryRaisedResponse[index] = {
          filedName: queryRaisedField,
          value: getValues()?.raiseQuery,
        };
      } else {
        queryRaisedResponse?.push(fieldData);
      }
    });

    dispatch(getRaiseQueryData({ queryRaisedFor: queryRaisedResponse }));
    handleClose();
  };

  return (
    <Box>
      <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
        <Container
          maxWidth="sm"
          sx={{ backgroundColor: 'white.main', borderRadius: '10px', height: '544px' }}
        >
          <Box py={3}>
            <Box display="flex" justifyContent="flex-end">
              <CloseIcon color="grey.context" onClick={handleClose} />
            </Box>
            <Box mb={1} width="100%" textAlign="center">
              <HelpIcon fontSize="width48" color="warning" />
            </Box>
            <Typography
              variant="h2"
              mt="18px"
              sx={{
                color: 'textPrimary',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Raise a Query for the Field - {queryRaisedField}
            </Typography>
            <Box>
              <Box>
                <Typography variant="body1" color="inputTextColor.main" component="span">
                  Details of Query
                </Typography>
                <Typography component="span" color="error.main">
                  *
                </Typography>
              </Box>
              <TextField
                name={'raiseQuery'}
                multiline
                rows={4}
                fullWidth
                error={errors.raiseQuery?.message}
                {...register('raiseQuery', {})}
                placeholder="Write a reason here . . ."
              />
            </Box>
            <Box display="flex" textAlign="right">
              <Typography color="inputFocusColor.main">150 words only</Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={16}>
              <Button
                onClose={handleClose}
                variant="contained"
                color="grey"
                sx={{
                  mr: 1,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={handleSubmit(onHandleSave)}>
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Modal>
    </Box>
  );
};

export default RaiseQueryPopup;
