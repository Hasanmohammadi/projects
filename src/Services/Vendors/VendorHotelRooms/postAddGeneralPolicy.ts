import { VENDOR_HOTEL_ROOMS_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AddGeneralPolicyArgsI {
  vendorHotelRoomId: string;
  description: string;
  title: string;
}

const postAddGeneralPolicy = async (args: AddGeneralPolicyArgsI) => {
  const response = await axios.post<NullResultI>(
    VENDOR_HOTEL_ROOMS_URLS.POST_ADD_GENERAL_POLICY,
    args,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddGeneralPolicy;
