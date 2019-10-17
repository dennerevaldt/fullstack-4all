import React from 'react';

import MessageInvalid from '../MessageInvalid';
import { Container, Group } from './styles';

export default function Input(props) {
  return (
    <Group>
      <Container {...props} />
      {props.condition ? (
        <MessageInvalid>{props.message}</MessageInvalid>
      ) : null}
    </Group>
  );
}
