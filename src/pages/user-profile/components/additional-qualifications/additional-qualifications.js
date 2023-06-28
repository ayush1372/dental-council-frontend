import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { doctorTabs } from '../../../../helpers/components/sidebar-drawer-list-item';
import SuccessModalPopup from '../../../../shared/common-modals/success-modal-popup';
import { additionalQualificationsData } from '../../../../store/actions/doctor-user-profile-actions';
import { changeUserActiveTab } from '../../../../store/reducers/common-reducers';
import { Button } from '../../../../ui/core';
import successToast from '../../../../ui/core/toaster';
import EditQualificationDetails from '../editable-profile/edit-qualification-details';
import {
  getAdditionalCollegesList,
  getAdditionalUniversitiesList,
} from './additional-qualification-api';

const qualificationObjTemplate = [
  {
    qualification: undefined,
    country: '',
    state: '',
    college: '',
    university: '',
    month: '',
    year: '',
    files: '',
    qualificationfrom: '',
    Speciality: '',
    subSpeciality: '',
  },
];

const AdditionalQualifications = () => {
  const { registrationDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  const { qualification_detail_response_tos } = registrationDetails || {};

  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);
  const { degree_certificate } = qualification_detail_response_tos?.[0] || {};
  const [qualificationFilesData, setQualificationFilesData] = useState({
    'qualification.0.files': degree_certificate ? [{ file: degree_certificate }] : [],
  });

  const [successModalPopup, setSuccessModalPopup] = useState(false);

  const {
    statesList,
    coursesList,
    countriesList,
    specialitiesList,
    // collegesList
  } = useSelector((state) => state?.common);

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
    reset,
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

  const [colleges, setColleges] = useState([]);
  const [stateID, setStateID] = useState([]);
  const [collegeID, setCollegeID] = useState([]);
  const [universityData, setUniversityData] = useState([]);

  const handleQualificationFilesData = (fileName, files) => {
    //setQualificationFilesData(files);
    qualificationFilesData[fileName] = files;
    setQualificationFilesData({ ...qualificationFilesData });
  };

  const getStateData = (stateId) => {
    return statesList?.find((obj) => obj?.id === stateId);
  };

  const getCollegeData = (stateId) => {
    dispatch(getAdditionalCollegesList(stateId)).then((response) => {
      setColleges(response?.data);
    });
  };

  const getUniversityData = async (collegeId) => {
    await dispatch(getAdditionalUniversitiesList(collegeId)).then((response) => {
      setUniversityData(response?.data);
    });
  };
  const getCollege = (collegeId) => {
    const data = colleges?.find((obj) => obj?.id === collegeId);
    return data;
  };

  const getUniverity = async (univerityId) => {
    const data = await universityData?.find((obj) => obj?.id === univerityId);
    return data;
  };

  useEffect(() => {
    getCollegeData(stateID);
  }, [stateID]);

  useEffect(() => {
    getUniversityData(collegeID);
  }, [collegeID]);

  const broadSpeciality = (broadSpl) => {
    const specialityobject = specialitiesList?.data?.find((obj) => obj?.id === broadSpl);
    return specialityobject?.id;
  };

  const getCourseData = (course) => {
    return coursesList?.data?.find((obj) => obj.id === course);
  };

  // this below code is storing qualification details
  const { qualification } = getValues();

  useEffect(() => {
    setQualificationFilesData([]);
  }, []);

  const navigateToTrackApplication = () => {
    dispatch(changeUserActiveTab(doctorTabs[1].tabName));
  };

  const onSubmit = () => {
    const formData = new FormData();
    let qualification_detail_response_tos = [],
      updatedQualificationDetailsArray = [];

    qualification?.forEach((qualification) => {
      if (qualification?.qualificationfrom !== 'International') {
        setStateID(qualification?.state);
        setCollegeID(qualification?.college);
      }

      const isInternationalQualification = qualification?.qualificationfrom === 'International';
      const updatedQualificationDetails = {
        country: isInternationalQualification
          ? countriesList.find((obj) => obj.id === qualification?.country)
          : qualification?.country,
        state: isInternationalQualification
          ? { name: qualification?.state }
          : getStateData(qualification?.state),
        college: isInternationalQualification
          ? { name: qualification?.college }
          : getCollege(qualification?.college),
        university: isInternationalQualification
          ? { name: qualification?.university }
          : getUniverity(qualification?.university),
        course: getCourseData(qualification?.qualification),
        qualification_year: qualification?.year,
        qualification_month: qualification?.month,
        is_name_change: 0,
        is_verified: 0,
        request_id: '',
        broad_speciality_id: broadSpeciality(qualification?.Speciality),
        super_speciality_name: qualification?.subSpeciality,
        qualification_from:
          qualification?.qualificationfrom === '' ? 'India' : qualification?.qualificationfrom,
      };
      updatedQualificationDetailsArray.push(updatedQualificationDetails);
    });
    qualification_detail_response_tos = {
      qualification_detail_request_tos: updatedQualificationDetailsArray,
    };

    let filesArray = [];
    Object.values(qualificationFilesData)?.forEach((data) => {
      filesArray.push(data[0]?.file);
    });
    // const firstFile = Object.values(qualificationFilesData)?.[0]?.[0]?.file;
    // filesArray?.push(firstFile);

    const doctorRegistrationDetailsJson = JSON.stringify(qualification_detail_response_tos);
    const doctorRegistrationDetailsBlob = new Blob([doctorRegistrationDetailsJson], {
      type: 'application/json',
    });
    // const filesBlob = new Blob([filesArray]);

    formData.append('data', doctorRegistrationDetailsBlob);
    filesArray.forEach((file) => {
      formData.append('degreeCertificates', file);
    });

    dispatch(additionalQualificationsData(formData, personalDetails?.hp_profile_id))
      .then(() => {
        setSuccessModalPopup(true);
        reset();
      })
      .catch((error) => {
        successToast(
          'ERROR: ' + error?.data?.response?.data?.message,
          'auth-error',
          'error',
          'top-center'
        );
        update({
          qualification: [...qualificationObjTemplate],
        });
      });
  };

  const handleClose = () => {
    dispatch(changeUserActiveTab(doctorTabs[0].tabName));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
              showBroadSpeciality={true}
            />
          );
        })}
      </Box>

      <Box mt={2} display="flex" width="100%">
        <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button variant="contained" color="grey" sx={{ marginLeft: '20px' }} onClick={handleClose}>
          Cancel
        </Button>
        {qualification.length <= 6 && (
          <Button
            sx={{ ml: 'auto' }}
            variant="outlined"
            color="primary"
            onClick={() => {
              append({ ...qualificationObjTemplate });
              // dispatch(restateCollegeList());
              // dispatch(restateStateList());
              // dispatch(restateUniversityList());
            }}
          >
            Add Additional Qualification
          </Button>
        )}
      </Box>

      {successModalPopup && (
        <SuccessModalPopup
          open={successModalPopup}
          setOpen={() => setSuccessModalPopup(false)}
          text={
            'The additional qualification details has been sent for verification. You can check the verification status in the Track Status tab'
          }
          navigateToTrackApplication={navigateToTrackApplication}
        />
      )}
    </Box>
  );
};

export default AdditionalQualifications;
