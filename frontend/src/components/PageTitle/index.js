import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title } from './styles';

export default function PageTitle({ title, children }) {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
};

PageTitle.defaultProps = {
  children: null,
};
