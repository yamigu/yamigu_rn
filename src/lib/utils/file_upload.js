import axios from 'axios';

const file_upload = (formData, url) => {
  console.log(url);
  return axios({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Token ' + 'fe917733867cf9cf05937e7a7ac1a67247e873b1',
    },
    data: formData,
  })
    .then(res => {
      console.log('file uploaded');
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log('file upload failed');
      console.log(err);
      return err;
    });
};

export default file_upload;
