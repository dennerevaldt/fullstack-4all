import { object, string } from 'yup';

const store = object({
  name: string().required(),
  cpf: string()
    .min(11)
    .max(11)
    .required(),
  phone: string().required(),
});

const update = object({
  name: string(),
  phone: string(),
});

export default {
  store,
  update,
};
