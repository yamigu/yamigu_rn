import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

let rem = 14;

if (width > 768) {
  rem = 45;
} else if (width > 414) {
  rem = 26;
} else if (width > 375) {
  rem = 18;
} else if (width > 320) {
  rem = 16;
}

module.exports = rem;
