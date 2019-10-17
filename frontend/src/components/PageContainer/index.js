import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function PageContainer({ children }) {
  return <Container>{children}</Container>;
}

PageContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

PageContainer.defaultProps = {
  children: null,
};
