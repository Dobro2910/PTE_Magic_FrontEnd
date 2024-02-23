import axios from 'axios';
import _ from 'lodash';

export const uploadPoolInit = () => {
  // tslint:disable-next-line
  console.log('Init upload pool for mock test');
  if (localStorage.getItem('pte-uploadpool')) {
    localStorage.removeItem('pte-uploadpool');
  }
};

export const uploadPoolAdd = item => {
  let data = localStorage.getItem('pte-uploadpool');
  let pool;
  if (data) {
    pool = JSON.parse(data);
    pool.push(item);
    localStorage.setItem('pte-uploadpool', JSON.stringify(pool));
  } else {
    pool = [];
    pool.push(item);
    localStorage.setItem('pte-uploadpool', JSON.stringify(pool));
  }
  // tslint:disable-next-line
  console.log(`=== Uploadpool add item into pool === pool: ${pool}`);
};

export const uploadPoolRemove = item => {
  let data = localStorage.getItem('pte-uploadpool');
  let pool;
  if (data) {
    pool = JSON.parse(data);
    pool = _.without(pool, item);
    localStorage.setItem('pte-uploadpool', JSON.stringify(pool));
  }
  // tslint:disable-next-line
  console.log(`=== Uploadpool remove item into pool === pool: ${pool}`);
};

export const uploadPoolCheck = () => {
  let data = localStorage.getItem('pte-uploadpool');
  if (data) {
    const pool = JSON.parse(data);
    if (pool == null || pool === undefined || pool.length === 0) {
      return true;
    }
    return false;
  }
  return true;
};

export const logWarningMessage = (message, description) => {
  // Get signed_url
  const data = {
    message,
    description
  };
  axios.post('api/log/log-answer', data);
};

export const logErrorMessage = (message, description, errorCode?) => {
  // Get signed_url
  const data = {
    message,
    description,
    errorCode
  };
  axios.post('api/log/log-error', data);
};

async function uploadRecorder(filename: string, blob: Blob) {
  const file = new File([blob], filename);

  // Get signed_url
  try {
    const signedData = {
      type: 'answer',
      contentType: 'audio/flac', // file.type
      filename: file.name
    };
    const signedResponse = await axios.post('api/file/signed_url', signedData);
    const signedUrl = signedResponse.data.signedUrl;

    const result = await fetch(signedUrl, {
      method: 'PUT',
      headers: { 'Access-Control-Allow-Origin': '*', 'content-type': 'audio/flac' },
      body: file
    });

    return result;
  } catch (err) {
    logWarningMessage(`Upload file ${filename} fail`, JSON.stringify(err));
    // tslint:disable-next-line
    console.log(err);
  }

  return null;
}

export const uploadRecording = uploadRecorder;
