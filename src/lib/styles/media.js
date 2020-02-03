import {css} from 'styled-components';

const sizes = {
  desktop: 1024,
  tablet: 768,
  iphone678X: 375,
  iphone678Plus: 414,
  iphoneSE: 320,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export default media;
