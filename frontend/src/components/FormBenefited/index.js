import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';

import api from '~/services/api';

import Input from '../Input';
import TitleSweet from '../TitleSweet';
import { maskConstants } from '~/constants/masks';
import { replaceCharacters, tranformCharacters } from '~/utils/replace';

const BenefitedSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string()
    .min(14, 'CPF Inválido, muito curto')
    .max(14, 'CPF Inválido, muito longo')
    .required('Campo obrigatório'),
  phone: Yup.string().required('Campo obrigatório'),
});

export default function FormBenefited({ swal, benefited, updateCallback }) {
  const [loading, setLoading] = useState(false);

  const swalFeedback = async (title, message, type) => {
    await swal.fire({
      title: <TitleSweet title={title} message={message} />,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-cancel',
      confirmButtonText: 'Fechar',
      type,
    });
  };

  const onSubmit = async values => {
    try {
      setLoading(true);
      const { name, cpf, phone } = values;
      let title = '';
      let message = '';
      let response = null;

      if (!benefited) {
        response = await api
          .post('/benefited', {
            name,
            cpf: replaceCharacters(cpf),
            phone: replaceCharacters(phone),
          })
          .catch(error => {
            if (error.response) {
              const { data } = error.response;
              const errorMessage = Array.isArray(data) ? data[0].message : data;
              throw errorMessage;
            }
          });
      }

      if (benefited) {
        response = await api
          .put(`/benefited/${benefited.id}`, {
            name,
            cpf: replaceCharacters(cpf),
            phone: replaceCharacters(phone),
          })
          .catch(error => {
            if (error.response) {
              const { data } = error.response;
              const errorMessage = Array.isArray(data) ? data[0].message : data;
              throw errorMessage;
            }
          });
      }

      const { status, data } = response;

      setLoading(false);

      if (status === 200) {
        swal.clickConfirm();
        const key = benefited ? 'update' : 'create';
        if (updateCallback)
          updateCallback(key, {
            ...data,
            cpf: tranformCharacters(data.cpf, maskConstants.CPF),
            phone: tranformCharacters(data.phone, maskConstants.PHONE),
          });
        title = 'Sucesso';
        message = 'Salvo com sucesso';
      }

      await swalFeedback(title, message, 'success');
    } catch (err) {
      const { error } = err;
      const title = 'Erro';
      const message = error;
      await swalFeedback(title, message, 'error');
    }
  };

  const cancel = () => {
    swal.clickCancel();
  };

  return (
    <Formik
      initialValues={{
        name: benefited ? benefited.name : '',
        cpf: benefited
          ? tranformCharacters(benefited.cpf, maskConstants.CPF)
          : '',
        phone: benefited
          ? tranformCharacters(benefited.phone, maskConstants.PHONE)
          : '',
      }}
      validationSchema={BenefitedSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, handleChange, values }) => (
        <>
          <Input
            name="name"
            placeholder="Digite o nome"
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
                disabled={!!benefited}
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

          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </button>

          <button type="button" className="btn btn-cancel" onClick={cancel}>
            Cancelar
          </button>
        </>
      )}
    </Formik>
  );
}

FormBenefited.propTypes = {
  swal: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  benefited: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cpf: PropTypes.string,
    phone: PropTypes.string,
  }),
  updateCallback: PropTypes.func,
};

FormBenefited.defaultProps = {
  benefited: null,
  updateCallback: null,
};
