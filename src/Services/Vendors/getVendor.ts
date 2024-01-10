import { VENDOR_URLS } from 'Constants/urls';
import { VendorInfoDataI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

const getVendor = async ({
  id,
}: {
  id: string | Readonly<Params<string>>;
}) => {
  const response = await axios.get<VendorInfoDataI>(
    VENDOR_URLS.GET_VENDOR,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        vendorId: id,
      },
    },
  );

  return response?.data?.result;
};

export default getVendor;
