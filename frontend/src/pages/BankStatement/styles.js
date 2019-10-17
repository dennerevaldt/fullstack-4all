import styled from 'styled-components';
import { device } from '~/constants/breakpoints';

export const ListStatement = styled.ul`
  list-style-type: none;

  li {
    display: flex;
    flex-direction: row;
    padding: 10px 0 10px 0;

    &:not(:last-child) {
      border-bottom: 1px solid #efefef;
    }
  }
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10px 5px 0;
  color: ${props => (props.success ? '#4FA444' : '#e74c3c')};

  @media ${device.tablet} {
    svg {
      height: 1.5em;
      width: 1.5em;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  color: #3c3c3c;
  justify-content: space-between;

  h3 {
    font-weight: bold;
  }

  h4 {
    color: #bababa;
    font-weight: normal;
  }

  @media ${device.tablet} {
    h3,
    h4 {
      font-size: 0.8em;
    }
  }
`;

export const SubHeader = styled.div`
  display: flex;
  flex-direction: row;
  color: #3c3c3c;
  justify-content: space-between;

  h3 {
    font-weight: bold;
  }

  h4 {
    color: #bababa;
    font-weight: normal;
  }

  @media ${device.tablet} {
    h3,
    h4 {
      font-size: 0.8em;
    }
  }
`;

export const ValueFormatted = styled.h3`
  color: ${props =>
    props.success ? (props.out ? '#e74c3c' : '#4FA444') : '#bababa'};
`;
export const ItemSkeleton = styled.div`
  span {
    margin-bottom: 10px;
  }
`;
