import styled, { css } from 'styled-components';
import { device } from '~/constants/breakpoints';

export const List = styled.ul`
  list-style-type: none;

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 10px 0;

    &:not(:last-child) {
      border-bottom: 1px solid #efefef;
    }

    h3 {
      font-weight: bold;
    }

    h4 {
      color: #bababa;
      font-weight: normal;
    }
  }

  @media ${device.tablet} {
    li {
      flex-direction: column;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    h3,
    h4 {
      font-size: 0.8em;
    }
  }
`;

export const Action = styled.div`
  display: flex;
  flex-direction: row;

  @media ${device.tablet} {
    flex-direction: row;
    width: 100%;
    justify-content: stretch;

    button {
      width: 100%;
    }
  }

  @media ${device.mobileL} {
    flex-direction: column;
    width: 100%;
    justify-content: center;

    button {
      margin-bottom: 10px;
    }
  }
`;

export const ActionButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #4fa444;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all ease-in 200ms;
  font-size: 12px;
  font-weight: bold;
  min-height: 40px;
  max-height: 40px;

  & + button {
    margin-left: 15px;
  }

  @media ${device.mobileL} {
    & + button {
      margin-left: 0;
    }
  }

  @media ${device.tablet} {
    font-size: 0.8em;
    min-height: auto;
  }

  svg {
    margin-left: 6px;
  }

  &:hover {
    background: #327829;
  }

  ${props =>
    props.delete &&
    css`
      background: #e74c3c;

      &:hover {
        background: #bc3b2d;
      }
    `}

  ${props =>
    props.edit &&
    css`
      background: #bababa;

      &:hover {
        background: #cacaca;
      }
    `}

    ${props =>
      props.border &&
      css`
        border: 1px solid #ffffff;
      `}
`;

export const ItemSkeleton = styled.div`
  span {
    margin-bottom: 10px;
  }
`;
