import styled from 'styled-components';
import { device } from '~/constants/breakpoints';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: ${props => props.minwidth && `${props.minwidth}px`};
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: ${props => props.maxwidth && `${props.maxwidth}px`};
  color: #3c3c3c;
  width: 100%;
  justify-content: space-between;

  & + div {
    margin-left: 10px;
  }

  h3 {
    font-size: 1.2em;
    font-weight: 400;
    margin-bottom: 5px;
  }

  p {
    font-size: 2em;
    font-weight: bold;
  }

  @media ${device.tablet} {
    margin-bottom: 10px;

    & + div {
      margin-left: 0;
    }
  }
`;
