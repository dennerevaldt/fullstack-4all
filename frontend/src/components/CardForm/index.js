import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function CardForm({ children }) {
  return <Container>{children}</Container>;
}

CardForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

CardForm.defaultProps = {
  children: null,
};
