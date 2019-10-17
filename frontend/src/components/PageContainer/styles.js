import styled from 'styled-components';
import { device } from '~/constants/breakpoints';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px 40px 40px 40px;

  @media ${device.mobileS} {
    padding: 20px 20px 20px 20px;
  }
`;
