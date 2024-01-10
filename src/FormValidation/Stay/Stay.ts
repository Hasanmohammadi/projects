import * as yup from 'yup';

const stayInformationSchema = yup.object().shape({
  name: yup.string().required('Name is a required field !'),
  primaryMobilePhone: yup
    .number()
    .typeError('Phone number is a required field !')
    .required('Phone number is a required field !'),
  stayLocation: yup.object().shape({
    countryId: yup.string().required('Country is required'),
    city: yup.object().shape({
      id: yup.string().required(' City is a required field ! '),
      label: yup.string().required('Phone is a required field !'),
    }),
  }),
});

const stayAddPhotoSchema = yup.object().shape({
  title: yup.string().required('Title is a required field !'),
  categoryId: yup.string().required('Category is a required field !'),
});

const stayPolicySchema = yup.object().shape({
  child1Policy: yup.object().shape({
    fromAge: yup.number().required('is required'),
    toAge: yup.number().required('is required'),
    passengerType: yup.number().required('is required'),
    bedRequired: yup.number().required('is required'),
  }),
  child2Policy: yup.object().shape({
    fromAge: yup.number().required('is required'),
    toAge: yup.number().required('is required'),
    passengerType: yup.number().required('is required'),
    bedRequired: yup.number().required('is required'),
  }),
  hotelId: yup.string().required('is required'),
  infantPolicy: yup.object().shape({
    fromAge: yup.number().required('is required'),
    toAge: yup.number().required('is required'),
    passengerType: yup.number().required('is required'),
    bedRequired: yup.number().required('is required'),
  }),
  noShowMin: yup.number().required('is required'),
  noshowHour: yup.number().required('is required'),
  onlyAdultAccepted: yup.number().required('is required'),
  onlyManNotAccepted: yup.number().required('is required'),
});

const stayNameSchema = yup.object().shape({
  languageId: yup.string().required('Language is a required field !'),
  name: yup.string().required('Name is a required field !'),
});

const stayDescriptionSchema = yup.object().shape({
  languageId: yup.string().required('Language is a required field !'),
  shortDescription: yup
    .string()
    .required('Short Description is a required field !'),
  longDescription: yup
    .string()
    .required('Long Description is a required field !'),
});

export {
  stayInformationSchema,
  stayPolicySchema,
  stayAddPhotoSchema,
  stayNameSchema,
  stayDescriptionSchema,
};
