import * as yup from 'yup';

const newSaleChannelSchema = yup.object().shape({
  name: yup.string().required('Channel Name is a required field !'),
  currencyId: yup.string().required('Currency is a required field !'),
  marketId: yup.string().required('Market is a required field !'),
  salesChannelPaymentTypeId: yup
    .string()
    .required('Payment type is a required field !'),
});

export { newSaleChannelSchema };
