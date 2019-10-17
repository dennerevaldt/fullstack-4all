import { object, number } from 'yup';

const store = object({
  value: number().required(),
});

export default {
  store,
};
