import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import api from '~/services/api';

import Input from '../Input';
import TitleSweet from '../TitleSweet';
import InputMoney from '../InputMoney';

const TransferenceSchema = Yup.object().shape({
  value: Yup.number().required('Campo obrigatório'),
});

export default function FormTransference({ swal, benefited }) {
  const [loading, setLoading] = useState(false);

  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

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
      const { value } = values;
      let title = '';
      let message = '';

      const response = await api
        .post(`/transferences/${benefited.id}`, {
          value,
        })
        .catch(error => {
          if (error.response) {
            const { data } = error.response;
            const errorMessage = Array.isArray(data) ? data[0].message : data;
            throw errorMessage;
          }
        });

      const { status, data } = response;

      setLoading(false);

      if (status === 200) {
        swal.clickConfirm();
        title = 'Sucesso';
        message = data.message;
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
        value: '',
      }}
      validationSchema={TransferenceSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, values }) => (
        <>
          <Input
            name="value"
            placeholder="Digite o valor R$"
            render={({ field }) => (
              <InputMoney
                name="value"
                {...field}
                config={currencyConfig}
                currency="BRL"
                condition={touched.value && errors.value}
                message={errors.value}
                onChange={(event, value) => { values.value = value; }}
              />
            )}
          />

          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            {loading ? 'Transferindo...' : 'Transferir'}
          </button>

          <button type="button" className="btn btn-cancel" onClick={cancel}>
            Cancelar
          </button>
        </>
      )}
    </Formik>
  );
}

FormTransference.propTypes = {
  swal: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  benefited: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};
