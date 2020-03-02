import firebase from 'react-native-firebase';

export default async message => {
  // handle your message
  console.log('Background Messaging');
  console.log(message);
  return Promise.resolve();
};
