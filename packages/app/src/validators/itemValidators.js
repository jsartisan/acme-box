import * as yup from 'yup';

/**
 * validator for create folder/ edit item form
 */
export const createFolderValidator = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(1),
});
