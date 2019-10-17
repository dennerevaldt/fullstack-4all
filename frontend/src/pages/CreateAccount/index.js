import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaskedInput from 'react-text-mask';

import OutlineButton from '~/components/OutlineButton';
import SubmitButton from '~/components/SubmitButton';
import Input from '~/components/Input';
import CardForm from '~/components/CardForm';

import { Container } from './styles';
import logo from '~/assets/images/logo.svg';
import * as SigninActions from '~/store/modules/signin/actions';
import { maskConstants } from '~/constants/masks';
import { replaceCharacters } from '~/utils/replace';

const SignInSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string()
    .min(14, 'CPF Inválido, muito curto')
    .max(14, 'CPF Inválido, muito longo')
    .required('Campo obrigatório'),
  phone: Yup.string().required('Campo obrigatório'),
});

const CreateAccount = ({ signInRequest, loading }) => {
  const handleSubmit = async values => {
    const { name, cpf, phone } = values;
    const cpfReplaced = replaceCharacters(cpf);
    const phoneReplaced = replaceCharacters(phone);
    signInRequest({ name, cpf: cpfReplaced, phone: phoneReplaced });
  };

  return (
    <Container>
      <img src={logo} alt="Logo" />

      <Formik
        initialValues={{
          name: '',
          cpf: '',
          phone: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <CardForm>
            <h1>Crie sua conta agora</h1>

            <Input
              type="text"
              name="name"
              placeholder="Digite seu nome aqui"
              condition={touched.name && errors.name}
              message={errors.name}
            />

            <MaskedInput
              mask={maskConstants.CPF}
              name="cpf"
              onChange={handleChange}
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

            <MaskedInput
              mask={maskConstants.PHONE}
              name="phone"
              onChange={handleChange}
              guide={false}
              type="text"
              render={(ref, props) => (
                <Input
                  type="text"
                  name="phone"
                  placeholder="Digite seu telefone aqui"
                  innerRef={ref}
                  value={values.phone}
                  condition={touched.phone && errors.phone}
                  message={errors.phone}
                  {...props}
                />
              )}
            />

            <SubmitButton content="Criar conta" loading={loading ? 1 : 0} />

            <OutlineButton content="Voltar" to={loading ? '' : '/login'} />
          </CardForm>
        )}
      </Formik>
    </Container>
  );
};

CreateAccount.propTypes = {
  signInRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

CreateAccount.defaultProps = {
  loading: false,
};

const mapStateToProps = state => ({
  signin: state.signin,
  loading: state.signin.loading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SigninActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
