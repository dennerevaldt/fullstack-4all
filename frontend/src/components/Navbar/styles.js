import styled from 'styled-components';
import { device } from '~/constants/breakpoints';

export const Container = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 60px;
  background-color: #ffffff;
  padding: 0 40px 0 40px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  @media ${device.mobileS} {
    padding: 0 20px 0 20px;
  }

  img {
    height: 40px;
  }

  .is-open {
    box-shadow: -20px 0px 20px rgba(0, 0, 0, 0.3);
    right: 0;
  }

  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    height: 100%;
    align-items: center;

    li:not(:last-child) {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;

      a {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px 0 20px;
        text-transform: uppercase;
        text-decoration: none;
        cursor: pointer;
        color: #3c3c3c;
        transition: all ease-in 200ms;
        border-bottom: 4px solid transparent;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      .active {
        border-bottom: 4px solid #3c3c3c;
      }
    }

    li:last-child {
      border-left: 1px solid #efefef;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 0 0 20px;
      color: #3c3c3c;

      @media ${device.tablet} {
        border-left: 0;
      }

      p {
        text-transform: uppercase;
        color: #4fa444;
      }

      button {
        background: none;
        border: none;
        text-transform: uppercase;
        text-decoration: none;
        color: #3c3c3c;
        display: flex;
        flex-direction: row;
        align-items: center;

        svg {
          margin-left: 2px;
        }
      }
    }

    @media ${device.tablet} {
      position: fixed;
      flex-direction: column;
      top: 0;
      right: -300px;
      width: 300px;
      background: #ffffff;
      transition: all ease-in 200ms;
      padding-top: 50px;

      li {
        flex-direction: row;
        height: 50px !important;
        width: 100%;

        &:last-child {
          padding: 0;
        }

        a {
          flex-direction: row;
          width: 100%;
        }
      }
    }
  }
`;

export const ButtonMobile = styled.button`
  background-color: transparent;
  color: #4fa444;
  border: none;
  cursor: pointer;
  display: none;
  flex-direction: column;
  padding: 20px 0 20px 20px;
  z-index: 10;

  @media ${device.tablet} {
    display: flex;
  }
`;
