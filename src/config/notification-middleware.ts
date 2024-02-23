import { toast } from 'react-toastify';
import { isPromise } from '../utils/common-utils';

const addErrorAlert = (message) => {
  toast.error(message);
};
export default () => next => action => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The notification middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `then` and `catch.
   */
  return next(action)
    .then(response => {
      if (action.meta && action.meta.successMessage) {
        toast.success(action.meta.successMessage);
      } else if (action.meta && action.meta.errorMessage) {
        toast.error(action.meta.errorMessage);
      }
      return Promise.resolve(response);
    })
    .catch(error => {
      console.log(error);
      if (action.meta && action.meta.errorMessage) {
        toast.error(action.meta.errorMessage);
      } else if (error && error.response) {
        const response = error.response;
        const data = response.data;
        if (!(response.status === 401 && (error.message === '' || (data && data.path && data.path.includes('/api/account'))))) {
          switch (response.status) {
            // connection refused, server not reachable
            case 0:
              addErrorAlert('Server not reachable');
              break;

            case 400:
              if (data !== '' && data.title) {
                addErrorAlert(data.title);
              } else {
                addErrorAlert(data);
              }
              break;

            case 404:
              addErrorAlert('Not found');
              break;

            case 401:
              if (data.message !== 'error.http.401') {
                addErrorAlert(data.message);
              } 
              break;
                
            default:
              if (data !== '' && data.title) {
                addErrorAlert(data.title);
              } else {
                addErrorAlert(data);
              }
          }
        }
      } else if (error && error.message) {
        toast.error(error.message);
      } else {
        toast.error('Unknown error!');
      }
      return Promise.reject(error);
    });
};
