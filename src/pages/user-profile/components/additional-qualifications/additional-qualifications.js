/* eslint-disable no-console */
import { useEffect, useState } from 'react';

// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import { additionalQualificationsData } from '../../../../store/actions/doctor-user-profile-actions';
import { Button } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';
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
  const [successModalPopup, setSuccessModalPopup] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { statesList, collegesList, universitiesList, coursesList } = useSelector(
    (state) => state?.common
  );
  const { specialitiesList } = useSelector((state) => state?.common);

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
  const broadSpeciality = (broadSpl) => {
    let broadSpecialityData = [];
    Array.isArray(specialitiesList?.data) &&
      specialitiesList?.data?.map((elementData) => {
        if (elementData.id === broadSpl) {
          broadSpecialityData.push(elementData?.id);
        }
      });
    return broadSpecialityData[0];
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
  const isInternational = qualification?.[0]?.qualificationfrom === 'International';

  const onSubmit = () => {
    console.log('CLICKED');
    const formData = new FormData();
    let qualification_detail_response_tos = [],
      updatedQualificationDetailsArray = [];
    let updatedQualificationDetails;
    qualification?.forEach((qualification) => {
      updatedQualificationDetails = {
        country: qualification?.country,
        state: isInternational
          ? { name: qualification?.state }
          : getStateData(qualification?.state),
        college: isInternational
          ? { name: qualification?.college }
          : getCollegeData(qualification?.college),
        university: isInternational
          ? { name: qualification?.university }
          : getUniversityData(qualification?.university),
        course: getCourseData(qualification?.qualification),
        qualification_year: qualification?.year,
        qualification_month: qualification?.month,
        is_name_change: 0,
        is_verified: 0,
        request_id: '',
        broad_speciality_id: broadSpeciality(qualification?.id),
        super_speciality_name: '',
        qualification_from: qualification?.qualificationfrom,
      };
      updatedQualificationDetailsArray.push(updatedQualificationDetails);
    });
    qualification_detail_response_tos = {
      qualification_detail_request_tos: updatedQualificationDetailsArray,
    };

    const doctorRegistrationDetailsJson = JSON.stringify(qualification_detail_response_tos);
    const doctorRegistrationDetailsBlob = new Blob([doctorRegistrationDetailsJson], {
      type: 'application/json',
    });
    formData.append('data', doctorRegistrationDetailsBlob);
    formData.append('degreeCertificates', qualificationFilesData[0]?.file);

    dispatch(additionalQualificationsData(formData, personalDetails?.hp_profile_id))
      .then(() => {
        setSuccessModalPopup(true);
      })
      .catch((error) => {
        successToast(
          'ERROR: ' + error?.data?.response?.data?.message,
          'auth-error',
          'error',
          'top-center'
        );
      });
  };

  useEffect(() => {
    setQualificationFilesData([]);
  }, []);

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

      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={'Added Qualification Successfully!'}
        />
      )}
    </Box>
  );
};

export default AdditionalQualifications;
