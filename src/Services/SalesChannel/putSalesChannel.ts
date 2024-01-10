import { SALES_CHANNEL_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

interface PutSalesChannelArgsI {
  vendorId: string;
  paymentTypeId: string;
  marketId: string;
  currencyId: string;
  name: string;
  salesChannelId: string | Readonly<Params<string>>;
}

const putSalesChannel = async ({
  currencyId,
  marketId,
  name,
  paymentTypeId,
  vendorId,
  salesChannelId,
}: PutSalesChannelArgsI) => {
  const response = await axios.put<NullResultI>(
    SALES_CHANNEL_URLS.PUT_EDIT_SALES_CHANNEL,
    {
      vendorId,
      paymentTypeId,
      marketId,
      currencyId,
      name,
      salesChannelId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default putSalesChannel;
