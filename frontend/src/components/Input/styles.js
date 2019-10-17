import styled from 'styled-components';
import { Field } from 'formik';

export const Group = styled.div`
  margin-bottom: 12px;
  width: 100%;
`;

export const Container = styled(Field)`
  display: flex;
  width: 100%;
  border: 1px solid #eeeeee;
  padding: 10px 15px;
  border-radius: 4px;
  color: #3c3c3c;
  border: ${props =>
    props.condition ? '1px solid red' : '1px solid #eeeeee;'};

  &[disabled] {
    cursor: not-allowed;
    color: #e3e3e3;
  }
`;
