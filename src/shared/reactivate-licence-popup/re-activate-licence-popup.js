import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Grid, Modal, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import ReactivationLogo from '../../../src/assets/images/reactivate-license-icon.png';
import { createReActivateLicense } from '../../store/actions/common-actions';
import { Button, DatePicker, TextField } from '../../ui/core';
import UploadFile from '../../ui/core/fileupload/fileupload';
import successToast from '../../ui/core/toaster';
export default function ReactivateLicencePopup(props) {
  const [open, setOpen] = useState(true);
  const [showFromDateError, setShowFromDateError] = useState(false);
  const [showReasonError, setShowReasonError] = useState(false);
  const [reActivateFileData, setReActivateFileData] = useState([]);
  const [supportingDocumentError, setsupportingDocumentError] = useState(false);

  const { loginData } = useSelector((state) => state?.loginReducer);
  const dispatch = useDispatch();

  const { register, getValues, setValue } = useForm({
    mode: 'onChange',
  });

  const handleClose = () => {
    setOpen(false);
    props.closeReactivateLicense();
  };
  useEffect(() => {
    if (reActivateFileData?.length > 0 || reActivateFileData === []) {
      setsupportingDocumentError(false);
    }
  }, [reActivateFileData]);

  function handleReactivate() {
    const { fromDate, reason } = getValues();

    let reActivateLicensebody = props?.suspensionCall
      ? {
          hp_profile_id: props?.profileID,
          application_type_id: 5,
          action_id: 1,
          from_date: fromDate?.split('/')?.reverse()?.join('-'),
          remarks: reason,
        }
      : {
          hp_profile_id: loginData?.data?.profile_id,
          application_type_id: 5,
          action_id: 1,
          from_date: fromDate?.split('/')?.reverse()?.join('-'),
          remarks: reason,
        };
    const formData = new FormData();
    const reactivateLicaneseDetailsJson = JSON.stringify(reActivateLicensebody);
    const reactivateLicaneseDetailsBlob = new Blob([reactivateLicaneseDetailsJson], {
      type: 'application/json',
    });
    formData.append('data', reactivateLicaneseDetailsBlob);
    formData.append('reactivationFile', reActivateFileData?.[0].file);

    if (reason !== '' && fromDate !== undefined)
      dispatch(createReActivateLicense(formData))
        .then((response) => {
          if (response?.data?.toString()?.length > 0) {
            props.renderSuccess();
          }
        })
        .catch((error) => {
          props?.closeReactivateLicense();
          successToast(error?.data?.response?.data?.message, 'auth-error', 'error', 'top-center');
        });
  }

  return (
    <Modal open={open} onClose={handleClose} sx={{ mt: 5, maxHeight: '100vh', overflow: 'auto' }}>
      <Container maxWidth="sm" sx={{ backgroundColor: 'white.main', borderRadius: '10px' }}>
        <Box py={3}>
          <Box p={1} mb={2} width="100%" display="flex">
            <img
              src={ReactivationLogo}
              alt="Reactivation licence logo"
              width="30px"
              height="30px"
            />
            <Typography variant="h2" color="primary" ml={3} data-testid="popup-input-text">
              Reactivate License
            </Typography>
            <CloseIcon color="grey.context" onClick={handleClose} />
          </Box>
          <Grid container item spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography variant="subtitle2" color="inputTextColor.main" component="span">
                  Re-activate from
                </Typography>
                <Typography component="span" color="error.main">
                  *
                </Typography>

                <DatePicker
                  onChangeDate={(newDateValue) => {
                    setValue('fromDate', new Date(newDateValue)?.toLocaleDateString('en-GB'));
                    setShowFromDateError(false);
                  }}
                  data-testid="fromDate"
                  id="fromDate"
                  name="fromDate"
                  sx={{
                    height: '48px',
                    input: {
                      color: 'black',
                      textTransform: 'uppercase',
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required={true}
                  minDate={new Date()}
                  error={showFromDateError ? 'Enter Re-activate from' : false}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Box>
                  <Typography
                    data-testid="fieldName_reason"
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
                  rows={1}
                  fullWidth
                  name="reason"
                  placeholder="Add a reason..."
                  required={true}
                  defaultValue={getValues().reason}
                  error={showReasonError ? 'Enter Re-activate reason' : false}
                  {...register('reason', {
                    required: 'This field is required',
                    onChange: (event) => {
                      if (event.target.value) {
                        setShowReasonError(false);
                      }
                    },
                  })}
                />
              </Box>
            </Grid>
          </Grid>

          <Box display="flex" textAlign="right">
            <Typography color="grey1.main">150 words only</Typography>
          </Box>
          <Box>
            <UploadFile
              fileID={'registrationFileData'}
              uploadFiles="single"
              sizeAllowed={5}
              fileTypes={['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']}
              fileMessage={`PDF, PNG,JPG,JPEG file types are supported.
               Maximum size allowed for the attachment is 5MB.`}
              fileData={reActivateFileData}
              setFileData={setReActivateFileData}
              uploadFileLabel="Upload the Supporting Document"
              borderColor={supportingDocumentError}
            />
            {supportingDocumentError && (
              <Typography
                color="suspendAlert.dark"
                component="div"
                display="inline-flex"
                variant="body2"
              >
                Please upload the supporting Document.
              </Typography>
            )}
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2}>
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
              onClick={() => {
                const { fromDate, reason } = getValues();

                if (fromDate === undefined) {
                  setShowFromDateError(true);
                }
                if (reason === undefined || reason === '') {
                  setShowReasonError(true);
                }
                if (
                  reActivateFileData?.length === 0 ||
                  reActivateFileData?.[0].file === undefined
                ) {
                  setsupportingDocumentError(true);
                }
                if (
                  reason !== undefined &&
                  fromDate !== undefined &&
                  reActivateFileData?.length !== 0
                ) {
                  handleReactivate();
                }
              }}
              ml={2}
              color="secondary"
              variant="contained"
              sx={{
                margin: {
                  xs: '5px 0',
                  md: '0',
                },
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
            >
              Reactivate
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
