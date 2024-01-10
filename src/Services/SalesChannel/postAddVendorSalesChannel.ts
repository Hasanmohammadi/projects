import { SALES_CHANNEL_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Stay';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

interface PostAddVendorStaysI {
  vendorId: string | Readonly<Params<string>>;
  salesChannelIds: string[];
}
const postAddVendorSalesChannel = async ({
  salesChannelIds,
  vendorId,
}: PostAddVendorStaysI) => {
  const response = await axios.post<NullResultI>(
    SALES_CHANNEL_URLS.POST_ADD_VENDOR_SALES_CHANNEL,
    {
      vendorId,
      salesChannelIds,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddVendorSalesChannel;
