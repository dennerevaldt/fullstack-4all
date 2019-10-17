import styled from 'styled-components';
import { Form } from 'formik';

export const Container = styled(Form)`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 40px auto;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #4fa444;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 20px;
  }
`;
