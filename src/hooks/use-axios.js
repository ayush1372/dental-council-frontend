import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
});

const appheader = { 'Content-Type': 'application/json' };

export const useAxiosCall = (type, path, object, header) => async () => {
  const method = type;
  const url = path || '';
  const body = object ? (type === 'DELETE' ? { data: object } : object) : {};
  const headers = header ? Object.assign(header, appheader) : appheader;

  const payload = {
    url,
    method,
    body,
    headers,
  };

  let [resData, resLoading, resError] = [null, Boolean(true), null];

  await axios(payload)
    .then((response) => {
      resData = response.data;
      resLoading = false;
    })
    .catch((error) => {
      resError = error;
      resLoading = false;
    });

  return {
    data: resData,
    isLoading: resLoading,
    isError: resError,
  };
};

export const useMultiAxiosCall = (requestArray) => async () => {
  const responseArray = await Promise.all(
    requestArray.map(async ([type, path, object, header]) => {
      const method = type;
      const url = path || '';
      const body = object ? (type === 'DELETE' ? { data: object } : object) : {};
      const headers = header ? Object.assign(header, appheader) : appheader;

      const payload = {
        url,
        method,
        body,
        headers,
      };

      let [resData, resLoading, resError] = [null, Boolean(true), null];

      await axios(payload)
        .then((response) => {
          resData = response.data;
          resLoading = false;
        })
        .catch((error) => {
          resError = error;
          resLoading = false;
        });

      return {
        data: resData,
        isLoading: resLoading,
        isError: resError,
      };
    })
  );

  return responseArray;
};

// export const useGetAxios = (path, body) => async () => {
//   let [resData, resLoading, resError] = [null, Boolean(true), null];

//   await axios
//     .get(path, body)
//     .then((response) => {
//       resData = response.data;
//       resLoading = false;
//       verboseLog('axios-response', response.data);
//     })
//     .catch((error) => {
//       resError = error;
//       resLoading = false;
//       verboseLog('axios-error', error);
//     });

//   return {
//     data: resData,
//     isLoading: resLoading,
//     isError: resError,
//   };
// };
// export const usePostAxios = (path, body) => async () => {
//   let [resData, resLoading, resError] = [null, Boolean(true), null];

//   await axios
//     .post(path, body)
//     .then((response) => {
//       resData = response.data;
//       resLoading = false;
//       verboseLog('axios-response', response.data);
//     })
//     .catch((error) => {
//       resError = error;
//       resLoading = false;
//       verboseLog('axios-error', error);
//     });

//   return {
//     data: resData,
//     isLoading: resLoading,
//     isError: resError,
//   };
// };
// export const usePutAxios = (path, body) => async () => {
//   let [resData, resLoading, resError] = [null, Boolean(true), null];

//   await axios
//     .put(path, body)
//     .then((response) => {
//       resData = response.data;
//       resLoading = false;
//       verboseLog('axios-response', response.data);
//     })
//     .catch((error) => {
//       resError = error;
//       resLoading = false;
//       verboseLog('axios-error', error);
//     });

//   return {
//     data: resData,
//     isLoading: resLoading,
//     isError: resError,
//   };
// };
// export const usePatchAxios = (path, body) => async () => {
//   let [resData, resLoading, resError] = [null, Boolean(true), null];

//   await axios
//     .patch(path, body)
//     .then((response) => {
//       resData = response.data;
//       resLoading = false;
//       verboseLog('axios-response', response.data);
//     })
//     .catch((error) => {
//       resError = error;
//       resLoading = false;
//       verboseLog('axios-error', error);
//     });

//   return {
//     data: resData,
//     isLoading: resLoading,
//     isError: resError,
//   };
// };
// export const useDeleteAxios = (path, body) => async () => {
//   let [resData, resLoading, resError] = [null, Boolean(true), null];

//   await axios
//     .delete(path, { data: body })
//     .then((response) => {
//       resData = response.data;
//       resLoading = false;
//       verboseLog('axios-response', response.data);
//     })
//     .catch((error) => {
//       resError = error;
//       resLoading = false;
//       verboseLog('axios-error', error);
//     });

//   return {
//     data: resData,
//     isLoading: resLoading,
//     isError: resError,
//   };
// };
