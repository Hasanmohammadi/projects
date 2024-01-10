import { SALES_CHANNEL_URLS } from 'Constants/urls';
import { ApiResponseI } from 'Types/Market/Market';
import { SalesChannelResultI } from 'Types/SalesChannels/SalesChannels';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

interface GetSaleChannelArgs {
  salesChannelId: string | Readonly<Params<string>>;
  vendorId: string;
}

const getSaleChannel = async ({
  salesChannelId,
  vendorId,
}: GetSaleChannelArgs) => {
  const response = await axios.get<ApiResponseI<SalesChannelResultI>>(
    SALES_CHANNEL_URLS.GET_SALES_CHANNEL,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        salesChannelId,
        vendorId,
      },
    },
  );

  return response.data.result;
};

export default getSaleChannel;
