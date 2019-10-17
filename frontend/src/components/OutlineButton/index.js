import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const OutlineButton = ({ to, content }) => {
  return <Container to={to}>{content}</Container>;
};

OutlineButton.defaultProps = {
  to: '',
  content: '',
};

OutlineButton.propTypes = {
  to: PropTypes.string,
  content: PropTypes.string,
};

export default OutlineButton;
