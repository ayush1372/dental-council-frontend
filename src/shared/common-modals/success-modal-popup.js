import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { Box, Container, Modal, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { getCardCount } from '../../store/actions/dashboard-actions';
import { Button } from '../../ui/core';

export default function SuccessModalPopup({ open, setOpen, text, handleClose, SuspensionCall }) {
  const handleCloseModal = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleCloseModalALL = () => {
    setOpen(false);
    handleClose();
    if (SuspensionCall) {
      dispatch(getCardCount());
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 15 }}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: theme.palette.white.main,
          borderRadius: '10px',
          height: '350px',
          p: '30px',
        }}
      >
        <Box mb={1} display="flex" justifyContent="center">
          <TaskAltOutlinedIcon
            sx={{
              color: theme.palette.success.dark,
              width: '80px',
              height: '80px',
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography
            data-testid="popup-input-success-text"
            variant="h2"
            color="success.dark"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            SUCCESS!
          </Typography>
          <Typography
            display="flex"
            alignItems="center"
            textAlign="center"
            mt={2}
            // ml={10}
            data-testid="popup-input-text"
            component="div"
            flexDirection="column"
          >
            {text}
          </Typography>
          <Button
            sx={{ width: { xs: '100%', sm: '408px' }, mt: 5 }}
            variant="contained"
            color="warning"
            onClick={handleClose ? handleCloseModalALL : handleCloseModal}
          >
            Ok
          </Button>
        </Box>
      </Container>
    </Modal>
  );
}
