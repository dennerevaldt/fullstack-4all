import { object, string } from 'yup';

const store = object({
  cpf: string()
    .min(11)
    .max(11)
    .required(),
});

export default {
  store,
};
