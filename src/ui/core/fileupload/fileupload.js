import { useState } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import moment from 'moment';

import { Button } from '../button/button.js';

import styles from './fileupload.module.scss';

export const UploadFile = (props) => {
  const {
    showBrowse,
    uploadFiles,
    label,
    fileData,
    setFileData,
    sizeAllowed,
    fileTypes,
    fileMessage,
  } = props;
  const [uploadPercentage, setUploadPercentage] = useState('');
  // const [fileData, setFileData] = useState([]);
  const [browsedFileData, setBrowsedFileData] = useState();
  const [browsedFileName, setBrowsedFileName] = useState();
  const [uploadFileError, setUploadFileError] = useState('');
  const [uploadStatus, setUploadStatus] = useState();

  // let uploadPercentage = useSelector((state) => state.uploadDocument.uploadDocumentState);
  const addFile = (e) => {
    setBrowsedFileData(e);
    setBrowsedFileName(e.target.files[0].name);
  };

  //To add the file in the file array
  const handleChange = (e) => {
    setUploadFileError('');
    setFileData(fileData);
    e.preventDefault();
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
      <InputLabel id="demo-simple-select-label">
        <Typography color="text.primary"> {label}</Typography>{' '}
      </InputLabel>
      <div className={styles.inputDiv}>
        <div className={styles.fileUploadArea}>
          <div>
            <UploadFileIcon color="primary" />
          </div>
          <div>
            <span className={styles.dragDropFiles}>Drag and drop files,or </span>
            <span className={styles.browseFiles}>Browse</span>
          </div>
          <div className={styles.dragDropFiles}>{fileMessage}</div>
          <input
            type="file"
            id="file"
            onChange={(e) => handleChange(e)}
            name="file"
            accept={fileTypes}
          />
        </div>
        {uploadFileError !== '' && <div className={styles.fileError}> {uploadFileError}</div>}
        {showBrowse && (
          <div className={styles.browseFileArea}>
            <label className={styles.modalLabelHeading}>Browse Files</label>
            <div className={styles.browseFileContainer}>
              <input
                type="file"
                id="file"
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
            <Typography color="#a9a9a9" variant="caption">
              UPLOADED
            </Typography>
          )}
          {uploadFiles === 'multiple' && fileData.length > 0 && (
            <Typography color="#a9a9a9">{`${fileData.length} FILES UPLOADED`}</Typography>
          )}
          <table>
            {fileData.map((file) => {
              return (
                <tr key={file.id}>
                  <td key={file.id}>
                    <div className={styles.fileDetailsContainer}>
                      <UploadFileIcon color="primary" fontSize="large" />
                      <div className={styles.fileDetailsArea}>
                        <Typography color="string">{file.fileName}</Typography>
                        {uploadStatus === 'successful' ? (
                          <div className={styles.timeInfo}>
                            {moment(file.timeInfo).format('DD MMMM, YYYY')} at{' '}
                            {moment(file.timeInfo).format('HH:mm A')}
                          </div>
                        ) : uploadStatus === 'failed' ? (
                          <Typography color="#ff0000" variant="body2">
                            Upload Failed
                          </Typography>
                        ) : (
                          <Typography color="#ff0000" variant="body2">
                            Uploading
                          </Typography>
                        )}
                      </div>
                      {uploadStatus === 'successful' ? (
                        <div className={styles.actionArea}>
                          {' '}
                          <DeleteOutlineIcon color="error" />{' '}
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
                              <CircularProgress variant="determinate" value={uploadPercentage} />
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
      </div>
    </>
  );
};
export default UploadFile;
