import styled from 'styled-components';
import { device } from '~/constants/breakpoints';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;
