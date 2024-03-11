import * as yup from 'yup';

export const createClientSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  coord_x: yup.number().required(),
  coord_y: yup.number().required(),
});

export const updateClientSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  coord_x: yup.number().required(),
  coord_y: yup.number().required(),
});
