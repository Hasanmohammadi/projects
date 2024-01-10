import { SALES_CHANNEL_URLS } from 'Constants/urls';
import { NullResultI } from 'Types/Vendors';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Params } from 'react-router-dom';

const putChangeSalesChannelStatus = async ({
  salesChannelId,
}: {
  salesChannelId: string | Readonly<Params<string>>;
}) => {
  const response = await axios.put<NullResultI>(
    SALES_CHANNEL_URLS.PUT_CHANGE_SALES_CHANNEL_STATUS,
    {
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

export default putChangeSalesChannelStatus;
