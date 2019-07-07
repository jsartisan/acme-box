import * as yup from 'yup';

export const createFolderValidator = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(1),
});
