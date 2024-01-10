import { VENDOR_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

const putChangeVendorStatus = async ({
  id,
}: {
  id: string | Readonly<Params<string>>;
}) => {
  const response = await axios.put<NullResultI>(
    VENDOR_URLS.PUT_CHANGE_VENDOR_STATUS,
    {
      vendorId: id,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default putChangeVendorStatus;
