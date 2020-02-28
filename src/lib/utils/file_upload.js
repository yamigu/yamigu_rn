import axios from 'axios';

const file_upload = (formData, url) => {
  return axios({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
    .then(res => {
      console.log('file uploaded');
      // console.log(res);
      return res;
    })
    .catch(err => {
      // console.log('file upload failed');
      // console.log(err);
      return err;
    });
};

export default file_upload;
