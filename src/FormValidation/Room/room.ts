import * as yup from 'yup';

const roomInformationSchema = yup.object().shape({
  VendorHotelRoomBaseTypeId: yup
    .string()
    .required('Room type is a required field !'),
  VendorHotelRoomViewTypeId: yup
    .string()
    .required('Room View type is a required field !'),
  roomName: yup.string().required('Room name is a required field !'),
  standardCapacity: yup
    .number()
    .required('Standard capacity is a required field !')
    .typeError('Enter number')
    .min(1, 'must be greater than or equal to 1'),
  extraCapacity: yup
    .number()
    .required('Extra capacity is a required field !')
    .typeError('Enter number'),
  bedRoomCount: yup
    .string()
    .required('Bedroom Count is a required field !'),
  VendorHotelRoomPensionId: yup
    .string()
    .required('Board is a required field !'),
  languageId: yup.string().required('Language is a required field !'),
  shortDescription: yup
    .string()
    .required('Short Description is a required field !'),
  longDescription: yup
    .string()
    .required('Long Description is a required field !'),
});

const roomPolicySchema = yup.object().shape({
  // title: yup.string().required('Title is a required field !'),
});

const roomNameSchema = yup.object().shape({
  languageId: yup.string().required('Language is a required field !'),
  name: yup.string().required('Name is a required field !'),
});

const roomDescriptionSchema = yup.object().shape({
  languageId: yup.string().required('Language is a required field !'),
  shortDescription: yup
    .string()
    .required('Short Description is a required field !'),
  longDescription: yup
    .string()
    .required('Long Description is a required field !'),
});

export {
  roomInformationSchema,
  roomPolicySchema,
  roomNameSchema,
  roomDescriptionSchema,
};
