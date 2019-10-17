import { setLocale } from 'yup';

import StatusError from '../../errors/status';

setLocale({
  mixed: {
    required: JSON.stringify({
      id: 'form.error.required',
      defaultMessage: 'This field is required',
      values: { path: '${path}' },
    }),
  },
  string: {
    min: JSON.stringify({
      id: 'form.error.string.min',
      defaultMessage: 'Minimum length is {min}',
      values: { path: '${path}', min: '${min}' },
    }),
    max: JSON.stringify({
      id: 'form.error.string.max',
      defaultMessage: 'Maximum length is {max}',
      values: { path: '${path}', max: '${max}' },
    }),
  },
  number: {
    min: JSON.stringify({
      id: 'form.error.number.min',
      defaultMessage: 'Minimum length is {min}',
      values: { path: '${path}', min: '${min}' },
    }),
    max: JSON.stringify({
      id: 'form.error.number.max',
      defaultMessage: 'Maximum length is {max}',
      values: { path: '${path}', max: '${max}' },
    }),
  },
});

const schemaValidator = schema => async (req, res, next) => {
  try {
    await schema.validate(req.body, {
      abortEarly: true,
    });
    return next();
  } catch (error) {
    const { id } = JSON.parse(error.message);
    const err = new StatusError(400, id || error);
    return next(err);
  }
};

export default schemaValidator;
