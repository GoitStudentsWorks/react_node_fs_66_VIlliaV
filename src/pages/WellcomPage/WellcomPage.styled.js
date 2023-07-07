import styled from 'styled-components';

import backgroundMobile from './images/welcomePageBackground-Mobile.png';
import backgroundX2Mobile from './images/welcomePageBackground@x2-Mobile.png';
import backgroundTablet from './images/welcomePageBackground-Tablet.png';
import backgroundX2Tablet from './images/welcomePageBackground-Tablet@X2.png';
import backgroundDesktop from './images/welcomePageBackground-Desktop.png';
import backgroundX2Desktop from './images/welcomePageBackground-Desktop@X2.png';


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 275px 35px 261px 35px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 46.3%, rgba(0, 0, 0, 0.35) 72.75%, rgba(0, 0, 0, 0) 100%);
  background-image: url(${backgroundMobile});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  @media (min-resolution: 192dpi) {
    background-image: url(${backgroundX2Mobile});
  }

  @media screen and (min-width: 768px) {
    background-image: url(${backgroundTablet});
    /* background-size: contain;
    background-repeat: no-repeat;
    max-width: 1439px;
    height: 817px; */
  }

  @media screen and (min-width: 768px) and (min-resolution: 192dpi) {
    background-image: url(${backgroundX2Tablet});
  }

  @media screen and (min-width: 1440px) {
    background-image: url(${backgroundDesktop});
    /* width: 1440px; */
  }

  @media screen and (min-width: 1440px) and (min-resolution: 192dpi) {
    background-image: url(${backgroundX2Desktop});
  }
`;

export const Icon = styled.img`
  width: 54px;
  height: 54px;
  margin-left: auto;
  margin-right: auto;
  fill: #fafafa;
  background-color: #8baa36;
  border-radius: 12px;
`;

// const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
// `;

// .box {
//   width: 480px;
//   height: 320px;
//   background-image: url('photo.png');
//   background-size: 480px 320px;
// }

// , url(<path-to-image>) no-repeat;