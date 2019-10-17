import styled from 'styled-components';
import { device } from '~/constants/breakpoints';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Title = styled.h1`
  font-size: 2.5em;

  @media ${device.tablet} {
    font-size: 1.5em;
  }
`;
