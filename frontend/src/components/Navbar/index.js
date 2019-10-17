import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { MdExitToApp, MdMenu, MdClose } from 'react-icons/md';

import { Container, ButtonMobile } from './styles';
import * as SessionActions from '~/store/modules/session/actions';

import logo from '~/assets/images/logo-nav.svg';

const Navbar = ({ user, logout }) => {
  const [toggleMobile, setToggleMobile] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <Container>
      <NavLink
        to="/dashboard"
        onClick={() => toggleMobile && setToggleMobile(!toggleMobile)}
      >
        <img src={logo} alt="logo" />
      </NavLink>

      <ul className={toggleMobile ? 'is-open' : null}>
        <li>
          <NavLink
            activeClassName="active"
            to="/bank-statement"
            onClick={() => toggleMobile && setToggleMobile(!toggleMobile)}
          >
            Extrato
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to="/benefited"
            onClick={() => toggleMobile && setToggleMobile(!toggleMobile)}
          >
            Beneficiados
          </NavLink>
        </li>
        <li>
          <p>{user && user.name}</p>
          <button type="button" onClick={handleLogout}>
            Sair
            <MdExitToApp size={14} />
          </button>
        </li>
      </ul>

      <ButtonMobile onClick={() => setToggleMobile(!toggleMobile)}>
        {!toggleMobile && <MdMenu size={20} />}
        {toggleMobile && <MdClose size={20} />}
      </ButtonMobile>
    </Container>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SessionActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
