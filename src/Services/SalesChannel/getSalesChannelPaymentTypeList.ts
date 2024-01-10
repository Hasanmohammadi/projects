import { SALES_CHANNEL_URLS } from 'Constants/urls';
import { ApiResponseI } from 'Types/Market/Market';
import { PaymentTypeListI } from 'Types/SalesChannels/SalesChannels';
import axios from 'axios';
import Cookies from 'js-cookie';

const getSalesChannelPaymentTypeList = async () => {
  const response = await axios.get<ApiResponseI<PaymentTypeListI>>(
    SALES_CHANNEL_URLS.GET_SALES_CHANNEL_PAYMENT_TYPE_LIST,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: 0,
        take: 100,
        orderBy: 'Id',
      },
    },
  );

  return response.data.result;
};

export default getSalesChannelPaymentTypeList;
