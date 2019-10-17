import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import Navbar from '../../../components/Navbar';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Navbar />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
