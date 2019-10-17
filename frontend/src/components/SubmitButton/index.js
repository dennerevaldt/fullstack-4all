import React from 'react';
import PropTypes from 'prop-types';
import { FiLoader } from 'react-icons/fi';

import { Container } from './styles';

const SubmitButton = ({ loading, content }) => {
  return (
    <Container loading={loading}>
      {loading ? <FiLoader size={12} /> : content}
    </Container>
  );
};

SubmitButton.defaultProps = {
  loading: false,
  content: null,
};

SubmitButton.propTypes = {
  loading: PropTypes.number,
  content: PropTypes.string,
};

export default SubmitButton;
