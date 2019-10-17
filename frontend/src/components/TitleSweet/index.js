import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function TitleSweet({ title, message }) {
  return (
    <Container>
      <h3>{title}</h3>
      <p>{message}</p>
    </Container>
  );
}

TitleSweet.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
};

TitleSweet.defaultProps = {
  message: '',
};
