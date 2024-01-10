import { SALES_CHANNEL_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/SalesChannels';
import axios from 'axios';
import Cookies from 'js-cookie';

const postAddNewSalesChannel = async ({
  name,
  currencyId,
  marketId,
  salesChannelPaymentTypeId,
  vendorId,
}: {
  name: string;
  currencyId: string;
  marketId?: string;
  salesChannelPaymentTypeId?: string;
  vendorId?: string;
}) => {
  const response = await axios.post<NullResultI>(
    SALES_CHANNEL_URLS.POST_ADD_NEW_SALES_CHANNEL,
    {
      name,
      currencyId,
      marketId,
      salesChannelPaymentTypeId,
      vendorId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
    },
  );

  return response.data;
};

export default postAddNewSalesChannel;
