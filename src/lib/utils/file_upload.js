import axios from 'axios';

const file_upload = (formData, url) => {
  console.log(url);
  return axios({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Token ' + '567c3b626249c463a3c9372639628d5c435e330a',
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
