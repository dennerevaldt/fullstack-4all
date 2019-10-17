import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaskedInput from 'react-text-mask';

import OutlineButton from '~/components/OutlineButton';
import SubmitButton from '~/components/SubmitButton';
import Input from '~components/Input';
import CardForm from '~/components/CardForm';
import { Container } from './styles';
import logo from '~/assets/images/logo.svg';
import * as SessionActions from '~/store/modules/session/actions';
import { maskConstants } from '~/constants/masks';
import { replaceCharacters } from '~/utils/replace';

const LoginSchema = Yup.object().shape({
  cpf: Yup.string()
    .min(14, 'CPF Inválido, muito curto')
    .max(14, 'CPF Inválido, muito longo')
    .required('Campo obrigatório'),
});

const Login = ({ sessionRequest, loading }) => {
  const handleSubmit = async values => {
    const { cpf } = values;
    const cpfReplaced = replaceCharacters(cpf);
    sessionRequest(cpfReplaced);
  };

  return (
    <Container>
      <img src={logo} alt="Logo" />

      <Formik
        initialValues={{
          cpf: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <CardForm>
            <h1>Acesse agora</h1>

            <MaskedInput
              mask={maskConstants.CPF}
              name="cpf"
              onChange={handleChange}
              placeholder="Digite seu CPF aqui"
              guide={false}
              type="text"
              render={(ref, props) => (
                <Input
                  type="text"
                  name="cpf"
                  placeholder="Digite seu CPF aqui"
                  innerRef={ref}
                  value={values.cpf}
                  condition={touched.cpf && errors.cpf}
                  message={errors.cpf}
                  {...props}
                />
              )}
            />

            <SubmitButton content="Acessar" loading={loading ? 1 : 0} />

            <OutlineButton
              content="Criar uma nova conta"
              to={loading ? '' : '/create-account'}
            />
          </CardForm>
        )}
      </Formik>
    </Container>
  );
};

Login.propTypes = {
  sessionRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Login.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  session: state.session,
  loading: state.session.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SessionActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
