/* eslint-disable no-console */
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
  const [supportingDocumentError, setsupportingDocumentError] = useState([]);
  console.log('errormsg1', supportingDocumentError);
  const { qualification_detail_response_tos } = registrationDetails || {};

  const { personalDetails } = useSelector((state) => state?.doctorUserProfileReducer);

  const [qualificationFilesData, setQualificationFilesData] = useState([]);

  const [successModalPopup, setSuccessModalPopup] = useState(false);

  const { statesList, coursesList, countriesList, specialitiesList } = useSelector(
    (state) => state?.common
  );

  const dispatch = useDispatch();
  const {
    formState: { errors, isSubmitting },
    formState,
    getValues,
    handleSubmit,
    register,
    unregister,
    setValue,
    control,
    clearErrors,
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      qualification: [...qualificationObjTemplate],
    },
  });

  const { fields, update, append, remove, replace, insert } = useFieldArray({
    control,
    name: 'qualification',
  });
  console.log('formState123456', formState);

  const [colleges, setColleges] = useState([]);
  const [stateID, setStateID] = useState([]);
  const [collegeID, setCollegeID] = useState([]);
  const [universityData, setUniversityData] = useState([]);

  const handleQualificationFilesData = (fileName, files) => {
    console.log('filename12', fileName, files);
    qualificationFilesData[fileName] = files;
    setQualificationFilesData(files !== [] && { ...qualificationFilesData });
    // setsupportingDocumentError({ ...supportingDocumentError });
    console.log('Fname11', fileName.length);
  };
  useEffect(() => {
    let checkDocumentError;
    if (isSubmitting) {
      for (const index in qualificationFilesData) {
        checkDocumentError = qualificationFilesData[index]?.length > 0;
        if (!checkDocumentError) {
          supportingDocumentError[index] = true;
          setsupportingDocumentError({ ...supportingDocumentError });
        }
      }
    }
  }, [qualificationFilesData, isSubmitting]);

  useEffect(() => {
    let index = fields?.length - 1;
    qualificationFilesData[`qualification.${[index]}.files`] = [];
    setQualificationFilesData({ ...qualificationFilesData });
    supportingDocumentError[`qualification.${[index]}.files`] = false;
    setsupportingDocumentError({ ...supportingDocumentError });
    console.log('qualf12345', fields, qualificationFilesData, supportingDocumentError);
  }, [fields]);

  const getStateData = (stateId) => {
    return statesList?.find((obj) => obj?.id === stateId);
  };

  const getCollegeData = (stateId) => {
    // dispatch(getAdditionalCollegesList(stateId)).then((response) => {
    //   setColleges(response?.data);
    // });
    if (stateId !== undefined) {
      dispatch(getAdditionalCollegesList(stateId)).then((response) => {
        setColleges(response?.data);
      });
    }
  };

  const getUniversityData = (collegeId) => {
    if (collegeId !== undefined) {
      dispatch(getAdditionalUniversitiesList(collegeId)).then((response) => {
        setUniversityData(response?.data);
      });
    }
  };
  const getCollege = (collegeId) => {
    const data = colleges?.find((obj) => obj?.id === collegeId);
    return data;
  };

  const getUniverity = (univerityId) => {
    const data = universityData?.find((obj) => obj?.id === univerityId);
    return data;
  };

  useEffect(() => {
    // getCollegeData(stateID);
    if (stateID !== undefined) {
      getCollegeData(stateID);
    }
  }, [stateID]);

  useEffect(() => {
    // getUniversityData(collegeID);
    if (collegeID !== undefined) {
      getUniversityData(collegeID);
    }
  }, [collegeID]);

  const broadSpeciality = (broadSpl) => {
    const specialityobject = specialitiesList?.data?.find((obj) => obj?.id === broadSpl);
    return specialityobject?.id;
  };

  const getCourseData = (course) => {
    return coursesList?.data?.find((obj) => obj.id === course);
  };

  const { qualification } = getValues();
  const navigateToTrackApplication = () => {
    dispatch(changeUserActiveTab(doctorTabs[1].tabName));
  };

  const onSubmit = () => {
    alert('Hiii');
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

    const doctorRegistrationDetailsJson = JSON.stringify(qualification_detail_response_tos);
    console.log('submittingform12', doctorRegistrationDetailsJson);

    const doctorRegistrationDetailsBlob = new Blob([doctorRegistrationDetailsJson], {
      type: 'application/json',
    });
    formData.append('data', doctorRegistrationDetailsBlob);
    filesArray.forEach((file) => {
      formData.append('degreeCertificates', file);
    });
    console.log('supportingDocumentError12', supportingDocumentError);

    let setdocumenterror;
    for (const index in qualificationFilesData) {
      setdocumenterror = qualificationFilesData[index]?.length > 0;
      if (!setdocumenterror) {
        supportingDocumentError[index] = true;
        setsupportingDocumentError({ ...supportingDocumentError });
      } else {
        supportingDocumentError[index] = false;
        setsupportingDocumentError({ ...supportingDocumentError });
      }
    }

    let checkDocumentError;
    for (const index in supportingDocumentError) {
      checkDocumentError = supportingDocumentError[index] === true;
      console.log('1234567', checkDocumentError, supportingDocumentError[index]);
      if (checkDocumentError) {
        break;
      }
    }

    if (!checkDocumentError) {
      console.log('reached here');
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
    }
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
              clearErrors={clearErrors}
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
              replace={replace}
              control={control}
              append={append}
              insert={insert}
              showBroadSpeciality={true}
              supportingDocumentError={supportingDocumentError}
              setsupportingDocumentError={(val) => {
                setsupportingDocumentError(val);
              }}
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
        {qualification_detail_response_tos?.length + qualification?.length < 8 && (
          <Button
            sx={{ ml: 'auto' }}
            variant="outlined"
            color="primary"
            onClick={() => {
              append({ ...qualificationObjTemplate });
              // setAddmore(true);
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
            'The additional qualification details has been sent for verification. You can check the verification status in the Track Application tab.'
          }
          navigateToTrackApplication={navigateToTrackApplication}
        />
      )}
    </Box>
  );
};

export default AdditionalQualifications;
