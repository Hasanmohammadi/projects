import { STAY_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

interface PostAddVendorStaysI {
  vendorId: string | Readonly<Params<string>>;
  stayIds: string[];
  addMode: boolean;
}
const postAddVendorStays = async ({
  vendorId,
  stayIds,
  addMode,
}: PostAddVendorStaysI) => {
  const response = await axios.post<NullResultI>(
    STAY_URLS.POST_ADD_VENDOR_STAY,
    {
      vendorId,
      stayIds,
      addMode,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddVendorStays;
