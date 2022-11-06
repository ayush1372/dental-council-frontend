import { useState } from 'react';

import VerifiedIcon from '@mui/icons-material/Verified';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Container,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import ABHA from '../../../../../assets/images/carbon_manage-protection.svg';
import { UploadFile } from '../../../../../ui/core';

import styles from './relation-proof.module.scss';

export function RelationProof(props) {
  const {
    fileData,
    setFileData,
    selectedRelation,
    setSelectedRelation,
    setSelectedMember,
    selectedMember,
  } = props;
  const [expanded, setExpanded] = useState([]);
  const [change, setChange] = useState(true);
  const handleRadio = (val) => {
    setExpanded([]);
    setFileData([]);
    setSelectedRelation();
    setSelectedMember(val.id);
  };
  const { t } = useTranslation();

  const abhaIDS = [
    {
      name: 'Aarushi Sharma',
      id: '91-6688-9900-5400',
      address: 'aarushi.sharma309@abdm.com',
      isVerified: false,
    },
    {
      name: 'Nidhi Sharma',
      id: '91-6688-9900-6890',
      address: 'nidhi.sharma190@abdm.com',
      isVerified: true,
    },
  ];
  const handleExpandClick = (id) => {
    setChange(!change);
    if (selectedMember === id) {
      setExpanded([id]);
    }
  };
  const handleCollapseClick = () => {
    setChange(!change);
    const array = [];
    setExpanded(array);
  };
  const handleChangeRelation = (e) => {
    setSelectedRelation(e.target.value);
  };
  return (
    <Container
      maxWidth="md"
      data-testid="registerpage"
      sx={{
        marginTop: '20px',
        paddingTop: '15px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
      className={styles.userRelation}
    >
      {abhaIDS.map((abha) => {
        return (
          <Card
            variant="outlined"
            sx={{ width: 420, padding: 0, borderRadius: 0 }}
            key={abha.index}
            data-testid="relation-card"
          >
            <CardContent>
              <div className={styles.cardContainer}>
                <img className={styles.logoImage} src={ABHA} alt="NHA logo" />
                <Box sx={{ width: '100%', marginLeft: '35px' }}>
                  <div className={styles.nameContainer}>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      className={styles.userName}
                      data-testid="abhaName"
                    >
                      {abha.name}{' '}
                      <VerifiedIcon
                        color={abha.isVerified ? 'success' : 'disabled'}
                        sx={{ fontSize: '1rem' }}
                      />
                    </Typography>
                    <Radio
                      checked={selectedMember === abha.id}
                      onChange={() => handleRadio(abha)}
                      value={abha.id}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'choose member' }}
                    />
                  </div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={styles.abhaHeading}
                    data-testid="abhaNumber"
                  >
                    {t('abha_number')}
                  </Typography>
                  <Typography variant="body1" color="primary" className={styles.abhaValue}>
                    {abha.id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className={styles.abhaHeading}
                    data-testid="abhaAddress"
                  >
                    {t('abha_address')}
                  </Typography>
                  <Typography variant="body1" color="primary" className={styles.abhaValue}>
                    {abha.address}
                  </Typography>
                </Box>
              </div>
            </CardContent>
            <CardActions>
              {!expanded.includes(abha.id) ? (
                <div
                  onClick={() => handleExpandClick(abha.id)}
                  className={
                    abha.id === selectedMember
                      ? styles.addRelationToggle
                      : styles.addRelationToggleTrue
                  }
                >
                  <Typography variant="body2" color="error">
                    + {t('add_proof_of_relationship')}
                  </Typography>
                </div>
              ) : (
                <div
                  onClick={() => handleCollapseClick(abha.id)}
                  className={styles.addRelationToggleFalse}
                >
                  <Typography variant="body2" color="error">
                    - {t('add_proof_of_relationship')}
                  </Typography>
                </div>
              )}
            </CardActions>
            <Collapse
              in={expanded.includes(abha.id)}
              timeout="auto"
              unmountOnExit
              sx={{ padding: '15px' }}
            >
              <CardContent>
                <InputLabel id="demo-simple-select-label">
                  <Typography color="text.primary">
                    {' '}
                    {t('select_the_nature_of_relationship')}
                  </Typography>{' '}
                  <Typography color="error"> *</Typography>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRelation}
                  onChange={handleChangeRelation}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value={'mother'}>Mother</MenuItem>
                  <MenuItem value={'father'}>Father</MenuItem>
                  <MenuItem value={'grandfather'}>Grand Father</MenuItem>
                  <MenuItem value={'grandmother'}>Grand Mother</MenuItem>
                </Select>
                <Box marginTop={'15px'}>
                  <UploadFile
                    uploadFiles="single"
                    fileData={fileData}
                    setFileData={setFileData}
                    sizeAllowed={1}
                    fileTypes={['image/jpg', 'image/jpeg', 'image/png']}
                    fileMessage={'JPEG, PNG, GIF file types are supported'}
                    label={
                      <>
                        <Typography color="text.primary">
                          {t('upload_proof_of_relationship')}
                        </Typography>
                        <Typography color="error"> *</Typography>
                      </>
                    }
                  />
                </Box>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </Container>
  );
}
