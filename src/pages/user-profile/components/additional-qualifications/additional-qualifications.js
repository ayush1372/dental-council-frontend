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
  // eslint-disable-next-line no-unused-vars
  const { statesList, collegesList, universitiesList, coursesList } = useSelector(
    (state) => state?.common
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

  const handleQualificationFilesData = (files) => {
    setQualificationFilesData(files);
  };

  const getStateData = (State) => {
    let stateData = [];
    statesList?.map((elementData) => {
      if (elementData.id === State) {
        stateData.push(elementData);
      }
    });
    return stateData[0];
  };
  const getCollegeData = (college) => {
    let collegeData = [];
    Array.isArray(collegesList?.data) &&
      collegesList?.data?.map((elementData) => {
        if (elementData.id === college) {
          collegeData.push({
            id: elementData?.id,
            name: elementData?.name,
          });
        }
      });
    return collegeData[0];
  };

  const getUniversityData = (university) => {
    let universityData = [];
    Array.isArray(universitiesList?.data) &&
      universitiesList?.data?.map((elementData) => {
        if (elementData.id === university) {
          universityData.push({
            id: elementData?.id,
            name: elementData?.name,
            nationality: '',
          });
        }
      });
    return universityData[0];
  };
  const getCourseData = (course) => {
    let courseData = [];
    Array.isArray(coursesList?.data) &&
      coursesList?.data?.map((elementData) => {
        if (elementData.id === course) {
          courseData.push({
            course_name: elementData?.name,
            id: elementData?.id,
          });
        }
      });
    return courseData[0];
  };

  // this below code is storing qualification details
  const { qualification } = getValues();
  const onSubmit = () => {
    const formData = new FormData();
    let qualification_detail_response_tos = [],
      test = [];
    let updatedQualificationDetails = {
      country: qualification[0]?.country,
      state: getStateData(qualification[0]?.state),
      college: getCollegeData(qualification[0]?.college),
      university: getUniversityData(qualification[0]?.university),
      course: getCourseData(qualification[0]?.qualification),
      qualification_year: qualification[0]?.year,
      qualification_month: qualification[0]?.month,
      is_name_change: 0,
      is_verified: 0,
      request_id: '',
      qualification_from: qualification[0]?.qualificationfrom,
    };
    test.push(updatedQualificationDetails);
    qualification_detail_response_tos = {
      qualification_detail_request_tos: test,
    };

    const doctorRegistrationDetailsJson = JSON.stringify(qualification_detail_response_tos);
    const doctorRegistrationDetailsBlob = new Blob([doctorRegistrationDetailsJson], {
      type: 'application/json',
    });
    formData.append('data', doctorRegistrationDetailsBlob);
    formData.append('degreeCertificates', qualificationFilesData[0]?.file);

    dispatch(additionalQualificationsData(formData, personalDetails?.hp_profile_id));
  };

  return (
    <Box p={3}>
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
              qualification={qualification}
              qualificationFilesData={qualificationFilesData}
              handleQualificationFilesData={handleQualificationFilesData}
              isAdditionalQualification={true}
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
