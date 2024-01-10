import { SALES_CHANNEL_URLS } from 'Constants/urls';
import { calculateSkip } from 'Helpers';
import {
  ApiResponseI,
  SalesChannelListResultI,
} from 'Types/SalesChannels';
import axios from 'axios';
import Cookies from 'js-cookie';

const getSalesChannelList = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const response = await axios.get<ApiResponseI<SalesChannelListResultI>>(
    SALES_CHANNEL_URLS.GET_SALES_CHANNEL_LIST,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userToken') as string}`,
      },
      params: {
        skip: calculateSkip({ page, pageSize }),
        take: pageSize,
        orderBy: 'CreationDate',
        sortType: 'Desc',
      },
    },
  );

  return response.data.result;
};

export default getSalesChannelList;
