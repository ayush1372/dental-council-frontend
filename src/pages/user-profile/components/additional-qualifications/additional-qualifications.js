/* eslint-disable no-console */
import { useState } from 'react';

// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { additionalQualificationsData } from '../../../../store/actions/doctor-user-profile-actions';
import { Button } from '../../../../ui/core';
import EditQualificationDetails from '../editable-profile/edit-qualification-details';

const qualificationObjTemplate = [
  {
    qualification: '',
    country: '',
    state: '',
    college: '',
    university: '',
    month: '',
    year: '',
    nameindegree: '',
    files: '',
    qualificationfrom: '',
  },
];

const AdditionalQualifications = () => {
  // const [data, setData] = useState({});
  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  const { qualification_detail_response_tos } = registrationDetails || {};

  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { degree_certificate } = qualification_detail_response_tos?.[0] || {};

  const [qualificationFilesData, setQualificationFilesData] = useState(
    degree_certificate ? [{ file: degree_certificate }] : []
  );

  const dispatch = useDispatch();
  // const [qualificationFilesData, setQualificationFilesData] = useState([]);
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    unregister,
    setValue,
    control,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      qualification: [...qualificationObjTemplate],
    },
  });

  const { fields, update, append, remove } = useFieldArray({
    control,
    name: 'qualification',
  });

  const handleQualificationFilesData = (fileName, files) => {
    qualificationFilesData[fileName] = files;
    setQualificationFilesData([{ ...qualificationFilesData }]);
    console.log('files data1', ...qualificationFilesData);
  };
  console.log('files data1', ...qualificationFilesData);
  // this below code is storing qualification details
  const { qualification } = getValues();
  const formData = new FormData();
  const onSubmit = () => {
    const doctorRegistrationDetailsJson = JSON.stringify(qualification);
    console.log('doctorRegistrationDetailsJson', doctorRegistrationDetailsJson);
    const doctorRegistrationDetailsBlob = new Blob([doctorRegistrationDetailsJson], {
      type: 'application/json',
    });
    formData.append('data', doctorRegistrationDetailsBlob);
    formData.append('degreeCertificate', qualificationFilesData[0].file);
    console.log('file data', qualificationFilesData[0].file);

    console.log('CLICKED', personalDetails?.hp_profile_id, formData);
    // setData(formData);
    dispatch(additionalQualificationsData(formData, personalDetails?.hp_profile_id));
    console.log('123', qualification, 'files data', qualificationFilesData);
  };
  console.log('clicked1', formData);
  return (
    <Box p={3}>
      <Box>
        {/* <Typography variant="h3" color="textPrimary.main">
          Additional Qualifications
        </Typography> */}
        {/* <Typography variant="body4" color="messageBlue.main" display="flex" alignItems="center">
          <InfoOutlinedIcon fontSize="18px" />
          User can add up to 7 qualification degrees
        </Typography> */}
      </Box>
      <Box mt={1}>
        {fields?.map((qualification, index) => {
          const showDeleteIcon = index > 0;
          return (
            <EditQualificationDetails
              key={qualification.id}
              index={index}
              showDeleteIcon={showDeleteIcon}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              fields={fields}
              watch={watch}
              register={register}
              unregister={unregister}
              qualificationFilesData={qualificationFilesData}
              handleQualificationFilesData={handleQualificationFilesData}
              update={update}
              remove={remove}
            />
          );
        })}
      </Box>

      <Box mt={2} display="flex" width="100%">
        <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button variant="contained" color="grey" sx={{ marginLeft: '20px' }}>
          Cancel
        </Button>
        <Button
          sx={{ ml: 'auto' }}
          variant="outlined"
          color="primary"
          onClick={() => {
            append({ ...qualificationObjTemplate });
          }}
        >
          Add Additional Qualification
        </Button>
      </Box>
    </Box>
  );
};

export default AdditionalQualifications;
