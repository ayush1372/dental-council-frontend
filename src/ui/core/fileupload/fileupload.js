/* eslint-disable quotes */
import { useEffect, useState } from 'react';

// import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { AiOutlineEye } from 'react-icons/ai';

// import { base64ToBlob } from '../../../helpers/functions/common-functions';
import AttachmentViewPopup from '../../../shared/query-modal-popup/attachement-view-popup';
import { SvgImageComponent } from '../../../ui/core/svg-icons';
import { Button } from '../button/button.js';

import styles from './fileupload.module.scss';

export const UploadFile = (props) => {
  const {
    fileID,
    showBrowse,
    uploadFiles,
    fileData,
    setFileData,
    sizeAllowed,
    fileTypes,
    fileMessage,
    isDigiLockcerVisible = false,
    uploadFileLabel,
    name = 'file',
    fileName,
  } = props;
  const [uploadPercentage, setUploadPercentage] = useState('');
  // const [fileData, setFileData] = useState([]);
  const [browsedFileData, setBrowsedFileData] = useState();
  const [browsedFileName, setBrowsedFileName] = useState();
  const [uploadFileError, setUploadFileError] = useState('');
  const [uploadStatus, setUploadStatus] = useState();
  const [attachmentViewProfile, setAttachmentViewProfile] = useState(false);
  const [attachedFileData, setAttachedFileData] = useState('');
  const [browsedFileDataBase64, setBrowsedFileDataBase64] = useState('');
  const [viewFileType, setViewFileType] = useState('');

  // let uploadPercentage = useSelector((state) => state.uploadDocument.uploadDocumentState);
  const addFile = (e) => {
    setBrowsedFileData(e);
    setBrowsedFileName(e.target.files[0].name);
  };

  const CloseAttachmentPopup = () => {
    setAttachmentViewProfile(false);
    // setAttachedFileData('');
    // setBrowsedFileDataBase64('');
    // setViewFileType('');
  };

  useEffect(() => {
    // return () => {
    setAttachmentViewProfile(false);
    setAttachedFileData('');
    setBrowsedFileDataBase64('');
    setViewFileType('');
    // }
  }, []);

  const fileToBase64 = async (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file?.file);
    reader.onload = function () {
      const base64String = reader?.result?.split(',')?.pop();
      setBrowsedFileDataBase64(base64String);
    };
  };

  const viewAttachemnent = (file) => {
    if (typeof file?.file !== 'string') {
      const viewFileType = file?.fileName?.split('.')?.pop();
      setViewFileType(viewFileType);
      fileToBase64(file);
      setAttachedFileData(browsedFileDataBase64);
      setAttachmentViewProfile(true);
    } else {
      const viewFileType = fileName?.split('.')?.pop();
      setViewFileType(viewFileType);
      setAttachedFileData(file?.file);
      setAttachmentViewProfile(true);
    }
  };

  //To add the file in the file array
  const handleChange = (e) => {
    setUploadFileError('');
    setFileData(fileData);
    e?.preventDefault();
    setBrowsedFileData(e);
    setBrowsedFileName();
    try {
      const fileSizeError = e.target.files[0].size > sizeAllowed * 1024 * 1024;
      const fileErrorExtension = !fileTypes.includes(e.target.files[0].type);
      const uploadFileError = fileSizeError || fileErrorExtension;
      if (uploadFileError) {
        setUploadFileError(`File must be less than ${sizeAllowed}MB; ${fileMessage}`);
      } else {
        // setIsDisable(true);

        /*TODO api call to upload the api
        setUploadPercentage(1);
        const formData = new FormData();
        formData.append('files', e.target.files[0]);
        const uploadResponse = { id: 0 };
        dispatch(uploadDocumentAction(formData));
        setUploadFile(uploadResponse[0].id);
        setIsDisable(false);
        setUploadPercentage(100);
        setTimeout(() => {
          setUploadPercentage(0);
        }, 1000);*/

        // TODO- harcoded value for upload status and percentage
        setUploadStatus('successful');
        setUploadPercentage(30);
        const fileDetails = {
          id: fileData.length + 1,
          fileName: e.target.files[0].name,
          size: e.target.files[0].size / 1024,
          timeInfo: new Date(),
          file: e.target.files[0],
        };
        if (uploadFiles === 'single') {
          setFileData([fileDetails]);
        } else {
          fileData.push(fileDetails);
          setFileData(fileData);
        }
      }
    } catch (e) {
      // setUploadPercentage(0);
    }
  };

  return (
    <>
      <Box>
        {!isDigiLockcerVisible && (
          <Typography color="inputTextColor.main" fontWeight="500" component="div">
            {uploadFileLabel} <Typography color="error"> *</Typography>
          </Typography>
        )}

        {isDigiLockcerVisible && (
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Typography
              color="inputTextColor.main"
              fontWeight="500"
              component="div"
              flexBasis={{ xs: '100%', sm: 0 }}
              flexGrow="1"
            >
              {uploadFileLabel}
              <Typography component="span" color="error">
                *
              </Typography>
            </Typography>
            <Box
              component="div"
              color="primary.main"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              {/* <ControlPointIcon fontSize="18px" sx={{ marginRight: '5px' }} />
              <Typography variant="body1">Pull from Digilocker</Typography> */}
            </Box>
          </Box>
        )}
      </Box>
      <div className={styles.inputDiv}>
        <Grid container mt={1} spacing={1} sx={{ alignItems: 'flex-start' }}>
          <Grid item sm={6}>
            <div className={styles.fileUploadArea}>
              <div>
                <UploadFileIcon color="primary" />
              </div>
              <div>
                <span className={styles.browseFiles}>Drag and drop files,or </span>
                <span className={styles.browseFiles}>browse</span>
              </div>
              <div className={styles.dragDropFiles}>{fileMessage}</div>
              <input
                type="file"
                id={fileID}
                data-testid={fileID}
                onChange={(e) => handleChange(e)}
                name={name}
                accept={fileTypes}
              />
            </div>
          </Grid>

          <Grid item sm={6}>
            {showBrowse && (
              <div>
                <label className={styles.modalLabelHeading}>Browse Files</label>
                <div className={styles.browseFileContainer}>
                  <input
                    type="file"
                    id={fileID}
                    data-testid={fileID}
                    onChange={(e) => addFile(e)}
                    name="file"
                    accept="image/gif, image/jpeg, image/jpg, .pdf, .doc, .docx"
                  />
                  <div className={styles.browseArea}>
                    {browsedFileName ? browsedFileName : 'Browse your file or add the file URL'}
                  </div>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleChange(browsedFileData)}
                    startIcon={<UploadFileIcon className={styles.uploadIconWhite} />}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            )}
            <div className={styles.uploadFileArea}>
              {uploadFiles === 'single' && fileData.length === 1 && (
                <Typography color="grey1.main" variant="caption">
                  01 FILE UPLOADED
                </Typography>
              )}
              {uploadFiles === 'multiple' && fileData?.length > 0 && (
                <Typography color="grey1.main">{`${fileData?.length} FILES UPLOADED`}</Typography>
              )}
              <table>
                {fileData?.map((file) => {
                  return (
                    <tr key={file?.id}>
                      <td key={file?.id}>
                        <div className={styles.fileDetailsContainer}>
                          <UploadFileIcon color="primary" fontSize="large" />
                          <div className={styles.fileDetailsArea}>
                            <Typography color="inputTextColor.main">
                              {file.fileName || fileName}
                            </Typography>
                            {fileData.length === 1 || uploadStatus === 'successful' ? (
                              <div className={styles.timeInfo}>
                                {moment(file.timeInfo).format('DD MMMM, YYYY')} at{' '}
                                {moment(file.timeInfo).format('HH:mm A')}
                              </div>
                            ) : uploadStatus === 'failed' ? (
                              <Typography color="error.main" variant="body2">
                                Upload Failed
                              </Typography>
                            ) : (
                              <Typography color="error.main" variant="body2">
                                Uploading
                              </Typography>
                            )}
                          </div>
                          {fileData?.length === 1 || uploadStatus === 'successful' ? (
                            <div className={styles.actionArea}>
                              <DeleteOutlineIcon
                                id={fileID}
                                color="error"
                                size={20}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (e?.target?.attributes?.id?.value === 'qualification') {
                                    document.getElementById('qualification').value = '';
                                    if (
                                      document
                                        ?.getElementsByClassName(
                                          'fileupload_fileUploadArea__shK1w'
                                        )[1]
                                        ?.getElementsByTagName('input') !== undefined
                                    ) {
                                      document
                                        .getElementsByClassName(
                                          'fileupload_fileUploadArea__shK1w'
                                        )[1]
                                        .getElementsByTagName('input').file.value = '';
                                    }
                                  } else {
                                    if (document.getElementsByTagName('input') !== undefined) {
                                      document.getElementsByTagName('input').file.value = '';
                                    }
                                  }
                                  setFileData([]);
                                }}
                              />
                              {(file?.file || file?.fileBlob) && (
                                <AiOutlineEye
                                  fill="#264488"
                                  size={20}
                                  onClick={() => viewAttachemnent(file)}
                                  mr={1}
                                />
                              )}
                            </div>
                          ) : uploadStatus === 'failed' ? (
                            <div className={styles.actionArea}>
                              <span className={styles.tryAgainIcon}>
                                <ReplayIcon color="primary" />
                              </span>
                              <Typography color="#1919a2">try again</Typography>
                            </div>
                          ) : (
                            uploadPercentage > 0 && (
                              <div className={styles.actionArea}>
                                <Box
                                  sx={{
                                    position: 'relative',
                                    display: 'inline-flex',
                                  }}
                                >
                                  <CircularProgress
                                    variant="determinate"
                                    value={uploadPercentage}
                                  />
                                  <Box
                                    sx={{
                                      top: 0,
                                      left: 0,
                                      bottom: 0,
                                      right: 0,
                                      heigh: '30px',
                                      weigth: '30px',
                                      position: 'absolute',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      component="div"
                                      color="text.secondary"
                                    >
                                      {`${uploadPercentage}%`}
                                    </Typography>
                                  </Box>
                                </Box>
                              </div>
                            )
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </Grid>
          {uploadFileError !== '' && (
            <Box>
              <div className={styles.fileError} style={{ display: 'flex', alignItems: 'center' }}>
                <SvgImageComponent icon="error" height="14px" width="16px"></SvgImageComponent>
                <Typography
                  style={{ display: 'flex', alignItems: 'center' }}
                  variant="body2"
                  color="error"
                  margin="4px"
                >
                  {uploadFileError}
                </Typography>
              </div>
            </Box>
          )}
        </Grid>
      </div>
      {attachmentViewProfile && (
        <AttachmentViewPopup
          certificate={attachedFileData}
          closePopup={CloseAttachmentPopup}
          alt={'Uploaded File'}
          certFileType={viewFileType}
        />
      )}
    </>
  );
};
export default UploadFile;
