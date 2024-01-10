import * as yup from 'yup';

const vendorInformationSchema = yup.object().shape({
  email: yup.string().email().required('Email is a required field !'),
  name: yup.string().required('Name is a required field !'),
  displayName: yup.string().required('Display Name is a required field !'),
  city: yup.object().shape({
    id: yup.string().required(' City is a required field ! '),
    label: yup.string().required('Phone is a required field !'),
  }),
  countryId: yup.string().required('Country is a required field !'),
  contacts: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Name is a required field !'),
      phone: yup.string().required('Phone is a required field !'),
    }),
  ),
});

export default vendorInformationSchema;
