import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function MessageInvalid({ children }) {
  return <Container>{children}</Container>;
}

MessageInvalid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

MessageInvalid.defaultProps = {
  children: null,
};
