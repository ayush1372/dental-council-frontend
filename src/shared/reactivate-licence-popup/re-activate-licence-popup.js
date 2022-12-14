import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import ReactivationLogo from '../../../src/assets/images/reactivate-license-icon.png';
import { TextField } from '../../ui/core';

export default function ReactivateLicencePopup(props) {
  const [open, setOpen] = useState(true);
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handleClose = () => {
    setOpen(false);
    props.renderSuccess();
  };
  function handleReactivate() {
    handleClose();
    props.renderSuccess();
  }
  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15, height: '561px' }}>
      <Container
        maxWidth="sm"
        sx={{ backgroundColor: 'white.main', borderRadius: '10px', height: '544px' }}
      >
        <Box py={3}>
          <Box mt={1} p={1} mb={2} width="100%" display="flex">
            <img
              src={ReactivationLogo}
              alt="Reactivation licence logo"
              width="30px"
              height="30px"
            />
            <Typography variant="h2" color="primary" ml={3} data-testid="popup-input-text">
              Reactivate Licence
            </Typography>
            <CloseIcon color="grey.context" onClick={handleClose} />
          </Box>
          <Box mb={4}>
            <Typography variant="subtitle2" color="inputTextColor.main" component="span">
              Re-activate from
            </Typography>
            <Typography component="span" color="error.main">
              *
            </Typography>

            <TextField
              fullWidth
              data-testid="fromDate"
              id="fromDate"
              type="date"
              name="fromDate"
              sx={{
                height: '48px',
                input: {
                  color: 'grey1.dark',
                  textTransform: 'uppercase',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              required={true}
              defaultValue={getValues().fromDate}
              error={errors.fromDate?.message}
              {...register('fromDate', {
                required: 'This field is required',
              })}
            />
          </Box>

          <Box>
            <Box>
              <Typography
                data-testid="fieldname_reason"
                variant="subtitle2"
                color="inputTextColor.main"
                component="span"
              >
                Reason
              </Typography>
              <Typography component="span" color="error.main">
                *
              </Typography>
            </Box>
            <TextField
              data-testid="Reason"
              multiline
              rows={4}
              fullWidth
              placeholder="Write a reason here . . ."
            />
          </Box>
          <Box display="flex" textAlign="right">
            <Typography color="inputFocusColor.main">150 words only</Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={5}>
            <Button
              onClick={() => handleClose()}
              variant="contained"
              color="grey"
              sx={{
                mr: 1,
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ ml: 2 }}
              onClick={() => {
                handleReactivate();
              }}
              variant="contained"
              color="secondary"
            >
              Reactivate
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
