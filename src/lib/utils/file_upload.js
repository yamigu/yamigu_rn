import axios from 'axios';

const file_upload = (formData, url) => {
  return new Promise((resolve, reject) => {
    axios({
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
        resolve(true);
      })
      .catch(err => {
        // console.log('file upload failed');
        console.log(err);
        reject(false);
      });
  });
};

export default file_upload;
