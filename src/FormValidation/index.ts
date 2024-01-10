import loginSchema from './Auth/Auth';
import {
  roomDescriptionSchema,
  roomInformationSchema,
  roomNameSchema,
  roomPolicySchema,
} from './Room/room';
import { newSaleChannelSchema } from './SaleChannel/SaleChannel';
import {
  stayAddPhotoSchema,
  stayDescriptionSchema,
  stayInformationSchema,
  stayNameSchema,
  stayPolicySchema,
} from './Stay/Stay';
import vendorInformationSchema from './vendors/vendors';

export {
  vendorInformationSchema,
  loginSchema,
  stayInformationSchema,
  stayPolicySchema,
  roomInformationSchema,
  roomPolicySchema,
  roomNameSchema,
  roomDescriptionSchema,
  newSaleChannelSchema,
  stayAddPhotoSchema,
  stayDescriptionSchema,
  stayNameSchema,
};
