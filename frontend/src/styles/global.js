import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background-color: #4FA444;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: #FFFFFF;
    font-size: 14px;
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }

  .btn {
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    color: #FFFFFF;
    text-transform: uppercase;

    & + button {
      margin-left: 15px;
    }
  }

  .btn-success {
    background-color: #4FA444;
  }

  .btn-cancel {
    background-color: #CBCBCB;
  }

  .btn-danger {
    background-color: #e74c3c;
  }
`;
