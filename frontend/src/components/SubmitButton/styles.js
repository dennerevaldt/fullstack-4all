import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  flex: 1;
  font-size: 14px;
  background: #4fa444;
  border: 0;
  padding: 10px;
  margin-top: 12px;
  border-radius: 4px;
  text-transform: uppercase;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
