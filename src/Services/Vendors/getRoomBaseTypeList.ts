import { VENDOR_URLS } from 'Constants/urls';
import { VendorInfoDataI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';

const getRoomBaseTypeList = async () => {
  const response = await axios.get<VendorInfoDataI>(
    VENDOR_URLS.GET_VENDOR,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response?.data?.result;
};

export default getRoomBaseTypeList;
