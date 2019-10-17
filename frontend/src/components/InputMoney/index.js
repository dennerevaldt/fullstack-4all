import React from 'react';

import { Container, Group } from './styles';
import MessageInvalid from '../MessageInvalid'

export default function InputMoney(props) {
  return (
    <Group>
      <Container {...props} />
      {props.condition ? (
        <MessageInvalid>{props.message}</MessageInvalid>
      ) : null}
    </Group>
  );
}
