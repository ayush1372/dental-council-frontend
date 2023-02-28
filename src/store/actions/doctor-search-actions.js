import { API } from '../../api/api-endpoints';
import { GET } from '../../constants/requests';
import { useAxiosCall } from '../../hooks/use-axios';
import { searchDoctor, searchDoctorById } from '../reducers/doctor-search-reducer';

export const searchDoctorDetails = (searchdetails) => async (dispatch) => {
  let path = '';
  if (
    searchdetails.fullName !== undefined &&
    searchdetails.fullName !== null &&
    searchdetails.fullName !== ''
  ) {
    if (path === '') {
      path += 'fullName=' + searchdetails.fullName;
    } else {
      path += '&fullName=' + searchdetails.fullName;
    }
  }
  if (
    searchdetails.registrationNumber !== undefined &&
    searchdetails.registrationNumber !== null &&
    searchdetails.registrationNumber !== ''
  ) {
    if (path === '') {
      path += 'registrationNumber=' + searchdetails.registrationNumber;
    } else {
      path += '&registrationNumber=' + searchdetails.registrationNumber;
    }
  }
  if (
    searchdetails.registrationYear !== undefined &&
    searchdetails.registrationYear !== null &&
    searchdetails.registrationYear !== ''
  ) {
    if (path === '') {
      path += 'registrationYear=' + searchdetails.registrationYear;
    } else {
      path += '&registrationYear=' + searchdetails.registrationYear;
    }
  }
  if (
    searchdetails.stateMedicalCouncilId !== undefined &&
    searchdetails.stateMedicalCouncilId !== null &&
    searchdetails.stateMedicalCouncilId !== ''
  ) {
    if (path === '') {
      path += 'stateMedicalCouncilId=' + searchdetails.stateMedicalCouncilId;
    } else {
      path += '&stateMedicalCouncilId=' + searchdetails.stateMedicalCouncilId;
    }
  }
  if (
    searchdetails.profileStatusId !== undefined &&
    searchdetails.profileStatusId !== null &&
    searchdetails.profileStatusId !== ''
  ) {
    if (path === '') {
      path += 'profileStatusId=' + searchdetails.profileStatusId;
    } else {
      path += '&profileStatusId=' + searchdetails.profileStatusId;
    }
  }
  if (
    searchdetails.page !== undefined &&
    searchdetails.page !== null &&
    searchdetails.page !== ''
  ) {
    path += '&page=' + searchdetails.page;
  }
  if (
    searchdetails.size !== undefined &&
    searchdetails.size !== null &&
    searchdetails.size !== ''
  ) {
    path += '&size=' + searchdetails.size;
  }

  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: `${API.searchDoctor.searchDoctorDetails}?${path}`,
    })
      .then((response) => {
        dispatch(searchDoctor(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const searchDoctorDetailsById = (id) => async (dispatch) => {
  return await new Promise((resolve, reject) => {
    useAxiosCall({
      method: GET,
      url: API.searchDoctor.searchDoctorById.replace('{healthProfessionalId}', id),
    })
      .then((response) => {
        dispatch(searchDoctorById(response));
        return resolve(response);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};
